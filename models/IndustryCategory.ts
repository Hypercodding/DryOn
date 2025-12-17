import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IIndustryCategory extends Document {
    slug: string;
    icon: string;
    color: string;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

const IndustryCategorySchema = new Schema<IIndustryCategory>({
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: 'Factory' },
    color: { type: String, default: 'bg-gray-500' },
    sortOrder: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

IndustryCategorySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const IndustryCategory: Model<IIndustryCategory> = (mongoose.models && mongoose.models.IndustryCategory) 
    ? mongoose.models.IndustryCategory 
    : mongoose.model<IIndustryCategory>('IndustryCategory', IndustryCategorySchema);

export default IndustryCategory;

