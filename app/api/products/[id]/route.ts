import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductTranslation from "@/models/ProductTranslation";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import IndustryCategoryTranslation from "@/models/IndustryCategoryTranslation";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const mongoose = await connectDB();
    const params = await props.params;

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
    if (!mongoose.models.IndustryCategory) {
        await import('@/models/IndustryCategory');
    }
    if (!mongoose.models.IndustryCategoryTranslation) {
        await import('@/models/IndustryCategoryTranslation');
    }

    const product = await Product.findById(params.id)
        .populate('categoryId')
        .populate('industryId');

    if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const translations = await ProductTranslation.find({ productId: product._id });
    const category = product.categoryId as any;
    const industry = product.industryId as any;
    const categoryTranslations = category ? await ProductCategoryTranslation.find({ productCategoryId: category._id }) : [];
    const industryTranslations = industry ? await IndustryCategoryTranslation.find({ industryCategoryId: industry._id }) : [];

    const productObj = {
        ...product.toObject(),
        translations,
        category: category ? {
            ...category.toObject(),
            translations: categoryTranslations
        } : null,
        industry: industry ? {
            ...industry.toObject(),
            translations: industryTranslations
        } : null
    };

    return NextResponse.json(productObj);
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const mongoose = await connectDB();
        
        // Ensure all models are registered (required for serverless environments)
        if (!mongoose.models.Product) {
            await import('@/models/Product');
        }
        if (!mongoose.models.ProductTranslation) {
            await import('@/models/ProductTranslation');
        }
        
        const body = await req.json();
        const { sku, categoryId, industryId, featured, images, containerPoints, translations } = body;

        const product = await Product.findByIdAndUpdate(
            params.id,
            {
                sku,
                categoryId: categoryId || undefined,
                industryId: industryId || undefined,
                featured: featured || false,
                images: JSON.stringify(images),
                containerPoints: typeof containerPoints === 'string' ? containerPoints : JSON.stringify(containerPoints),
            },
            { new: true }
        );

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        if (translations && Array.isArray(translations)) {
            // Delete existing and recreate
            await ProductTranslation.deleteMany({ productId: params.id });

            if (translations.length > 0) {
                await ProductTranslation.insertMany(
                    translations.map((t: { locale: string; name: string; description?: string }) => ({
                        productId: params.id,
                        locale: t.locale,
                        name: t.name,
                        description: t.description || ""
                    }))
                );
            }
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Error updating product" }, { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const mongoose = await connectDB();
        
        // Ensure all models are registered (required for serverless environments)
        if (!mongoose.models.Product) {
            await import('@/models/Product');
        }
        if (!mongoose.models.ProductTranslation) {
            await import('@/models/ProductTranslation');
        }
        
        await Product.findByIdAndDelete(params.id);
        await ProductTranslation.deleteMany({ productId: params.id });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting product" }, { status: 500 });
    }
}
