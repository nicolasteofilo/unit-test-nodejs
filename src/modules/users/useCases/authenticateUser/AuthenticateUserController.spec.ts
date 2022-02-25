import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';

import { app } from '../../../../app';
import createConnection from '../../../../database'

let connection: Connection;

describe('Authenticate User Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it('should ble able to auth user with JWT Token', async () => {
        await request(app).post('/api/v1/users').send({
            name: 'Nicolas Teófilo',
            email: 'nicolasteofilodecastro@gmail.com',
            password: '123456'
        })

        const responseAuth = await request(app).post('/api/v1/sessions').send({
            email: 'nicolasteofilodecastro@gmail.com',
            password: '123456'
        })

        expect(responseAuth.body).toHaveProperty('token');
    })
})