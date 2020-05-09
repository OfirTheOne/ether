import { Provider } from '@o-galaxy/ether/core';

import { DBRepository } from '../../common/services/db-repository.service';

@Provider()
export class ProductHandler {


    constructor(
        private bdRepository: DBRepository,
    ) {}
    
    public async getProduct() {
        try {
            return ({
                name: "product A"
            })
            
        } catch (error) {
            throw error;
        }
    }



}