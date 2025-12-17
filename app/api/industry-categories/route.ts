import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import IndustryCategory from "@/models/IndustryCategory";
import IndustryCategoryTranslation from "@/models/IndustryCategoryTranslation";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const locale = searchParams.get('locale') || 'en';

        const industries = await IndustryCategory.find({}).sort({ sortOrder: 1 });
        
        if (industries.length === 0) {
            return NextResponse.json([]);
        }

        const industryIds = industries.map(i => i._id);
        const translations = await IndustryCategoryTranslation.find({ 
            industryCategoryId: { $in: industryIds } 
        });

        const formatted = await Promise.all(
            industries.map(async (ind) => {
                const indTranslations = translations.filter(t => 
                    t.industryCategoryId.toString() === ind._id.toString()
                );
                const trans = indTranslations.find(t => t.locale === locale) || 
                             indTranslations.find(t => t.locale === 'en');
                const productCount = await Product.countDocuments({ industryId: ind._id });
                
                return {
                    id: ind._id.toString(),
                    slug: ind.slug,
                    icon: ind.icon,
                    color: ind.color,
                    sortOrder: ind.sortOrder,
                    name: trans?.name || ind.slug,
                    productCount,
                    translations: indTranslations,
                };
            })
        );

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching industry categories:', error);
        return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        await connectDB();
        const body = await req.json();
        const { slug, icon, color, sortOrder, translations } = body;

        const industry = await IndustryCategory.create({
            slug,
            icon: icon || 'Factory',
            color: color || 'bg-gray-500',
            sortOrder: sortOrder || 0,
        });

        if (translations && translations.length > 0) {
            await IndustryCategoryTranslation.insertMany(
                translations.map((t: { locale: string; name: string }) => ({
                    industryCategoryId: industry._id,
                    locale: t.locale,
                    name: t.name
                }))
            );
        }

        const industryTranslations = await IndustryCategoryTranslation.find({ industryCategoryId: industry._id });
        const industryObj = {
            ...industry.toObject(),
            translations: industryTranslations
        };

        return NextResponse.json(industryObj);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating industry" }, { status: 500 });
    }
}

