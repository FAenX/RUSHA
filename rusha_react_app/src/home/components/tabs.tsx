import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {ProjectCacheInterface} from "../../types/create-project-response-type";
import { Stack } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function Applications(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Child(props: {application: any}){
    return (
        <Stack>
            <Typography>{props.application.application_name}</Typography>
            <Typography>{props.application.domain_name}</Typography>
        </Stack>
    )
}


export default function ProjectTabs(props: {project?: ProjectCacheInterface}) {
  const [value, setValue] = React.useState(0);

  const {project} = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log(project)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Applications"  />
        </Tabs>
      </Box>
        {
            project?.project?.applications.map((application) => {
                return (
                    <Applications children={<Child application={application}/>} value={value} index={0}  />
                )
            })
        }
    </Box>
  );
}