import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactInquiry extends Document {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message: string;
    status: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    message: { type: String, required: true },
    status: { type: String, default: 'new' },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

ContactInquirySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const ContactInquiry: Model<IContactInquiry> = (mongoose.models && mongoose.models.ContactInquiry) 
    ? mongoose.models.ContactInquiry 
    : mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);

export default ContactInquiry;

