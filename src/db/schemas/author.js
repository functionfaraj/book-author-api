import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import mongoosePaginate from '../plugins/pagination';
const AuthorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String,  required: true },
},
    { timestamps: true }
);
AuthorSchema.index({ "first_name": 1, "last_name": 1 }, { "unique": true });
AuthorSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
AuthorSchema.plugin(mongoosePaginate)
const Author = mongoose.model("Author", AuthorSchema, "Authors");
export default Author;