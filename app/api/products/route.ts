import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductTranslation from "@/models/ProductTranslation";
import ProductCategory from "@/models/ProductCategory";
import IndustryCategory from "@/models/IndustryCategory";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import IndustryCategoryTranslation from "@/models/IndustryCategoryTranslation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale');
    const categorySlug = searchParams.get('category');
    const industrySlug = searchParams.get('industry');

    const query: Record<string, unknown> = {};
    
    if (categorySlug) {
        const category = await ProductCategory.findOne({ slug: categorySlug });
        if (category) query.categoryId = category._id;
    }
    
    if (industrySlug) {
        const industry = await IndustryCategory.findOne({ slug: industrySlug });
        if (industry) query.industryId = industry._id;
    }

    const products = await Product.find(query)
        .populate('categoryId')
        .populate('industryId');

    const productIds = products.map(p => p._id);
    const translations = await ProductTranslation.find({ productId: { $in: productIds } });
    const categoryIds = products.map(p => p.categoryId).filter(Boolean);
    const industryIds = products.map(p => p.industryId).filter(Boolean);
    const categoryTranslations = await ProductCategoryTranslation.find({ 
        productCategoryId: { $in: categoryIds } 
    });
    const industryTranslations = await IndustryCategoryTranslation.find({ 
        industryCategoryId: { $in: industryIds } 
    });

    const productsWithTranslations = products.map(product => {
        const productTrans = translations.filter(t => t.productId.toString() === product._id.toString());
        const category = product.categoryId as any;
        const industry = product.industryId as any;
        const catTrans = category ? categoryTranslations.filter(t => t.productCategoryId.toString() === category._id.toString()) : [];
        const indTrans = industry ? industryTranslations.filter(t => t.industryCategoryId.toString() === industry._id.toString()) : [];
        
        return {
            ...product.toObject(),
            translations: productTrans,
            category: category ? {
                ...category.toObject(),
                translations: catTrans
            } : null,
            industry: industry ? {
                ...industry.toObject(),
                translations: indTrans
            } : null
        };
    });

    if (locale) {
        const formatted = productsWithTranslations.map(p => {
            const trans = p.translations.find((t: any) => t.locale === locale) || p.translations.find((t: any) => t.locale === 'en');
            const catTrans = p.category?.translations.find((t: any) => t.locale === locale) || p.category?.translations.find((t: any) => t.locale === 'en');
            const indTrans = p.industry?.translations.find((t: any) => t.locale === locale) || p.industry?.translations.find((t: any) => t.locale === 'en');
            
            return {
                ...p,
                translations: undefined,
                translation: trans,
                name: trans?.name,
                description: trans?.description,
                categoryName: catTrans?.name || p.category?.slug,
                categorySlug: p.category?.slug,
                industryName: indTrans?.name || p.industry?.slug,
                industrySlug: p.industry?.slug,
            };
        });
        return NextResponse.json(formatted);
    }

    return NextResponse.json(productsWithTranslations);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const body = await req.json();
        const { sku, categoryId, industryId, featured, images, containerPoints, translations } = body;

        const product = await Product.create({
            sku,
            categoryId: categoryId || undefined,
            industryId: industryId || undefined,
            featured: featured || false,
            images: JSON.stringify(images),
            containerPoints: typeof containerPoints === 'string' ? containerPoints : JSON.stringify(containerPoints),
        });

        if (translations && translations.length > 0) {
            await ProductTranslation.insertMany(
                translations.map((t: { locale: string; name: string; description?: string }) => ({
                    productId: product._id,
                    locale: t.locale,
                    name: t.name,
                    description: t.description || ""
                }))
            );
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Error creating product" }, { status: 500 });
    }
}
