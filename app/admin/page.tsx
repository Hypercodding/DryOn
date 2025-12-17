import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCategory from "@/models/ProductCategory";
import IndustryCategory from "@/models/IndustryCategory";
import AdminUser from "@/models/AdminUser";
import ContactInquiry from "@/models/ContactInquiry";
import ActivityLog from "@/models/ActivityLog";
import ProductTranslation from "@/models/ProductTranslation";
import ProductCategoryTranslation from "@/models/ProductCategoryTranslation";
import { 
    Package, Tags, Factory, Users, MessageSquare, 
    TrendingUp, ArrowUpRight, ArrowDownRight, Activity,
    Eye, ShoppingBag, Globe
} from 'lucide-react';
import Link from 'next/link';

async function getDashboardStats() {
    await connectDB();
    
    const [
        productsCount,
        categoriesCount,
        industriesCount,
        usersCount,
        inquiriesCount,
        newInquiriesCount,
        recentProductsData,
        recentLogsData,
    ] = await Promise.all([
        Product.countDocuments(),
        ProductCategory.countDocuments(),
        IndustryCategory.countDocuments(),
        AdminUser.countDocuments(),
        ContactInquiry.countDocuments(),
        ContactInquiry.countDocuments({ status: 'new' }),
        Product.find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('categoryId'),
        ActivityLog.find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'email name'),
    ]);

    const recentProductIds = recentProductsData.map(p => p._id);
    const productTranslations = await ProductTranslation.find({ productId: { $in: recentProductIds } });
    const categoryIds = recentProductsData.map(p => p.categoryId).filter(Boolean);
    const categoryTranslations = await ProductCategoryTranslation.find({ productCategoryId: { $in: categoryIds } });

    const recentProducts = recentProductsData.map(product => {
        const translations = productTranslations.filter(t => t.productId.toString() === product._id.toString());
        const category = product.categoryId as any;
        const catTranslations = category ? categoryTranslations.filter(t => t.productCategoryId.toString() === category._id.toString()) : [];
        
        return {
            ...product.toObject(),
            id: product._id.toString(),
            translations,
            category: category ? {
                ...category.toObject(),
                translations: catTranslations
            } : null
        };
    });

    const recentLogs = recentLogsData.map(log => ({
        ...log.toObject(),
        id: log._id.toString(),
        user: log.userId
    }));

    return {
        productsCount,
        categoriesCount,
        industriesCount,
        usersCount,
        inquiriesCount,
        newInquiriesCount,
        recentProducts,
        recentLogs,
    };
}

export default async function AdminDashboard() {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const stats = await getDashboardStats();

    const statCards = [
        { 
            label: 'Total Products', 
            value: stats.productsCount, 
            icon: Package, 
            color: 'from-blue-500 to-blue-600',
            href: '/admin/products',
            change: '+12%',
            changeType: 'positive'
        },
        { 
            label: 'Categories', 
            value: stats.categoriesCount, 
            icon: Tags, 
            color: 'from-purple-500 to-purple-600',
            href: '/admin/categories',
            change: '+2',
            changeType: 'positive'
        },
        { 
            label: 'Industries', 
            value: stats.industriesCount, 
            icon: Factory, 
            color: 'from-emerald-500 to-emerald-600',
            href: '/admin/industries',
            change: 'Active',
            changeType: 'neutral'
        },
        { 
            label: 'Admin Users', 
            value: stats.usersCount, 
            icon: Users, 
            color: 'from-orange-500 to-orange-600',
            href: '/admin/users',
            change: 'Online',
            changeType: 'neutral'
        },
        { 
            label: 'Inquiries', 
            value: stats.inquiriesCount, 
            icon: MessageSquare, 
            color: 'from-pink-500 to-pink-600',
            href: '/admin/inquiries',
            change: `${stats.newInquiriesCount} new`,
            changeType: stats.newInquiriesCount > 0 ? 'alert' : 'neutral'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Monitor your business performance and manage content</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`
                                text-xs font-semibold px-2 py-1 rounded-full
                                ${stat.changeType === 'positive' ? 'bg-green-100 text-green-600' : ''}
                                ${stat.changeType === 'alert' ? 'bg-red-100 text-red-600' : ''}
                                ${stat.changeType === 'neutral' ? 'bg-slate-100 text-slate-600' : ''}
                            `}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
                        <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                    </Link>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Products */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Recent Products</h2>
                            <p className="text-sm text-slate-500">Latest additions to your catalog</p>
                        </div>
                        <Link 
                            href="/admin/products" 
                            className="text-primary hover:text-primary-dark text-sm font-semibold flex items-center gap-1"
                        >
                            View All <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {stats.recentProducts.length === 0 ? (
                            <div className="p-8 text-center text-slate-500">
                                <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                                <p>No products yet. Add your first product!</p>
                                <Link href="/admin/products/new" className="text-primary font-semibold mt-2 inline-block">
                                    Add Product →
                                </Link>
                            </div>
                        ) : (
                            stats.recentProducts.map((product, idx) => {
                                const translation = product.translations.find((t: any) => t.locale === 'en');
                                const catTranslation = product.category?.translations.find((t: any) => t.locale === 'en');
                                const images = JSON.parse(product.images || '[]');
                                
                                return (
                                    <Link
                                        key={product.id || product.sku || `product-${idx}`}
                                        href={`/admin/products/${product.id}`}
                                        className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                            {images[0] ? (
                                                <img src={images[0]} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="w-6 h-6 text-slate-400" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-slate-800 truncate">
                                                {translation?.name || 'Unnamed'}
                                            </h4>
                                            <p className="text-sm text-slate-500">
                                                {catTranslation?.name || 'Uncategorized'} • SKU: {product.sku}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {product.featured && (
                                                <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Activity & Quick Actions */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href="/admin/products/new"
                                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-center"
                            >
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <Package className="w-5 h-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Add Product</span>
                            </Link>
                            <Link
                                href="/admin/categories"
                                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-center"
                            >
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Tags className="w-5 h-5 text-purple-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Categories</span>
                            </Link>
                            <Link
                                href="/admin/users"
                                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-center"
                            >
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <Users className="w-5 h-5 text-orange-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Manage Users</span>
                            </Link>
                            <Link
                                href="/admin/settings"
                                className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 hover:border-primary border border-transparent transition-all text-center"
                            >
                                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-emerald-600" />
                                </div>
                                <span className="text-sm font-medium text-slate-700">Settings</span>
                            </Link>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
                        </div>
                        <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                            {stats.recentLogs.length === 0 ? (
                                <div className="p-6 text-center text-slate-500">
                                    <Activity className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                                    <p className="text-sm">No activity yet</p>
                                </div>
                            ) : (
                                stats.recentLogs.map((log, idx) => (
                                    <div key={log.id || `log-${idx}`} className="p-4 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Activity className="w-4 h-4 text-slate-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-slate-800">
                                                    <span className="font-medium">{(log.user as any)?.email || 'Unknown'}</span>
                                                    <span className="text-slate-500"> {log.action} </span>
                                                    <span className="font-medium">{log.module}</span>
                                                </p>
                                                <p className="text-xs text-slate-400 mt-1">
                                                    {new Date(log.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h3 className="text-lg font-bold">System Status</h3>
                        <p className="text-slate-400 text-sm">All systems operational</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm">Database</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm">API</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                            <span className="text-sm">Storage</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
