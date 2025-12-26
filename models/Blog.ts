import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    slug: string;
    category: string;
    featuredImage?: string;
    published: boolean;
    publishedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, default: 'Education' },
    featuredImage: { type: String },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

BlogSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    if (this.published && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

const Blog: Model<IBlog> = (mongoose.models && mongoose.models.Blog) 
    ? mongoose.models.Blog 
    : mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;

