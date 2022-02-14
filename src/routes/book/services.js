import Book from '@db/schemas/book'
import Author from '@db/schemas/author'

export const getAll = async ({ limit = 10, page = 1 }) => {
    console.log('limit,limit', limit)
    const options = {
        page,
        limit,
        lean: true,
        populate: 'author',
        sort: { createdAt: -1 }
    };
    const books = await Book.paginate({}, options)
    return books;
}
export const getById = async (_id) => {
    const book = await Book.findOne({ _id }).populate('author');
    if (!book) {
        throw { type: 'notFound', message: 'Book does  not  Exist' }
    }
    return book;
}
export const add = async ({ name, isbn, author }) => {
    const newBook = await Book.create({
        name,
        isbn,
        author
    });
    return await getById(newBook._id);
};
export const update = async ({ name, isbn, author, _id }) => {
    const book = await Book.findOne({ _id })
    if (!book) {
        throw { type: 'notFound', message: 'Book does  not  Exist' }
    }
    const updated = await Book.updateOne({ _id }, {
        name,
        isbn,
        author
    })
    return updated;
}
export const validateAuthorId = async (author) => {
    console.log({ author })
    const authorF = await Author.findOne({ _id: author })
    if (!authorF) {
        throw new Error(
            'Author not exit')
    }
    return true
}