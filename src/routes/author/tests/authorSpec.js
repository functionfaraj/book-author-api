import Author from '@db/schemas/author'
import * as Service from '../services'
import { connect, disconnect } from '@services/mongoMemoryServer'

let dummy_author = {
    first_name: "Ahmed",
    last_name: "Faraj"
}

let dummy_author_2 = {
    first_name: "mohammed",
    last_name: "Faraj"
}

describe('Author Service tests', () => {
    beforeAll(async () => {
        await connect()
        dummy_author_2 = await Author.create(dummy_author_2)
    });

    afterAll(async () => {
        await disconnect();
    });
    it('addAuthor', async () => {
        dummy_author = await Service.add(dummy_author)
        expect(dummy_author.first_name).toBe('Ahmed')
        expect(dummy_author.last_name).toBe('Faraj')
    })

    it('getAll', async () => {
        const all = await Service.getAll({ limit: 10, page: 1 })
        expect(all.docs.length).toBe(2)

    })

    it('getAll', async () => {
        const getById = await Service.getById(dummy_author._id)
        expect(getById.first_name).toBe('Ahmed')
        expect(getById.last_name).toBe('Faraj')

    })

    it('update', async () => {
        await Service.update({ first_name: "test", last_name: 'family', _id: dummy_author._id })
        const check = await Author.findOne({ _id: dummy_author._id })
        expect(check.first_name).toBe('test')
        expect(check.last_name).toBe('family')
    })


});