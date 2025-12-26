import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import BlogTranslation from '@/models/BlogTranslation';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BlogForm from '@/components/admin/BlogForm';

export default async function BlogEditPage(props: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) redirect("/admin/login");

    await connectDB();
    const params = await props.params;
    const isNew = params.id === 'new';

    let blog = null;
    if (!isNew) {
        const foundBlog = await Blog.findById(params.id);
        if (foundBlog) {
            const translations = await BlogTranslation.find({ blogId: foundBlog._id });
            const blogObj = foundBlog.toObject();
            blog = {
                ...blogObj,
                id: foundBlog._id.toString(),
                translations: translations.map(t => ({
                    locale: t.locale,
                    title: t.title,
                    excerpt: t.excerpt,
                    content: t.content
                }))
            };
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <BlogForm initialData={blog ?? undefined} />
        </div>
    );
}

