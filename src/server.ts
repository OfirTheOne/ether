import { MainApplication } from './app/app';
import { serve } from '../lib/common';


serve(MainApplication, 3000, () => {
    console.log("up on 3000")
});
