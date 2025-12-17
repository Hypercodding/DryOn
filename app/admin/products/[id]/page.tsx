import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductTranslation from '@/models/ProductTranslation';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductForm from '@/components/admin/ProductForm';

export default async function ProductEditPage(props: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) redirect("/admin/login");

    await connectDB();
    const params = await props.params;
    const isNew = params.id === 'new';

    let product = null;
    if (!isNew) {
        const foundProduct = await Product.findById(params.id);
        if (foundProduct) {
            const translations = await ProductTranslation.find({ productId: foundProduct._id });
            const productObj = foundProduct.toObject();
            product = {
                ...productObj,
                id: foundProduct._id.toString(),
                categoryId: productObj.categoryId ? productObj.categoryId.toString() : null,
                industryId: productObj.industryId ? productObj.industryId.toString() : null,
                translations: translations.map(t => ({
                    locale: t.locale,
                    name: t.name,
                    description: t.description
                }))
            };
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <ProductForm initialData={product ?? undefined} />
        </div>
    );
}
