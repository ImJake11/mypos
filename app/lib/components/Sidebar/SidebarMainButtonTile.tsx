import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import ArrowDownIcon from "../../icons/ArrowDownIcon";
import { RootState } from "../../redux/store";
import React from "react";

interface ButtonProps {
    name: string,
    icon: React.JSX.Element,
    url: string,
    options?: React.JSX.Element[],
    notificationLength?: number
}
const SidebarMainButtonTile = ({
    name,
    icon,
    url,
    options,
    notificationLength = 0
}: ButtonProps) => {

    const pathName = usePathname();

    const [isHovered, setIsHoverd] = useState(false);

    const { isSidebarMinimize } = useSelector((state: RootState) => state.sidebarSlice);

    const isSelected = pathName.includes(name.toLowerCase());

    const handleMouseHover = (isEnter: boolean) => {
        setIsHoverd(isEnter);
    }

    return <div className='w-full h-fit flex flex-col relative'>
        <AnimatePresence>
            <motion.div key={url} className={`w-full place-self-end h-[2.5rem] flex gap-1.5 items-center p-1.5 overflow-hidden`}
                style={{
                    opacity: .2,
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                    backgroundImage: isSelected ? "linear-gradient(45deg,var(--main-bg-primary-dark), var(--color-brand-primary), var(--color-brand-secondary), var(--main-bg-primary-dark))" : undefined,
                }}
                initial={{
                    scale: 1,
                }}
                animate={{
                    backgroundPosition: "100% 0%",
                    scale: isSelected ? 1 : 0,
                }}
                transition={{
                    duration: .2,
                    ease: "linear",
                    backgroundPosition: {
                        duration: 3,
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }
                }}
            />
        </AnimatePresence>

        <Link href={url}>
            <div className='absolute inset-0 h-[2.5rem] top-0 flex gap-2 items-center p-[0_1rem]'
                onMouseEnter={() => handleMouseHover(true)}
                onMouseLeave={() => handleMouseHover(false)}
            >
                <div>
                    {icon}
                </div>
                <AnimatePresence>
                    {!isSidebarMinimize && <motion.div
                        key="button-details"
                        className='flex-1 flex'
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0,
                        }}
                    >
                        <p>{name}</p>
                        <div className='flex-1' />
                        {options && <motion.div
                            animate={{
                                rotate: isSelected ? "180deg" : "0deg",
                            }}
                            transition={{
                                duration: .35,
                                type: "spring",
                                bounce: .3,
                            }}
                        >
                            <ArrowDownIcon size={10} />
                        </motion.div>}
                    </motion.div>}
                </AnimatePresence>
            </div>
        </Link>

        {/** options */}
        <AnimatePresence>
            {!isSidebarMinimize && <SubMenu handleMouseHover={handleMouseHover} isSelected={isSelected} isSidebarMinimize={isSidebarMinimize} options={options} isHover={isHovered} />}

            {/** 
             * show sub menu  when sidebar is minimzed and hovered
             */}
            {isSidebarMinimize && isHovered && <SubMenu handleMouseHover={handleMouseHover} isSelected={isSelected} isSidebarMinimize={isHovered} options={options} isHover={isHovered} />}
        </AnimatePresence>

        {/** notification indicator */}

        {notificationLength > 0 && <div className="h-[1rem] w-[1rem] rounded-full bg-red-500 absolute left-3 top-1 grid place-content-center text-[.6rem]">
            {notificationLength}
        </div>}

    </div>
}

const SubMenu = ({
    handleMouseHover,
    options,
    isSidebarMinimize,
    isSelected,
    isHover,
}: {
    handleMouseHover: (isEnter: boolean) => void,
    options?: React.JSX.Element[],
    isSidebarMinimize: boolean,
    isSelected: boolean,
    isHover: boolean,
}) => {


    if (!options) return <></>;

    const subButtons = options.map((item, index) => <React.Fragment key={index}>
        {item}
    </React.Fragment>);

    return <motion.div className='flex flex-col rounded-[4px] overflow-hidden'
        style={{
            backgroundColor: "var(--sidebar-submenu-bg-)",
            position: isSidebarMinimize ? "fixed" : "relative",
            marginLeft: isSidebarMinimize ? "var(--sidebar-width-minimized)" : "0px",
        }}

        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        exit={{
            opacity: 0,
        }}

        onMouseEnter={() => handleMouseHover(true)}
        onMouseLeave={() => handleMouseHover(false)}
    >
        {!isSidebarMinimize && isSelected && subButtons}
        {isSidebarMinimize && isHover && subButtons}
    </motion.div>
}

export default SidebarMainButtonTile;