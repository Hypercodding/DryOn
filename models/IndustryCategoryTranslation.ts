import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IIndustryCategoryTranslation extends Document {
    industryCategoryId: mongoose.Types.ObjectId;
    locale: string;
    name: string;
}

const IndustryCategoryTranslationSchema = new Schema<IIndustryCategoryTranslation>({
    industryCategoryId: { type: Schema.Types.ObjectId, required: true, ref: 'IndustryCategory' },
    locale: { type: String, required: true },
    name: { type: String, required: true },
});

IndustryCategoryTranslationSchema.index({ industryCategoryId: 1, locale: 1 }, { unique: true });

const IndustryCategoryTranslation: Model<IIndustryCategoryTranslation> = (mongoose.models && mongoose.models.IndustryCategoryTranslation) 
    ? mongoose.models.IndustryCategoryTranslation 
    : mongoose.model<IIndustryCategoryTranslation>('IndustryCategoryTranslation', IndustryCategoryTranslationSchema);

export default IndustryCategoryTranslation;

