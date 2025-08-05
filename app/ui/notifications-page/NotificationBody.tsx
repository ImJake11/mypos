'use client';

import CircularLoadingIndicator from '@/app/lib/components/CircularLoadingIndicator';
import ToasEnum from '@/app/lib/enum/toastEnum';
import { NotificationModel } from '@/app/lib/models/notificationModel';
import { notificationResetPageNotificatons, notificationSetIsInitialPageLoad, notificationSetIsMaxDataReach, notificationSetPageNotifications } from '@/app/lib/redux/slice/notificationSlice';
import { openToas } from '@/app/lib/redux/slice/toastSlice';
import { RootState } from '@/app/lib/redux/store';
import { fetchNotifications } from '@/app/lib/utils/data/fetchNotifications';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NotificationPageTile from './components/NotificationPageTile';

const NotificationPageBody = ({ data }: { data: NotificationModel[] }) => {

    const [isFetching, setIsFetching] = useState(false);

    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);

    const { pageNotifications, currentFilter, isInitialPageDataLoad, isMaxDataReach, isRead } = useSelector((state: RootState) => state.notificationSlice);

    const handleScroll = () => {
        const element = containerRef.current;

        if (!element || isFetching || isMaxDataReach) return;

        const isAtBottom = Math.round(element.scrollTop + element.clientHeight) >= element.scrollHeight - 50;

        if (isAtBottom) {
            setIsFetching(true);
            handleFetch();
        }
    }

    // fetch new notifications and add to current list
    const handleFetch = async () => {

        if (isFetching) return;

        try {
            setIsFetching(true);

            const newNotifications = await fetchNotifications(pageNotifications.length, 10, isRead, currentFilter);

            if (newNotifications.length <= 0) {
                setIsFetching(false);
                dispatch(notificationSetIsMaxDataReach(true));
                return;
            }

            dispatch(notificationSetPageNotifications([...pageNotifications, ...newNotifications]));

        } catch (e) {
            dispatch(openToas({
                message: "Failed to get more notifications",
                type: ToasEnum.ERROR,
            }))
        } finally {
            setTimeout(() => {
                setIsFetching(false);
            }, 1000);

        }
    }

    useEffect(() => {
        dispatch(notificationResetPageNotificatons());
    }, [isRead]);

    // monitor the filter changes 
    useEffect(() => {
        handleFetch()
    }, [currentFilter, isRead]);


    // set initial page daata
    useEffect(() => {
        if (!isInitialPageDataLoad) {
            dispatch(notificationSetPageNotifications(data));
            dispatch(notificationSetIsInitialPageLoad(true));
        }
    }, []);

    return (
        <div ref={containerRef} className='w-full h-full rounded-[12px] overflow-x-hidden overflow-auto flex flex-col '
            onScroll={handleScroll}
        >
            {
                pageNotifications.length <= 0 && !isFetching ? <div className='w-full h-full grid place-content-center'>
                    <span>No notifications.</span>
                </div> :
                    pageNotifications.map((n) => <NotificationPageTile key={n.id} tileData={n} />)}
            <div className='h-[1rem]' />
            <div className='items-center justify-center flex w-full min-h-[2rem] gap-2'>
                {isFetching && <> <span>Getting more notifications</span>
                    <CircularLoadingIndicator size={16} borderWidth={2} /></>}
            </div>
        </div>
    )
}


export default NotificationPageBody
