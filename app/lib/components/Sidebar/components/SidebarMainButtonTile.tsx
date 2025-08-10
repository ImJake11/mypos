import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import React from "react";
import { sidebarSetActiveRoute, SubrouteProp } from "@/app/lib/redux/slice/sidebarSlice";
import { RootState } from "@/app/lib/redux/store";

interface ButtonProps {
    name: string,
    icon: React.JSX.Element,
    url: string,
    options?: SubrouteProp[],
    notificationLength?: number,
}
const SidebarMainButtonTile = React.memo(({
    name,
    icon,
    url,
    options,
    notificationLength = 0
}: ButtonProps) => {
    const dispatch = useDispatch();

    const pathName = usePathname();

    const pathParts = pathName.split("/");
    const urlParts = url.split("/");

    const activeRoute = useSelector((state: RootState) => state.sidebarSlice.activeParentRoute)

    const isSelected = () => {

        if (pathParts.length > 1 && urlParts.length > 1) {

            return urlParts[2] === pathParts[2];
        } else {
            return false;
        }
    };


    return <div className='w-full h-fit flex flex-col relative'>
        <motion.div key={url} className={`w-[90%] place-self-center rounded-[6px] h-[2.5rem] flex gap-1.5 items-center p-1.5 overflow-hidden`}
            style={{
                opacity: 1,
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 0%",
                backgroundImage: isSelected() ? "linear-gradient(45deg,var(--color-brand-tertiary), var(--color-brand-primary), var(--color-brand-secondary), var(--color-brand-tertiary))" : undefined,
            }}
            initial={{
                scale: 1,
            }}
            animate={{
                backgroundPosition: "100% 0%",
                scale: isSelected() ? 1 : 0,
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

        <div className={`absolute inset-0 h-[2.5rem] top-0 flex gap-2 items-center px-5 transition-all ease-in-out duration-200 ${!isSelected() && "hover:bg-gray-800"}`}
        >
            <ButtonTile icon={icon} />
            <AnimatePresence>
                <motion.div
                    className='flex-1 flex items-center'
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
                    {/** name */}
                    <Link href={url}>
                        <span className={`text-white text-nowrap`}>
                            {name}
                        </span>
                    </Link>

                    <div className='flex-1' />
                    {options && <motion.div className="origin-center"
                        animate={{
                            rotate: isSelected() ? "180deg" : "0deg",
                        }}
                        transition={{
                            delay: .3,
                            duration: .35,
                            type: "spring",
                            bounce: .3,
                        }}
                        onClick={() => dispatch(sidebarSetActiveRoute(url))}
                    >
                        <ArrowDownIcon size={10} isSelected={isSelected()} />
                    </motion.div>}
                </motion.div>
            </AnimatePresence>
        </div>

        {/** ssub routes */}
        {options && isSelected() && <div className="flex flex-col w-full">
            {options?.map((d, i) => {

                const isRrouteSelected = pathName === d.route;

                return <motion.div key={i} className={`w-full h-[2.5rem] grid place-content-center ${isRrouteSelected ? "text-[var(--color-brand-primary)]" : "text-white"}`}
                    whileHover={{
                        backgroundColor: "rgb(0,0,0,.1)"
                    }}
                >
                    <Link href={d.route}>
                        {d.name}
                    </Link>
                </motion.div>
            })}
        </div>
        }
        {/** notification indicator */}

        {notificationLength > 0 && <div className="text-white h-[1rem] w-[1rem] rounded-full bg-red-500 absolute left-3 top-1 grid place-content-center text-[.6rem]">
            <span>{notificationLength}</span>
        </div>}

    </div>
})

const ButtonTile = React.memo(({ icon }: { icon: React.JSX.Element }) => {

    return <div className="h-full min-w-[1.5rem] grid place-content-center">
        <React.Fragment>
            {icon}
        </React.Fragment>
    </div>
})
export default SidebarMainButtonTile;
