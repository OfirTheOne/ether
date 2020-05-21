
import { MainApplication, app } from './app'
import { serve } from '@o-galaxy/ether/common/serve'

serve(MainApplication, 3000, 
    () => console.log("Server up on 3000")
)

