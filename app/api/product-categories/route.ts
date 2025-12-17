import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const locale = searchParams.get('locale') || 'en';

        const categories = await ProductCategory.find({}).sort({ sortOrder: 1 });
        
        if (categories.length === 0) {
            return NextResponse.json([]);
        }

        const categoryIds = categories.map(c => c._id);
        const translations = await ProductCategoryTranslation.find({ 
            productCategoryId: { $in: categoryIds } 
        });

        const formatted = await Promise.all(
            categories.map(async (cat) => {
                const catTranslations = translations.filter(t => 
                    t.productCategoryId.toString() === cat._id.toString()
                );
                const trans = catTranslations.find(t => t.locale === locale) || 
                             catTranslations.find(t => t.locale === 'en');
                const productCount = await Product.countDocuments({ categoryId: cat._id });
                
                return {
                    id: cat._id.toString(),
                    slug: cat.slug,
                    icon: cat.icon,
                    color: cat.color,
                    sortOrder: cat.sortOrder,
                    name: trans?.name || cat.slug,
                    description: trans?.description || '',
                    productCount,
                    translations: catTranslations,
                };
            })
        );

        return NextResponse.json(formatted);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const body = await req.json();
        const { slug, icon, color, sortOrder, translations } = body;

        const category = await ProductCategory.create({
            slug,
            icon: icon || 'Package',
            color: color || 'from-blue-500 to-blue-600',
            sortOrder: sortOrder || 0,
        });

        if (translations && translations.length > 0) {
            await ProductCategoryTranslation.insertMany(
                translations.map((t: { locale: string; name: string; description?: string }) => ({
                    productCategoryId: category._id,
                    locale: t.locale,
                    name: t.name,
                    description: t.description || ''
                }))
            );
        }

        const categoryTranslations = await ProductCategoryTranslation.find({ productCategoryId: category._id });
        const categoryObj = {
            ...category.toObject(),
            translations: categoryTranslations
        };

        return NextResponse.json(categoryObj);
    } catch (error) {
        return NextResponse.json({ error: "Error creating category" }, { status: 500 });
    }
}

