import React from "react";
import Layout from "../layout/component";
import links from '../navigation/navigation-links';

import { Button, Card } from "react-bootstrap";

interface SupportedAppInterface {
    /**
     * The title of the app
     * @type {string}
     * @memberof SupportedAppInterface
     * @description The title of the app
     */
    name: string;

    /**
     * The description of the app
     * @type {string}
     * @memberof SupportedAppInterface
     * @description The description of the app
     * @example "A simple app that does something"
     * */

    title: string;

    /**
     * The link to the page that will deploy the app
     * @type {string}
     * @memberof SupportedAppInterface
     * @description The link to the page that will deploy the app
     * @example "/deploy/react"
     * */
    link: string;
     
}


const SupportedApp = (props: SupportedAppInterface) => {
    return (
        <Button variant="outline" href={props.link} className=" m-2 w-25 d-flex h-25 justify-content-center">
        <Card className="w-100">
            <Card.Body className="w-100 d-flex flex-column justify-content-center align-items-center">
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.name}
                </Card.Text>
            </Card.Body>
        </Card>
        </Button>

    );
}


interface SupportedAppListInterface {
    /** 
    * List of supported apps
    * @default []
    * @type {JSX.Element[]}
    * @memberof SupportedAppList
    * */
    children: JSX.Element[];
}





const Deploy = (props: SupportedAppListInterface) => {
    return (
        <div className="w-100 d-flex justify-content-start border vh-100 align-self-start m-5 p-5">
            {props.children }
        </div>
    )
}



const Component = () => {
    return (
        <Layout child={<Deploy children={[
        <SupportedApp name='React' title='React' link={`${links().deployment.link.split(':')[0]}react`}/>,
        <SupportedApp name='Angular' title='Angular' link={`${links().deployment.link.split(':')[0]}angular`}/>,
        <SupportedApp name='Node Express' title='Node Express' link={`${links().deployment.link.split(':')[0]}node-express`}/>
    ]}/>} />
        
    );
}

export default Component;