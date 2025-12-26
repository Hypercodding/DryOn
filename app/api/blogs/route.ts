import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogTranslation from "@/models/BlogTranslation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const mongoose = await connectDB();
    
    // Ensure all models are registered
    if (!mongoose.models.Blog) {
        await import('@/models/Blog');
    }
    if (!mongoose.models.BlogTranslation) {
        await import('@/models/BlogTranslation');
    }

    const { searchParams } = new URL(req.url);
    const locale = searchParams.get('locale');
    const published = searchParams.get('published');

    const query: Record<string, unknown> = {};
    if (published === 'true') {
        query.published = true;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    const blogIds = blogs.map(b => b._id);
    const translations = await BlogTranslation.find({ blogId: { $in: blogIds } });

    const blogsWithTranslations = blogs.map(blog => {
        const blogTrans = translations.filter(t => t.blogId.toString() === blog._id.toString());
        
        return {
            ...blog.toObject(),
            translations: blogTrans,
        };
    });

    if (locale) {
        const formatted = blogsWithTranslations.map(b => {
            const trans = b.translations.find((t: any) => t.locale === locale) || b.translations.find((t: any) => t.locale === 'en');
            
            return {
                ...b,
                translations: undefined,
                translation: trans,
                title: trans?.title,
                excerpt: trans?.excerpt,
                content: trans?.content,
            };
        });
        return NextResponse.json(formatted);
    }

    return NextResponse.json(blogsWithTranslations);
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const mongoose = await connectDB();
        
        // Ensure all models are registered
        if (!mongoose.models.Blog) {
            await import('@/models/Blog');
        }
        if (!mongoose.models.BlogTranslation) {
            await import('@/models/BlogTranslation');
        }

        const body = await req.json();
        const { slug, category, featuredImage, published, translations } = body;

        const blog = await Blog.create({
            slug,
            category: category || 'Education',
            featuredImage: featuredImage || undefined,
            published: published || false,
        });

        if (translations && translations.length > 0) {
            await BlogTranslation.insertMany(
                translations.map((t: { locale: string; title: string; excerpt: string; content: string }) => ({
                    blogId: blog._id,
                    locale: t.locale,
                    title: t.title,
                    excerpt: t.excerpt,
                    content: t.content || ""
                }))
            );
        }

        return NextResponse.json(blog);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
    }
}

