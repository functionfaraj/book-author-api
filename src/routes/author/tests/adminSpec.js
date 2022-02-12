import Admin from '@db/schemas/admin'
import * as Service from '../services'
import { connect, disconnect } from '@services/mongoMemoryServer'

let dummy_admin = {
    full_name: "Ahmed Faraj",
    email: "Ahmed@eca.com",
    phone_number: "0594089492",
    password: "xxxxxx"
}

let dummy_admin_2 = {
    full_name: "Ahmed Faraj",
    email: "Ahme2d@eca.com",
    phone_number: "059408949",
    password: "xxxxxx"
}

describe('Admin Service tests', () => {
    beforeAll(async () => {
        await connect()
        dummy_admin_2 = await Admin.create(dummy_admin_2)
    });

    afterAll(async () => {
        await disconnect();
    });
    //Test 1 
    it('addAdmin', async () => {
        dummy_admin = await Service.addAdmin(dummy_admin)
        expect(dummy_admin.full_name).toBe('Ahmed Faraj')
        expect(dummy_admin.email).toBe('ahmed@eca.com')
        expect(dummy_admin.phone_number).toBe('0594089492')
    })

    //Test 22 
    it('logIn', async () => {
        let result = await Service.logIn({ username: "Ahme2d@eca.com", password: "xxxxxx" })
        expect(result.full_name).toBe(dummy_admin_2.full_name)
        expect(result.email).toBe(dummy_admin_2.email)
        expect(result.token.lenght).not.toBe(0)
    })

});