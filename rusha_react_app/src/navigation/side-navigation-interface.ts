import React from "react";  

export interface SideNavigationInterface {
    /**
     * The content of the component.
     *  
     * @type node
     * @required    
     * @memberof SideNavigationProps
     **/
    children: Array<JSX.Element>;
    

    /**
     * The width of the side navigation.
     * 
     * @type number
     * @default 300
     * @memberof SideNavigationProps
     * @example 300
     **/
    width?: number;

    /**
     * The title of the side navigation.
     *  
     * @type string
     * @memberof SideNavigationProps
     * @example "Side Navigation"
     * **/
    title?: string;
    
}