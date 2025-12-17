import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
    key: string;
    value: string;
    type: string;
    group: string;
    createdAt: Date;
    updatedAt: Date;
}

const SettingSchema = new Schema<ISetting>({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    type: { type: String, default: 'string' },
    group: { type: String, default: 'general' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

SettingSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Setting: Model<ISetting> = (mongoose.models && mongoose.models.Setting) 
    ? mongoose.models.Setting 
    : mongoose.model<ISetting>('Setting', SettingSchema);

export default Setting;

