'use client';

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { NotificationModel } from "../../models/notificationModel";
import { notificationChangeVisiblity, notificationHandleClickTile } from "../../redux/slice/notificationSlice";
import { RootState } from "../../redux/store";
import { useState } from "react";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import { openToas } from "../../redux/slice/toastSlice";
import ToasEnum from "../../enum/toastEnum";
import { dismissNotification } from "../../utils/data/dismissNotification";
import Link from "next/link";
import { useWindowSize } from "../../utils/hooks/useGetWindowSize";
import { IconSquareXFilled, IconX } from "@tabler/icons-react";


export default function NotificationTile({ index, data, maxTotal }: {
    index: number,
    data: NotificationModel,
    maxTotal: number,
}) {
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const { isHovered, isClickedATile } = useSelector((state: RootState) => state.notificationSlice);

    const relativeIndex = maxTotal - index;

    const dataTimeStamp = new Date(data.createdAt);

    const date = dataTimeStamp.toLocaleDateString('en-Us', { dateStyle: "short" });

    const time = dataTimeStamp.toLocaleTimeString('en-US', { timeStyle: "medium" });

    const getIndicatorColor = (): string => {

        switch (data.type) {
            case "ERROR":
                return "var(--notification-error)";
            case "WARNING":
                return "var(--notification-warning)";
            case "SUCCESSFUL":
                return "var(--notification-success)";
            default:
                return "var(--notification-system)"
        }
    }

    const translationValue = (): number => {

        if (isClickedATile) return index * 82;

        const value = isHovered ? 40 : 10;
        return index * value;
    };

    const scaleValue = (): number => {

        if (isClickedATile) return 1;

        return 1 - index * 0.04;

    }

    const xTranslationvalue = (): number => {

        if (isClickedATile) {
            return 0;
        }

        return index * 10;
    }

    const opacityValue = (): number => {

        if (isClickedATile) return 1;

        return isHovered ? 1 : 1 - index * 0.1;
    };

    const handleDismiss = async () => {

        try {

            setIsLoading(true);

            await dismissNotification(data.id);

        } catch (e) {
            dispatch(openToas({
                message: "Failed to dismiss notification",
                type: ToasEnum.ERROR,
            }))
        } finally {
            setIsLoading(false);
        }
    }

    return <motion.div className='w-[80vw] md:w-[30rem] h-[7rem] bg-white dark:bg-[var(--main-bg-primary-dark)] gap-2 rounded-[4px] absolute flex items-center p-2 right-0'
        layout
        style={{
            zIndex: relativeIndex,
        }}
        initial={{
            x: "100%",
            border: "solid 1px var(--main-bg-primary)"
        }}
        animate={{
            boxShadow: isClickedATile ? undefined : "0px 5px 10px rgba(0, 0, 0, 0.3)",
            y: translationValue(),
            opacity: opacityValue(),
            scale: scaleValue(),
            x: xTranslationvalue(),
            border: isClickedATile ? `solid 2px ${getIndicatorColor()}` : undefined,
        }}

        exit={{
            x: "100%"
        }}

        transition={{
            type: "tween",
            ease: "easeInOut",
            stiffness: 300,
            damping: 20,
            x: {
                delay: index * .1,
                duration: .25,
                ease: "easeInOut",
            }
        }}
    >
        {/** indicator */}
        <div className='w-1.5 h-full' style={{ backgroundColor: getIndicatorColor() }} />

        <div className='flex-1 flex-col justify-between h-full flex'>
            <span>
                <strong>{data.title} - </strong>
                <span>{data.message}</span>
            </span>

            <span className="text-[.6rem]">{date} - {time}</span>
        </div>


        {/** actions */}
        <div className='flex gap-1 items-center'>
            <div className='grid place-content-center w-[2rem] h-[2rem] rounded-[4px] bg-gray-100'
                onClick={handleDismiss}
            >{isLoading ? <CircularLoadingIndicator borderWidth={2} size={22} /> : <IconX className="stroke-gray-400" />}</div>
        </div>
        {/** hit box for click */}
        <div className="w-[80%] h-full absolute"
            onClick={() => dispatch(notificationHandleClickTile(!isClickedATile))}
        />

        {/** view all notification */}
        {index === 0 && <div className="absolute h-[2rem] w-full justify-start top-0 left-0 -translate-y-10 flex gap-2">
            <button className="rounded-[4px] p-[8px_10px] border border-gray-300 bg-gray-100 dark:bg-[var(--main-bg-primary-dark)]"
                onClick={() => dispatch(notificationChangeVisiblity(false))}
            >Hide</button>

            <button className="rounded-[4px] p-[8px_10px] border border-gray-300 bg-gray-100 dark:bg-[var(--main-bg-primary-dark)]"
            >   <Link href={"/ui/notifications-page"}>
                    View All
                </Link>
            </button>
        </div>}
    </motion.div>

}