import { app } from '../../app-02/src/app/';
import { expect } from 'chai'

import * as request from 'supertest';





describe("Feature : Inject provider to Guard class", function() {
    it("should return 200 with authorization header requirement", function(done) {
        request(app)
        .post('/api/product/')
        .set('Authorization', 'secret')
        .send({ name: "product A" })
        .expect(200)
        .end(
            (err, req) => {
                expect(err).to.be.null
                expect(req.body).to.have.property('name')
                expect(req.body.name).to.be.eq("product A")
                done(err)
        
            }
        )
    
    })
    
    
    it("should return 400 with authorization header requirement", function(done) {
        request(app).post(
            '/api/product/',
        ).send({
            name: "product A"
        }).expect(400).end(
            (err, res) => {
                expect(err).to.be.null
                expect(res.body.message).to.be.eq('unauthorized')     
                done(err)   
            }
        )
    
    })

})