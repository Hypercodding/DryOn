import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductCategory extends Document {
    slug: string;
    icon: string;
    color: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductCategorySchema = new Schema<IProductCategory>({
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: 'Package' },
    color: { type: String, default: 'from-blue-500 to-blue-600' },
    sortOrder: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

ProductCategorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const ProductCategory: Model<IProductCategory> = (mongoose.models && mongoose.models.ProductCategory) 
    ? mongoose.models.ProductCategory 
    : mongoose.model<IProductCategory>('ProductCategory', ProductCategorySchema);

export default ProductCategory;

