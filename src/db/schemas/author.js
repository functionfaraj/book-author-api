import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import { encrypt } from '@services/hash';
const AuthorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String,  required: true },
},
    { timestamps: true }
);
AuthorSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Author = mongoose.model("Author", AuthorSchema, "Author");
export default Author;