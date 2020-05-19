import { app } from '../../app-01/src/app/';
import { expect } from 'chai'

import * as request from 'supertest';





describe("Feature : Extends Controllers", function() {
    it("test sub controller api call", function(done) {
        request(app).post(
            '/api/product/',
        ).send({
            name: "product A"
        }).end(
            (err, req) => {
                expect(err).to.be.null
                expect(req.body).to.have.property('name')
                expect(req.body.name).to.be.eq("product A")
                done(err)
        
            }
        )
    
    })
    
    
    it("test extended (parent controller) api call", function(done) {
        request(app).get(
            '/api/product/',
        ).end(
            (err, req) => {
                expect(err).to.be.null
                expect(req.body).to.have.property('name')
                expect(req.body.name).to.be.eq("product A")
                done(err)
        
            }
        )
    
    })

})