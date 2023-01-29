// react function app
import React from 'react';
import SideNavigation from '../navigation';
import sideNavigationProps from '../navigation/side-navigation-props';
import LayoutInterface from './layout-interface';
import { Stack } from '@mui/material';

function Component(props: LayoutInterface) {
  return (
      
       <Stack className='border' direction={"row"} justifyContent={"space-between"}>  
          <SideNavigation 
          title={sideNavigationProps.title} 
          children={sideNavigationProps.children} 
          />         
          {props.child}
        </Stack>
     
      
  );
}

export default Component;