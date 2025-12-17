import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    sku: string;
    categoryId?: mongoose.Types.ObjectId;
    industryId?: mongoose.Types.ObjectId;
    images: string;
    containerPoints?: string;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    sku: { type: String, required: true, unique: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    industryId: { type: Schema.Types.ObjectId, ref: 'IndustryCategory' },
    images: { type: String, required: true },
    containerPoints: { type: String },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

ProductSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Product: Model<IProduct> = (mongoose.models && mongoose.models.Product) 
    ? mongoose.models.Product 
    : mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

