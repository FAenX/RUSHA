import { Button } from "@mui/material";
import React from "react";
import NavigationLinks from "../utils/navigationObject";
import MailIcon from '@mui/icons-material/Mail';
import DeckIcon from '@mui/icons-material/Deck';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LogoutIcon from '@mui/icons-material/Logout';

const links = new NavigationLinks();



interface SideNavigationItemInterface {
    title: string;
    icon?: JSX.Element;
    link?: string;
    id: string;
    onClick?: () => void;
}


// create side navigation clickable items
const SideNavigationItem = (props: SideNavigationItemInterface ) => {
    return (
        <Button  id={props.id} href={props.link} sx={{textTransform: "none"}}  onClick={props.onClick}>
            <p >
                {props.title}
            </p>
        </Button>
    );
}


const logout=()=>{
    console.log('logout')
    // remove token from local storage
    localStorage.removeItem('rusha_token');
    // redirect to login page
    window.location.href = '/login';
}



export default [
    {
        title: 'Home', 
        link: links.home.link, 
        id: 'link-home', 
        icon: ()=><DeckIcon/>, 
        text: <SideNavigationItem title={links.home.title}   link={links.home.link} id='link-home'/>
    },
    {
        title: 'Create New Project', 
        link: links.createNewProject.link, 
        id: 'link-new-project', 
        icon: ()=><CreateNewFolderIcon/>, 
        text: <SideNavigationItem title={links.createNewProject.title} link={links.createNewProject.link} id='link-new-project'/>
    },
    {
        title: 'Project Settings', 
        link: links.projectSettings.link, 
        id: 'link-project-settings', 
        icon: ()=><DisplaySettingsIcon/>, 
        text: <SideNavigationItem  title={links.projectSettings.title}  link={links.projectSettings.link} id='link-project-settings'/>},
    {
        title: 'Logout', 
        link: links.logout.link, 
        id: 'link-logout', 
        icon: ()=><LogoutIcon/>, 
        text: <SideNavigationItem title={links.logout.title}  id='link-logout' onClick={logout}/>
    },
   
];