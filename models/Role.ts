import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRole extends Document {
    name: string;
    description: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

const RoleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    color: { type: String, default: 'bg-gray-500' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

RoleSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Role: Model<IRole> = (mongoose.models && mongoose.models.Role) 
    ? mongoose.models.Role 
    : mongoose.model<IRole>('Role', RoleSchema);

export default Role;

