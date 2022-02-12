import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import { encrypt } from '@services/hash';
const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isbn: { type: String,  required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
},
    { timestamps: true }
);
BookSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Book = mongoose.model("Book", BookSchema, "Book");
export default Book;