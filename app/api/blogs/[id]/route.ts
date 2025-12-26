import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogTranslation from "@/models/BlogTranslation";
import { NextResponse } from "next/server";

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
    const mongoose = await connectDB();
    const params = await props.params;

    // Ensure all models are registered
    if (!mongoose.models.Blog) {
        await import('@/models/Blog');
    }
    if (!mongoose.models.BlogTranslation) {
        await import('@/models/BlogTranslation');
    }

    const blog = await Blog.findById(params.id);

    if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const translations = await BlogTranslation.find({ blogId: blog._id });

    const blogObj = {
        ...blog.toObject(),
        translations,
    };

    return NextResponse.json(blogObj);
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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

        const blog = await Blog.findByIdAndUpdate(
            params.id,
            {
                slug,
                category: category || 'Education',
                featuredImage: featuredImage || undefined,
                published: published || false,
            },
            { new: true }
        );

        if (!blog) {
            return NextResponse.json({ error: "Blog not found" }, { status: 404 });
        }

        if (translations && Array.isArray(translations)) {
            // Delete existing and recreate
            await BlogTranslation.deleteMany({ blogId: params.id });

            if (translations.length > 0) {
                await BlogTranslation.insertMany(
                    translations.map((t: { locale: string; title: string; excerpt: string; content: string }) => ({
                        blogId: params.id,
                        locale: t.locale,
                        title: t.title,
                        excerpt: t.excerpt,
                        content: t.content || ""
                    }))
                );
            }
        }

        return NextResponse.json(blog);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: "Blog with this slug already exists" }, { status: 400 });
        }
        return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
    }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
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
        
        await Blog.findByIdAndDelete(params.id);
        await BlogTranslation.deleteMany({ blogId: params.id });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
    }
}

