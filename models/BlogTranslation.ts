import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogTranslation extends Document {
    blogId: mongoose.Types.ObjectId;
    locale: string;
    title: string;
    excerpt: string;
    content: string;
}

const BlogTranslationSchema = new Schema<IBlogTranslation>({
    blogId: { type: Schema.Types.ObjectId, required: true, ref: 'Blog' },
    locale: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
});

BlogTranslationSchema.index({ blogId: 1, locale: 1 }, { unique: true });

const BlogTranslation: Model<IBlogTranslation> = (mongoose.models && mongoose.models.BlogTranslation) 
    ? mongoose.models.BlogTranslation 
    : mongoose.model<IBlogTranslation>('BlogTranslation', BlogTranslationSchema);

export default BlogTranslation;

