import Author from '@db/schemas/author'
export const getAll = async ({ limit = 10, page = 1 }) => {
    const options = {
        page,
        limit,
        lean: true,
        sort: { createdAt: -1 }
    };
    const authors = await Author.paginate({}, options)
    return authors;
}
export const add = async ({ first_name, last_name }) => {
    const newAuthor = await Author.create({
        first_name,
        last_name
    });
    return newAuthor;
};
export const getById = async (_id) => {
    const author = await Author.findOne({ _id });
    if (!author) {
        throw { type: 'notFound', message: 'Author does  not  Exist' }
    }
    return author;
}
export const update = async ({ first_name, last_name, _id }) => {
    const author = await Author.findOne({ _id })
    if (!author) {
        throw { type: 'notFound', message: 'Author does  not  Exist' }
    }
    const updated = await Author.updateOne({ _id }, {
        first_name,
        last_name
    })
    return updated;
}