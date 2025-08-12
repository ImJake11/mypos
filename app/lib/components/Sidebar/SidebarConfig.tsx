
import React, { useEffect, useState } from 'react'
import { SidebarButtonsProp } from '../../models/SidebarIconsProps'

export const sidebarConfig = (): SidebarButtonsProp[] => {
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const cachedRole = localStorage.getItem('role') ?? "user";

        setRole(cachedRole);
    })

    if (role === "user") {
        return userSidebar;
    }

    return adminSIdebar;
}


const adminSIdebar: SidebarButtonsProp[] = [
    {
        url: "/",
        name: "Overview",
    },
    {
        url: "/ui/point-of-sale",
        name: "Point of Sale",
        subroutes: [
            {
                name: "Complete Orders",
                route: '/ui/point-of-sale/order-complete',
            }
        ],
    },
    {
        url: "/ui/inventory",
        name: "Products",
        subroutes: [
            {
                route: "/ui/inventory/product-form",
                name: "Create Product"
            }
        ],
    },
    {
        url: "/ui/transaction",
        name: "Transactions",
    },
    {
        name: "Notifications",
        url: "/ui/notifications-page"
    },
    {
        name: "Settings",
        url: "/ui/settings",
    },
];


const userSidebar: SidebarButtonsProp[] = [
    {
        url: "/",
        name: "Overview",
    },
    {
        url: "/ui/point-of-sale",
        name: "Point of Sale",
        subroutes: [
            {
                name: "Complete Orders",
                route: '/ui/point-of-sale/order-complete',
            }
        ],
    },
    {
        url: "/ui/inventory",
        name: "Inventory",
    },
    {
        url: "/ui/transaction",
        name: "Transactions",
    },
    {
        name: "Notifications",
        url: "/ui/notifications-page"
    },
    {
        name: "Settings",
        url: "/ui/settings",
    },
];
