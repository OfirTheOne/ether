import { Provider } from "../../../../../../lib/core";




@Provider()
export class UserHandler {

	public async getUser() {
		return {
			userHandler_getUser: true
		}

	}

	public async editUser() {
		return {
			userHandler_editUser: true
		}
	}

	public async logister() {
		return {
			userHandler_logister: true
		}
	}
}

