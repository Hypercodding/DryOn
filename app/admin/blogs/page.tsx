import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogTranslation from "@/models/BlogTranslation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Edit, Plus, Trash2 } from "lucide-react";

export default async function BlogList() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const mongoose = await connectDB();

    // Ensure all models are registered
    if (!mongoose.models.Blog) {
        await import('@/models/Blog');
    }
    if (!mongoose.models.BlogTranslation) {
        await import('@/models/BlogTranslation');
    }

    const blogs = await Blog.find({}).sort({ createdAt: -1 });

    const blogIds = blogs.map(b => b._id);
    const translations = await BlogTranslation.find({ blogId: { $in: blogIds } });

    const blogsWithTranslations = blogs.map(blog => {
        const blogTrans = translations.filter(t => t.blogId.toString() === blog._id.toString());
        
        return {
            ...blog.toObject(),
            id: blog._id.toString(),
            translations: blogTrans,
        };
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-secondary">Blogs</h1>
                <Link
                    href="/admin/blogs/new"
                    className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Blog
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-bold text-secondary">Slug</th>
                            <th className="p-4 font-bold text-secondary">Title (EN)</th>
                            <th className="p-4 font-bold text-secondary">Category</th>
                            <th className="p-4 font-bold text-secondary">Published</th>
                            <th className="p-4 font-bold text-secondary">Date</th>
                            <th className="p-4 font-bold text-secondary text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-gray-500">
                                    No blogs found. Click &quot;Add Blog&quot; to create one.
                                </td>
                            </tr>
                        ) : (
                            blogsWithTranslations.map(blog => {
                                const enTrans = blog.translations.find((t: any) => t.locale === 'en');
                                const date = blog.publishedAt || blog.createdAt;
                                
                                return (
                                    <tr key={blog.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                        <td className="p-4 font-medium font-mono text-sm">{blog.slug}</td>
                                        <td className="p-4">{enTrans?.title || '-'}</td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {blog.published ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            {date ? new Date(date).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={`/admin/blogs/${blog.id}`} 
                                                    className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                                <form action={`/api/blogs/${blog.id}`} method="DELETE" className="inline">
                                                    <button
                                                        type="submit"
                                                        onClick={async (e) => {
                                                            e.preventDefault();
                                                            if (!confirm('Are you sure you want to delete this blog?')) return;
                                                            const res = await fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' });
                                                            if (res.ok) {
                                                                window.location.reload();
                                                            }
                                                        }}
                                                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

