import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local first, then .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import connectDB from '../lib/mongodb';
import bcrypt from 'bcryptjs';
import Permission from '../models/Permission';
import Role from '../models/Role';
import RolePermission from '../models/RolePermission';
import AdminUser from '../models/AdminUser';
import ProductCategory from '../models/ProductCategory';
import ProductCategoryTranslation from '../models/ProductCategoryTranslation';
import IndustryCategory from '../models/IndustryCategory';
import IndustryCategoryTranslation from '../models/IndustryCategoryTranslation';
import Setting from '../models/Setting';

/** @description Database seed script - run with: npm run seed */

// Permissions by module
const permissions = [
    // Products
    { name: 'products.create', module: 'products', action: 'create', description: 'Create new products' },
    { name: 'products.read', module: 'products', action: 'read', description: 'View products' },
    { name: 'products.update', module: 'products', action: 'update', description: 'Edit products' },
    { name: 'products.delete', module: 'products', action: 'delete', description: 'Delete products' },
    // Categories
    { name: 'categories.create', module: 'categories', action: 'create', description: 'Create categories' },
    { name: 'categories.read', module: 'categories', action: 'read', description: 'View categories' },
    { name: 'categories.update', module: 'categories', action: 'update', description: 'Edit categories' },
    { name: 'categories.delete', module: 'categories', action: 'delete', description: 'Delete categories' },
    // Industries
    { name: 'industries.create', module: 'industries', action: 'create', description: 'Create industries' },
    { name: 'industries.read', module: 'industries', action: 'read', description: 'View industries' },
    { name: 'industries.update', module: 'industries', action: 'update', description: 'Edit industries' },
    { name: 'industries.delete', module: 'industries', action: 'delete', description: 'Delete industries' },
    // Users
    { name: 'users.create', module: 'users', action: 'create', description: 'Create admin users' },
    { name: 'users.read', module: 'users', action: 'read', description: 'View admin users' },
    { name: 'users.update', module: 'users', action: 'update', description: 'Edit admin users' },
    { name: 'users.delete', module: 'users', action: 'delete', description: 'Delete admin users' },
    // Roles
    { name: 'roles.create', module: 'roles', action: 'create', description: 'Create roles' },
    { name: 'roles.read', module: 'roles', action: 'read', description: 'View roles' },
    { name: 'roles.update', module: 'roles', action: 'update', description: 'Edit roles' },
    { name: 'roles.delete', module: 'roles', action: 'delete', description: 'Delete roles' },
    // Settings
    { name: 'settings.read', module: 'settings', action: 'read', description: 'View settings' },
    { name: 'settings.update', module: 'settings', action: 'update', description: 'Edit settings' },
    // Inquiries
    { name: 'inquiries.read', module: 'inquiries', action: 'read', description: 'View contact inquiries' },
    { name: 'inquiries.update', module: 'inquiries', action: 'update', description: 'Update inquiry status' },
    { name: 'inquiries.delete', module: 'inquiries', action: 'delete', description: 'Delete inquiries' },
    // Activity Logs
    { name: 'logs.read', module: 'logs', action: 'read', description: 'View activity logs' },
];

const productCategories = [
    { slug: 'dryon', icon: 'Droplets', color: 'from-blue-500 to-blue-600', sortOrder: 1, nameEn: 'DryON', descEn: 'Calcium Chloride-Based Container Desiccants for Shipping Containers', nameAr: 'دراي أون' },
    { slug: 'super-dryon', icon: 'Package', color: 'from-primary to-primary-dark', sortOrder: 2, nameEn: 'Super DryON', descEn: 'In-Box Desiccants for cartons, boxes or polybags', nameAr: 'سوبر دراي أون' },
    { slug: 'greenpro', icon: 'Shield', color: 'from-emerald-500 to-emerald-600', sortOrder: 3, nameEn: 'GreenPro', descEn: 'Transafeliners and hermetic packaging for bulk cargo protection', nameAr: 'جرين برو' },
    { slug: 'freshon', icon: 'Apple', color: 'from-orange-500 to-orange-600', sortOrder: 4, nameEn: 'FreshON', descEn: 'Ethylene Absorber for extending shelf-life of fruits and vegetables', nameAr: 'فريش أون' },
    { slug: 'drypak-eco', icon: 'Leaf', color: 'from-green-500 to-green-600', sortOrder: 5, nameEn: 'DryPak ECO', descEn: '100% Sustainable and Plastic-Free Desiccants', nameAr: 'دراي باك إيكو' },
];

