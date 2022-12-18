import React from "react";
import { Button } from "react-bootstrap";
import links from "./navigation-links";


interface SideNavigationItemInterface {
    title: string;
    icon?: JSX.Element;
    link: string;
    id: string;
}


// create side navigation clickable items
const SideNavigationItem = (props: SideNavigationItemInterface ) => {
    return (
        <Button variant="outline" id={props.id} href={props.link} className="border d-flex flex-row m-2 p-2">
            <p className="border m-2">
                {props.icon}
            </p>
            <p className="border m-2">
                {props.title}
            </p>
        </Button>
    );
}



export default [
    // home icon
    <SideNavigationItem title={links().deploy.title} icon={<i className="bi bi-cloud-arrow-up-fill"></i>} link={links().deploy.link} id='link-deploy'/>,
    <SideNavigationItem title={links().home.title}   icon={<i className="bi bi-1-circle"></i>}   link={links().home.link} id='link-home'/>,   
    <SideNavigationItem title={links().applications.title} icon={<i className="bi bi-app"></i>}  link={links().applications.link} id='link-projects'/>,    // create new project
    <SideNavigationItem title={links().createNewProject.title} icon={<i className="bi bi-node-plus-fill"></i>} link={links().createNewProject.link} id='link-new-project'/>,    // settings
    <SideNavigationItem  title={links().projectSettings.title} icon={<i className="bi bi-sliders"></i>}  link={links().projectSettings.link} id='link-project-settings'/>,    
    <SideNavigationItem title={links().logout.title}  icon={<i className="bi bi-sign-turn-right-fill"></i>} link={links().logout.link} id='link-logout'/>,
   
];