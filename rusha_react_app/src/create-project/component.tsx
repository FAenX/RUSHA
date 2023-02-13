import React from "react";
import Layout from "../layout";


const PlaceHolder = () => {
    return (
        <div className="content border d-flex flex-column w-100 justify-content-center">
            Create
        </div>
    );
}



const Component = () => {
    return (
        <Layout>
            <PlaceHolder />
        </Layout>
        
    );
}

export default Component;