// react function app
import React from 'react';
import SideNavigation from '../navigation';
import sideNavigationProps from '../navigation/side-navigation-props';
import Content from '../home';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import LayoutInterface from './layout-interface';

function Component(props: LayoutInterface) {
  return (
      
       <div className='border d-flex'>  
          <SideNavigation 
          title={sideNavigationProps.title} 
          children={sideNavigationProps.children} 
          />         
          {props.child}
        </div>
     
      
  );
}

export default Component;