import React from "react";
import Layout from "../layout/component";
import Content from './content';



const Component = () => {
    return (
        <Layout child={<Content />} />
        
    );
}

export default Component;

