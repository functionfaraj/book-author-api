import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';
import mongoosePaginate from '../plugins/pagination';
const BookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    isbn: { type: String,  required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
},
    { timestamps: true }
);
BookSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
BookSchema.index({ "isbn": 1 }, { "unique": true });
BookSchema.plugin(mongoosePaginate)
const Book = mongoose.model("Book", BookSchema, "Books");
export default Book;