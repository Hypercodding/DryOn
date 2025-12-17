import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductCategoryTranslation extends Document {
    productCategoryId: mongoose.Types.ObjectId;
    locale: string;
    name: string;
    description: string;
}

const ProductCategoryTranslationSchema = new Schema<IProductCategoryTranslation>({
    productCategoryId: { type: Schema.Types.ObjectId, required: true, ref: 'ProductCategory' },
    locale: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
});

ProductCategoryTranslationSchema.index({ productCategoryId: 1, locale: 1 }, { unique: true });

const ProductCategoryTranslation: Model<IProductCategoryTranslation> = (mongoose.models && mongoose.models.ProductCategoryTranslation) 
    ? mongoose.models.ProductCategoryTranslation 
    : mongoose.model<IProductCategoryTranslation>('ProductCategoryTranslation', ProductCategoryTranslationSchema);

export default ProductCategoryTranslation;

