import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import ProductCategory from "@/models/ProductCategory";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const category = await ProductCategory.findById(id);

    if (!category) {
        return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    const translations = await ProductCategoryTranslation.find({ productCategoryId: id });
    const categoryObj = {
        ...category.toObject(),
        translations
    };

    return NextResponse.json(categoryObj);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        const body = await req.json();
        const { slug, icon, color, sortOrder, translations } = body;

        // Delete existing translations and recreate
        await ProductCategoryTranslation.deleteMany({ productCategoryId: id });

        const category = await ProductCategory.findByIdAndUpdate(
            id,
            { slug, icon, color, sortOrder },
            { new: true }
        );

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (translations && translations.length > 0) {
            await ProductCategoryTranslation.insertMany(
                translations.map((t: { locale: string; name: string; description?: string }) => ({
                    productCategoryId: id,
                    locale: t.locale,
                    name: t.name,
                    description: t.description || ''
                }))
            );
        }

        const categoryTranslations = await ProductCategoryTranslation.find({ productCategoryId: id });
        const categoryObj = {
            ...category.toObject(),
            translations: categoryTranslations
        };

        return NextResponse.json(categoryObj);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error updating category" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        await ProductCategory.findByIdAndDelete(id);
        await ProductCategoryTranslation.deleteMany({ productCategoryId: id });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
    }
}

