import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import IndustryCategory from "@/models/IndustryCategory";
import IndustryCategoryTranslation from "@/models/IndustryCategoryTranslation";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const industry = await IndustryCategory.findById(id);

    if (!industry) {
        return NextResponse.json({ error: "Industry not found" }, { status: 404 });
    }

    const translations = await IndustryCategoryTranslation.find({ industryCategoryId: id });
    const industryObj = {
        ...industry.toObject(),
        translations
    };

    return NextResponse.json(industryObj);
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
        await IndustryCategoryTranslation.deleteMany({ industryCategoryId: id });

        const industry = await IndustryCategory.findByIdAndUpdate(
            id,
            { slug, icon, color, sortOrder },
            { new: true }
        );

        if (!industry) {
            return NextResponse.json({ error: "Industry not found" }, { status: 404 });
        }

        if (translations && translations.length > 0) {
            await IndustryCategoryTranslation.insertMany(
                translations.map((t: { locale: string; name: string }) => ({
                    industryCategoryId: id,
                    locale: t.locale,
                    name: t.name
                }))
            );
        }

        const industryTranslations = await IndustryCategoryTranslation.find({ industryCategoryId: id });
        const industryObj = {
            ...industry.toObject(),
            translations: industryTranslations
        };

        return NextResponse.json(industryObj);
    } catch (error) {
        return NextResponse.json({ error: "Error updating industry" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    try {
        await connectDB();
        await IndustryCategory.findByIdAndDelete(id);
        await IndustryCategoryTranslation.deleteMany({ industryCategoryId: id });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting industry" }, { status: 500 });
    }
}

