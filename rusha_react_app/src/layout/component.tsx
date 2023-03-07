// react function app
import React from 'react';
import SideNavigation from '../navigation';
import sideNavigationProps from '../navigation/side-navigation-props';
import { Stack } from '@mui/material';
import Drawer from '../navigation/drawer'

interface LayoutInterface {
  children: JSX.Element;
}

function Component(props: LayoutInterface) {
  return (
      <React.Fragment>
       <Stack className='border' direction={"row"} justifyContent={"space-between"}> 
          <Drawer /> 
          {/* <SideNavigation 
          title={sideNavigationProps.title} 
          children={sideNavigationProps.children} 
          />          */}
          {props.children}
        </Stack>
      </React.Fragment>
     
      
  );
}

export default Component;

// export default Drawer