const industryCategories = [
    { slug: 'agriculture', icon: 'Leaf', color: 'bg-green-500', sortOrder: 1, nameEn: 'Agriculture', nameAr: 'الزراعة' },
    { slug: 'dry-fruits', icon: 'Coffee', color: 'bg-amber-500', sortOrder: 2, nameEn: 'Dry Fruits', nameAr: 'الفواكه المجففة' },
    { slug: 'textile', icon: 'Shirt', color: 'bg-blue-500', sortOrder: 3, nameEn: 'Textile Apparels', nameAr: 'الملابس النسيجية' },
    { slug: 'leather', icon: 'Package', color: 'bg-orange-600', sortOrder: 4, nameEn: 'Leather Goods', nameAr: 'السلع الجلدية' },
    { slug: 'processed-food', icon: 'Apple', color: 'bg-red-500', sortOrder: 5, nameEn: 'Processed Food', nameAr: 'الأطعمة المصنعة' },
    { slug: 'canned-items', icon: 'Box', color: 'bg-gray-600', sortOrder: 6, nameEn: 'Canned Items', nameAr: 'المعلبات' },
    { slug: 'engineering', icon: 'Wrench', color: 'bg-slate-600', sortOrder: 7, nameEn: 'Engineering Goods', nameAr: 'السلع الهندسية' },
    { slug: 'automotive', icon: 'Car', color: 'bg-indigo-500', sortOrder: 8, nameEn: 'Auto-motives', nameAr: 'السيارات' },
    { slug: 'logistics', icon: 'Ship', color: 'bg-cyan-600', sortOrder: 9, nameEn: 'Transportation & Logistics', nameAr: 'النقل واللوجستيات' },
];

