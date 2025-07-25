import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AnimatePresence, motion } from "framer-motion";
import { sidebarHandleHover } from "../../redux/slice/sidebarSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarSubmenu = () => {
    const dispatch = useDispatch();
    const path = usePathname();

    const { isButtonHover,
        hoveredButtonOptions,
        subMenuYTranslation,
        isSidebarMinimize
    } = useSelector((state: RootState) => state.sidebarSlice);

    const handleHover = (isHover: boolean) => {
        dispatch(sidebarHandleHover({
            isHover,
            yValue: subMenuYTranslation,
            routes: hoveredButtonOptions,
        }))
    }
    return (
        <AnimatePresence>
            {isButtonHover && <motion.div key={`${subMenuYTranslation}`} className={`w-fit h-fit absolute left-[var(--sidebar-width-minimized)] cursor-`}
                style={{
                    y: `${subMenuYTranslation}vh`,
                    boxShadow: "0px 1px 5px rgb(0,0,0,.4)"
                }}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0
                }}

                onMouseEnter={() => handleHover(true)}
                onMouseLeave={() => handleHover(false)}
            >

                {hoveredButtonOptions && hoveredButtonOptions.map((r, i) => <motion.div key={i} className={`w-[10rem] h-[2rem] ${path === r.route ? "bg-[var(--color-brand-secondary)] text-white" : "bg-[var(--main-bg-primary)] text-gray-500"} rounded-[4px] grid place-content-center`}
                    initial={{
                        opacity: 0,
                        x: "50%"
                    }}
                    animate={{
                        opacity: 1,
                        x: "0%"
                    }}
                    transition={{
                        duration: .2,
                        ease: "easeInOut",
                        delay: .2 * i
                    }}
                >
                    <Link href={r.route}> {r.name}</Link>
                </motion.div>)}

            </motion.div>}
        </AnimatePresence>
    )
}


export default SidebarSubmenu
