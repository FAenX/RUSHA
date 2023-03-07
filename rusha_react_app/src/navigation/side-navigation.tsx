import Nav from 'react-bootstrap/Nav';
import { SideNavigationInterface } from "./side-navigation-interface";

export const SideNavigation = (props: SideNavigationInterface) => {
    return (
        <Nav defaultActiveKey="/home" className="flex-column border vh-100 w-25">
            <div className="">
                <div className="m-5">
                    {props.title}
                </div>
            </div>
            <div className="flex-column">
                {props.children}
            </div>
        </Nav>

    );
    }


export default SideNavigation;