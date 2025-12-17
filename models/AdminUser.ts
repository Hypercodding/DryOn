import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminUser extends Document {
    email: string;
    password: string;
    name: string;
    avatar?: string;
    roleId?: mongoose.Types.ObjectId;
    isActive: boolean;
    lastLoginAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    avatar: { type: String },
    roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

AdminUserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const AdminUser: Model<IAdminUser> = (mongoose.models && mongoose.models.AdminUser) 
    ? mongoose.models.AdminUser 
    : mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);

export default AdminUser;

