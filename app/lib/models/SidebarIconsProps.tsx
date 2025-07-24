import { SubrouteProp } from "../redux/slice/sidebarSlice";

export interface SidebarButtonsProp {
    url: string,
    name: string,
    subroutes?: SubrouteProp[],
    notificationCount?: number,
    yTranslation?: number,
}
