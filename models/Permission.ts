import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPermission extends Document {
    name: string;
    description: string;
    module: string;
    action: string;
    createdAt: Date;
}

const PermissionSchema = new Schema<IPermission>({
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    module: { type: String, required: true },
    action: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Permission: Model<IPermission> = (mongoose.models && mongoose.models.Permission) 
    ? mongoose.models.Permission 
    : mongoose.model<IPermission>('Permission', PermissionSchema);

export default Permission;

