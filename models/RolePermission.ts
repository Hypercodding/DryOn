import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRolePermission extends Document {
    roleId: mongoose.Types.ObjectId;
    permissionId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const RolePermissionSchema = new Schema<IRolePermission>({
    roleId: { type: Schema.Types.ObjectId, required: true, ref: 'Role' },
    permissionId: { type: Schema.Types.ObjectId, required: true, ref: 'Permission' },
    createdAt: { type: Date, default: Date.now },
});

RolePermissionSchema.index({ roleId: 1 });
RolePermissionSchema.index({ permissionId: 1 });
RolePermissionSchema.index({ roleId: 1, permissionId: 1 }, { unique: true });

const RolePermission: Model<IRolePermission> = (mongoose.models && mongoose.models.RolePermission) 
    ? mongoose.models.RolePermission 
    : mongoose.model<IRolePermission>('RolePermission', RolePermissionSchema);

export default RolePermission;

