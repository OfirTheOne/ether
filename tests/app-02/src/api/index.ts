import { build } from '@o-galaxy/ether/common'
import { AppModule } from './app.module';
 
export const apiRouter = build(AppModule);