import { IconArrowsExchange, IconBasketFilled, IconBellRinging2Filled, IconClipboardFilled, IconLayoutDashboard, IconLayoutDashboardFilled, IconMoneybag, IconReceipt, IconSettings2, IconSettingsFilled } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const dashboard = "/";
const inventory = "/ui/inventory";
const pos = "/ui/point-of-sale";
const transaction = "/ui/transaction";
const settings = "/ui/settings";
const notification = "/ui/notifications-page"

function SidebarIcons({
    url,
}: { url: string }) {

    const path = usePathname();

    const pathParts = path.split("/");
    const urlParts = url.split("/");

    const size = 22;

    const iconColor = `fill-white`;

    if (url === dashboard) {

        return <IconLayoutDashboardFilled size={size} className={iconColor}/>
    }

    if (url === inventory) {

        return <IconClipboardFilled size={size} className={iconColor} />
    }

    if (url === pos) {

        return <IconMoneybag size={size} className={`${iconColor} stroke-white`} />
    }

    if (url === transaction) {

        return <IconArrowsExchange size={size} className={`stroke-white`} />
    }

    if(url === settings){
        return <IconSettingsFilled size={size} className={iconColor}/>
    }

    if(url === notification){
        return <IconBellRinging2Filled size={size} className={iconColor} />
    }

}

export default SidebarIcons;