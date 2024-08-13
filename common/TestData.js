import { v4 as uuidv4 } from 'uuid';

export class TestData {
    static userEmail = 'testuser.m40+22daff92-6256-4b30-87dd-95d808c89e8e@proton.me';
    static userPassword = 'Test00!';
    static userNotExistedEmail = 'testuser@unknownemail.com';
    static userInvalidPassword = 'InvalidPassword';
    static userGeneratedEmail = '';
    static products = [
        {
            name: 'Americano',
            price: '40.01$',
        },
        {
            name: 'Biscotti',
            price: '45.50$',
        },
    ];


    // Lesson 23 :: Third-party dependencies and UUIDs
    // https://www.npmjs.com/package/uuid
    // https://www.udemy.com/course/automated-web-testing/learn/lecture/35756736

    generateUuid4 = async () => {
        this.generatedUuid4 = uuidv4();
        return this.generatedUuid4
    }

    generateEmail = async () => {
        const uuid4Value = await this.generateUuid4();
        this.userGeneratedEmail = 'testuser.m40+' + uuid4Value + '@proton.me';
        return this.userGeneratedEmail;
    }
}