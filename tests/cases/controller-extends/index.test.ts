import { App } from '../../app-01/src/app/app';
import { expect } from 'chai'

import * as request from 'supertest';

const { app } = new App(3000);

request(app).post(
    '/api/feature/product/',
).end(
    (err, req) => {
        expect(err).to.be.null
    }
)

request(app).get(
    '/api/feature/product/',
).end(
    (err, req) => {
        expect(err).to.be.null
        expect(req.body).to.have.property('name')
        expect(req.body.name).to.be.eq("product A")

    }
)