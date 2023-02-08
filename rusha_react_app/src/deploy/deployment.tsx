
import React, { useEffect } from "react";
import Layout from "../layout/component";

import { Card } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {deploy} from '../backend_requests';
import {useLocation} from 'react-router-dom';
import ReactDeployment from "./createApplication";
import NodeDeployment from "./node-deployment";



const Component = () => {
    // location state
    const location = useLocation();

    // state to store child component
    const [child, setChild] = React.useState(<ReactDeployment/>);

    // useEffect to update child component
    useEffect(() => {
        console.log(location);
        if (location.pathname === "/deploy/react") {
            setChild(<ReactDeployment/>);
        } else if (location.pathname === "/deploy/node-express") {
            // setChild(<NodeDeployment/>);
        }else {
            setChild(<div>Not found</div>);
        }
    }, [location]);

    
    return (

        <Layout child={child}/>
        
    );
}

export default Component;