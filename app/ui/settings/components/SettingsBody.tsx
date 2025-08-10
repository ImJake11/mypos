
import React from 'react'
import SettingsContentTiles from './SettingsContentTiles'
import { IconBasketFilled, IconClipboardTextFilled, IconUser } from '@tabler/icons-react';
import clsx from 'clsx';

interface Prop {
  icon: React.JSX.Element,
  title: string,
  routes: {
    title: string,
    route: string,
  }[]
}

const iconSize = 20;
const attr = "fill-gray-400";

const settingsContent: Prop[] = [
  {
    icon: <IconBasketFilled size={iconSize} className={attr} />,
    title: "Store Setup",
    routes: [
      { route: '/ui/settings/store-setup/categories', title: "Manage Categories" }
    ],
  },
  {
    icon: <IconClipboardTextFilled size={iconSize} className={attr} />,
    title: "Activity Log",
    routes: [
      {
        route: "/ui/settings/activity-log",
        title: "View Activities",
      }
    ]
  },
  {
    icon: <IconUser size={iconSize} className={clsx(attr, "stroke-gray-400")} />,
    title: "Profile",
    routes: [
      {
        route: "",
        title: "Manage Profile"
      }
    ]
  }
];

const SettingsBody = () => {
  return (
    <div className='flex w-full h-full bg-[var(--main-bg-secondary)] dark:bg-[var(--main-bg-secondary-dark)] rounded-[12px] p-3 gap-2 flex-col'>

      {settingsContent.map((b, i) => <SettingsContentTiles key={i} icon={b.icon} buttonRoutes={b.routes} title={b.title} />)}
    </div>
  )
}

export default SettingsBody
