import { Provider } from "../../../../../../lib/core";


@Provider()
export class LogisterHandler {

	public async logister() {
		return  {
			LogisterHandler_logister: true
		}
	}
}

