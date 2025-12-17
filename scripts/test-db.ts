import connectDB from '../lib/mongodb';
import ProductCategory from '../models/ProductCategory';
import IndustryCategory from '../models/IndustryCategory';
import ProductCategoryTranslation from '../models/ProductCategoryTranslation';
import IndustryCategoryTranslation from '../models/IndustryCategoryTranslation';

async function test() {
    try {
        console.log('🔍 Testing database connection...\n');
        await connectDB();
        console.log('✅ Connected to MongoDB\n');

        console.log('📦 Checking Product Categories...');
        const productCategories = await ProductCategory.find({});
        console.log(`   Found ${productCategories.length} product categories`);
        
        if (productCategories.length > 0) {
            for (const cat of productCategories) {
                const translations = await ProductCategoryTranslation.find({ productCategoryId: cat._id });
                console.log(`   - ${cat.slug}: ${translations.length} translations`);
            }
        }

        console.log('\n🏭 Checking Industry Categories...');
        const industryCategories = await IndustryCategory.find({});
        console.log(`   Found ${industryCategories.length} industry categories`);
        
        if (industryCategories.length > 0) {
            for (const ind of industryCategories) {
                const translations = await IndustryCategoryTranslation.find({ industryCategoryId: ind._id });
                console.log(`   - ${ind.slug}: ${translations.length} translations`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

test();

