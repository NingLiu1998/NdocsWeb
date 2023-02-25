export interface MenuItem {
    name: string;
    com?:string,
    children?: MenuItem[];
}

export interface SideMenuItem {
    name: string;
    icon?:string,
    children?: SideMenuItem[];
}