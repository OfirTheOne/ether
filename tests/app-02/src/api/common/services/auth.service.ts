

import { Provider } from '@o-galaxy/ether/core'

@Provider()
export class AuthService {

    constructor() { }

    authenticate(authorization: string): boolean {
        return authorization == 'secret'
    }

}