import { Provider } from '@o-galaxy/ether/core';
import { DBRepository } from '../../common/services/db-repository.service';

@Provider()
export class CategoryAdminHandler {


    constructor(
        private bdRepository: DBRepository,
    ) {}
    
    public async createCategory(category: any) {
        try {
            return await this.bdRepository.create(category);
            
        } catch (error) {
            throw error;
        }
    }

    public async getProductById() {

    }

}