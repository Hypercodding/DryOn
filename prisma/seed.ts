import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    try {
        const email = 'admin@example.com';
        console.log('Hashing password...');
        const password = await bcrypt.hash('password123', 10);
        console.log('Password hashed. Upserting user...');

        const user = await prisma.adminUser.upsert({
            where: { email },
            update: {},
            create: {
                email,
                password,
                role: 'ADMIN',
            },
        });
        console.log('Admin user seed successful:', user.email);

        // Product Seeds
        const products = [
            {
                sku: 'AP-001',
                images: JSON.stringify(['/images/absorpole.jpg']),
                translations: {
                    en: {
                        name: 'AbsorPole',
                        description: 'The AbsorPole is based on the proven ability of calcium chloride to aggressively remove moisture from the air.'
                    },
                    fr: {
                        name: 'AbsorPole',
                        description: 'L\'AbsorPole est basé sur la capacité prouvée du chlorure de calcium à éliminer agressivement l\'humidité de l\'air.'
                    },
                    es: {
                        name: 'AbsorPole',
                        description: 'El AbsorPole se basa en la capacidad probada del cloruro de calcio para eliminar agresivamente la humedad del aire.'
                    },
                    ar: {
                        name: 'أبسوربول',
                        description: 'يعتمد AbsorPole على القدرة المثبتة لكلوريد الكالسيوم على إزالة الرطوبة بقوة من الهواء.'
                    }
                }
            },
            {
                sku: 'AB-001',
                images: JSON.stringify(['/images/absorbag.jpg']),
                translations: {
                    en: {
                        name: 'AbsorBag',
                        description: 'AbsorBag allows the use of calcium chloride in a safe and convenient way.'
                    },
                    fr: {
                        name: 'AbsorBag',
                        description: 'AbsorBag permet l\'utilisation du chlorure de calcium de manière sûre et pratique.'
                    },
                    es: {
                        name: 'AbsorBag',
                        description: 'AbsorBag permite el uso de cloruro de calcio de una manera segura y conveniente.'
                    },
                    ar: {
                        name: 'أبسورباج',
                        description: 'يسمح AbsorBag باستخدام كلوريد الكالسيوم بطريقة آمنة ومريحة.'
                    }
                }
            }
        ];

        console.log('Seeding products...');
        for (const p of products) {
            const product = await prisma.product.upsert({
                where: { sku: p.sku },
                update: {},
                create: {
                    sku: p.sku,
                    images: p.images,
                },
            });

            for (const [locale, t] of Object.entries(p.translations)) {
                await prisma.productTranslation.upsert({
                    where: {
                        productId_locale: {
                            productId: product.id,
                            locale
                        }
                    },
                    update: {
                        name: t.name,
                        description: t.description
                    },
                    create: {
                        productId: product.id,
                        locale,
                        name: t.name,
                        description: t.description
                    }
                });
            }
        }
        console.log('Products seeded successfully.');

    } catch (error) {
        console.error('Error in seed:', error);
        throw error;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('Fatal error:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
