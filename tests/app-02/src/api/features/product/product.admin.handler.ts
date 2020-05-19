import { Provider } from '@o-galaxy/ether/core';

import { DBRepository } from '../../common/services/db-repository.service';

@Provider()
export class ProductAdminHandler {


    constructor(
        private bdRepository: DBRepository,
    ) {}
    
    public async createProduct(product: any) {
        try {
            await this.bdRepository.create(product);
            return product 
            
        } catch (error) {
            throw error;
        }
    }



}