import * as supertest from 'supertest';
import {} from 'jest';
import { expect, should } from 'chai';
import * as http from 'http';
import app from '../app';

describe('GET /auth', () => {
    let server: http.Server;
    let request: supertest.SuperTest<supertest.Test>;

    beforeAll(done => {
        server = http.createServer(app);
        server.listen(done);
        request = supertest(server);
    });

    afterAll(done => {
        server.close(done);
    });

    it('GET /signin', async done => {
        // await request(app.default)
        //     .get('/auth/signin')
        //     .expect(200)
        //     .then(res => {
        //         expect(res.body).to.have.property('hash');
        //     });
        // done.close();
        const response = await request.get('/auth/signin');
        expect(response.body).to.have.property('hash');
        done();
        server.close();
    });
});
