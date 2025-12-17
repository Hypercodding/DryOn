import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductTranslation extends Document {
    productId: mongoose.Types.ObjectId;
    locale: string;
    name: string;
    description: string;
}

const ProductTranslationSchema = new Schema<IProductTranslation>({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    locale: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
});

ProductTranslationSchema.index({ productId: 1, locale: 1 }, { unique: true });

const ProductTranslation: Model<IProductTranslation> = (mongoose.models && mongoose.models.ProductTranslation) 
    ? mongoose.models.ProductTranslation 
    : mongoose.model<IProductTranslation>('ProductTranslation', ProductTranslationSchema);

export default ProductTranslation;

