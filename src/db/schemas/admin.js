import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import { encrypt } from '@services/hash';
const AdminSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, index: true, unique: true, required: true },
    phone_number: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
},
    { timestamps: true }
);
AdminSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
AdminSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = encrypt(this.password)
    }
    this.email = this.email.toLowerCase()
    next()
})
AdminSchema.pre(['updateOne', 'findOneAndUpdate', 'update', 'findByIdAndUpdate'], function (next) {
    if (this._update && this._update.password !== undefined) {
        this._update.password = encrypt(this._update.password)
    }
    if (this._update && this._update.email !== undefined) {
        this._update.email = this._update.email.toLowerCase()
    }
    next()
})
const Admin = mongoose.model("Admin", AdminSchema, "Admin");
export default Admin;