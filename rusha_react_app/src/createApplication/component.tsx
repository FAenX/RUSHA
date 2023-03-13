import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Layout from '../layout';
import {ProgressStepper} from "./components";
import { authenticate } from '../utils/decorators';
import VerticalLinearStepper from './components/verticalStepper';






const Component = authenticate(function()  {
 
  return (
        <Layout >

          
            <Stack className="border" sx={{width: "100%", margin: 5}}>
                
                <Stack sx={{padding: 5}} spacing={2}>
                    <Typography>Back to project</Typography>
                    <Typography>Create App</Typography>

                </Stack>
                {<Stack className="border" sx={{padding: 5}}>
                  <ProgressStepper />
                </Stack>}
                <Stack className="border" sx={{padding: 5}}>
                    <VerticalLinearStepper/>
                </Stack>
            </Stack>
  
        </Layout>
  );
});




export default Component;