const defaultSettings = [
    { key: 'site_name', value: 'DryON Pakistan', type: 'string', group: 'general' },
    { key: 'site_tagline', value: 'Moisture Control Solutions', type: 'string', group: 'general' },
    { key: 'contact_email', value: 'info@dryon.pk', type: 'string', group: 'contact' },
    { key: 'contact_phone', value: '+92 300 1234567', type: 'string', group: 'contact' },
    { key: 'contact_address', value: 'Lahore, Pakistan', type: 'string', group: 'contact' },
    { key: 'facebook_url', value: 'https://facebook.com/dryonpk', type: 'string', group: 'social' },
    { key: 'instagram_url', value: 'https://instagram.com/dryonpk', type: 'string', group: 'social' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/dryon', type: 'string', group: 'social' },
];

async function main() {
    console.log('🌱 Seeding database...\n');

    // Connect to database
    await connectDB();
    console.log('✅ Connected to MongoDB\n');

    // Create permissions
    console.log('📋 Creating permissions...');
    for (const perm of permissions) {
        await Permission.findOneAndUpdate(
            { name: perm.name },
            perm,
            { upsert: true, new: true }
        );
    }
    console.log(`   ✅ Created ${permissions.length} permissions\n`);

    // Create roles
    console.log('👥 Creating roles...');
    const allPermissions = await Permission.find({});
    
    // Super Admin role - all permissions
    const superAdminRole = await Role.findOneAndUpdate(
        { name: 'Super Admin' },
        {
            name: 'Super Admin',
            description: 'Full access to all system features',
            color: 'bg-red-500',
        },
        { upsert: true, new: true }
    );

    // Delete existing role permissions for super admin
    await RolePermission.deleteMany({ roleId: superAdminRole._id });
    // Create new role permissions
    await RolePermission.insertMany(
        allPermissions.map(p => ({
            roleId: superAdminRole._id,
            permissionId: p._id
        }))
    );

    // Admin role - most permissions except user/role management
    const adminPermissions = allPermissions.filter(p => !p.module.includes('roles') && p.name !== 'users.delete');
    const adminRole = await Role.findOneAndUpdate(
        { name: 'Admin' },
        {
            name: 'Admin',
            description: 'Manage content and view reports',
            color: 'bg-blue-500',
        },
        { upsert: true, new: true }
    );

    await RolePermission.deleteMany({ roleId: adminRole._id });
    await RolePermission.insertMany(
        adminPermissions.map(p => ({
            roleId: adminRole._id,
            permissionId: p._id
        }))
    );

    // Editor role - content management only
    const editorPermissions = allPermissions.filter(p => 
        ['products', 'categories', 'industries'].includes(p.module)
    );
    const editorRole = await Role.findOneAndUpdate(
        { name: 'Editor' },
        {
            name: 'Editor',
            description: 'Manage products and categories',
            color: 'bg-green-500',
        },
        { upsert: true, new: true }
    );

    await RolePermission.deleteMany({ roleId: editorRole._id });
    await RolePermission.insertMany(
        editorPermissions.map(p => ({
            roleId: editorRole._id,
            permissionId: p._id
        }))
    );

    // Viewer role - read only
    const viewerPermissions = allPermissions.filter(p => p.action === 'read');
    const viewerRole = await Role.findOneAndUpdate(
        { name: 'Viewer' },
        {
            name: 'Viewer',
            description: 'View-only access to dashboard',
            color: 'bg-gray-500',
        },
        { upsert: true, new: true }
    );

    await RolePermission.deleteMany({ roleId: viewerRole._id });
    await RolePermission.insertMany(
        viewerPermissions.map(p => ({
            roleId: viewerRole._id,
            permissionId: p._id
        }))
    );
    console.log('   ✅ Created 4 roles\n');

    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await AdminUser.findOneAndUpdate(
        { email: 'admin@dryon.pk' },
        {
            email: 'admin@dryon.pk',
            password: hashedPassword,
            name: 'Super Admin',
            roleId: superAdminRole._id,
            isActive: true,
        },
        { upsert: true, new: true }
    );
    console.log('   ✅ Created: admin@dryon.pk / admin123\n');

    // Seed product categories
    console.log('📦 Creating product categories...');
    for (const cat of productCategories) {
        const existing = await ProductCategory.findOne({ slug: cat.slug });
        if (!existing) {
            const category = await ProductCategory.create({
                slug: cat.slug,
                icon: cat.icon,
                color: cat.color,
                sortOrder: cat.sortOrder,
            });

            await ProductCategoryTranslation.insertMany([
                { productCategoryId: category._id, locale: 'en', name: cat.nameEn, description: cat.descEn },
                { productCategoryId: category._id, locale: 'ar', name: cat.nameAr, description: cat.descEn },
            ]);
        }
    }
    console.log(`   ✅ Created ${productCategories.length} product categories\n`);

    // Seed industry categories
    console.log('🏭 Creating industry categories...');
    for (const ind of industryCategories) {
        const existing = await IndustryCategory.findOne({ slug: ind.slug });
        if (!existing) {
            const industry = await IndustryCategory.create({
                slug: ind.slug,
                icon: ind.icon,
                color: ind.color,
                sortOrder: ind.sortOrder,
            });

            await IndustryCategoryTranslation.insertMany([
                { industryCategoryId: industry._id, locale: 'en', name: ind.nameEn },
                { industryCategoryId: industry._id, locale: 'ar', name: ind.nameAr },
            ]);
        }
    }
    console.log(`   ✅ Created ${industryCategories.length} industry categories\n`);

    // Seed settings
    console.log('⚙️  Creating settings...');
    for (const setting of defaultSettings) {
        await Setting.findOneAndUpdate(
            { key: setting.key },
            setting,
            { upsert: true, new: true }
        );
    }
    console.log(`   ✅ Created ${defaultSettings.length} settings\n`);

    console.log('🎉 Seeding complete!');
    process.exit(0);
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    });

