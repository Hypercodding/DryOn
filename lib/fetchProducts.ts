import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductTranslation from '@/models/ProductTranslation';
import ProductCategory from '@/models/ProductCategory';
import ProductCategoryTranslation from '@/models/ProductCategoryTranslation';
import mongoose from 'mongoose';

export interface ProductData {
    id: string;
    sku: string;
    images: string;
    featured: boolean;
    category?: {
        id: string;
        slug: string;
        icon: string;
        color: string;
        translations?: Array<{ locale: string; name: string; description: string }>;
    };
    translations: Array<{ locale: string; name: string; description: string }>;
}

export interface ProductCategoryData {
    id: string;
    slug: string;
    icon: string;
    color: string;
    translations?: Array<{ locale: string; name: string; description: string }>;
}

export interface CategoryWithProducts {
    category: ProductCategoryData;
    products: ProductData[];
}

export async function fetchProductsAndCategories(locale: string = 'en'): Promise<CategoryWithProducts[]> {
    const mongoose = await connectDB();
    
    // Ensure all models are registered (required for serverless environments)
    if (!mongoose.models.Product) {
        await import('@/models/Product');
    }
    if (!mongoose.models.ProductTranslation) {
        await import('@/models/ProductTranslation');
    }
    if (!mongoose.models.ProductCategory) {
        await import('@/models/ProductCategory');
    }
    if (!mongoose.models.ProductCategoryTranslation) {
        await import('@/models/ProductCategoryTranslation');
    }

    // Fetch all categories
    const categories = await ProductCategory.find({}).sort({ sortOrder: 1 });
    
    if (categories.length === 0) {
        return [];
    }

    const categoryIds = categories.map(c => c._id);
    const categoryTranslations = await ProductCategoryTranslation.find({ 
        productCategoryId: { $in: categoryIds } 
    });

    // Fetch products for each category
    const categoryPromises = categories.map(async (category) => {
        const catTranslations = categoryTranslations.filter(t => 
            t.productCategoryId.toString() === category._id.toString()
        );
        
        // Get products for this category
        const products = await Product.find({ categoryId: category._id })
            .populate('categoryId')
            .limit(10);

        if (products.length === 0) {
            return null;
        }

        const productIds = products.map(p => p._id);
        const productTranslations = await ProductTranslation.find({ 
            productId: { $in: productIds } 
        });

        const formattedProducts: ProductData[] = products.map(product => {
            const prodTrans = productTranslations.filter(t => 
                t.productId.toString() === product._id.toString()
            );
            const category = product.categoryId as any;
            const catTrans = category ? categoryTranslations.filter(t => 
                t.productCategoryId.toString() === category._id.toString()
            ) : [];

            return {
                id: product._id.toString(),
                sku: product.sku,
                images: product.images,
                featured: product.featured,
                category: category ? {
                    id: category._id.toString(),
                    slug: category.slug,
                    icon: category.icon,
                    color: category.color,
                    translations: catTrans.map((t: any) => ({
                        locale: t.locale,
                        name: t.name,
                        description: t.description || ''
                    }))
                } : undefined,
                translations: prodTrans.map((t: any) => ({
                    locale: t.locale,
                    name: t.name,
                    description: t.description || ''
                }))
            };
        });

        return {
            category: {
                id: category._id.toString(),
                slug: category.slug,
                icon: category.icon,
                color: category.color,
                translations: catTranslations.length > 0 ? catTranslations.map((t: any) => ({
                    locale: t.locale,
                    name: t.name,
                    description: t.description || ''
                })) : undefined
            },
            products: formattedProducts
        } as CategoryWithProducts;
    });

    const results = await Promise.all(categoryPromises);
    return results.filter((item) => item !== null) as CategoryWithProducts[];
}

