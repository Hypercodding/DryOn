import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IActivityLog extends Document {
    userId: mongoose.Types.ObjectId;
    action: string;
    module: string;
    details: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'AdminUser' },
    action: { type: String, required: true },
    module: { type: String, required: true },
    details: { type: String, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const ActivityLog: Model<IActivityLog> = (mongoose.models && mongoose.models.ActivityLog) 
    ? mongoose.models.ActivityLog 
    : mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

export default ActivityLog;

