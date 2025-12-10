import { prisma } from '@/lib/prisma';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProductForm from '@/components/admin/ProductForm';

export default async function ProductEditPage(props: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) redirect("/admin/login");

    const params = await props.params;
    const isNew = params.id === 'new';

    let product = null;
    if (!isNew) {
        product = await prisma.product.findUnique({
            where: { id: params.id },
            include: { translations: true }
        });
    }

    return (
        <div className="max-w-4xl mx-auto">
            <ProductForm initialData={product} />
        </div>
    );
}
