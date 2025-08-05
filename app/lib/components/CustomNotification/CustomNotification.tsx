'use client';

import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notificationAdd, notificationChangeVisiblity, notificationDelete, notificationHandleHover, notificationSetCount, notificationSetIsInitialPageLoad, notificationUpdateNotifications } from '../../redux/slice/notificationSlice';
import { fetchNotifications } from '../../utils/data/fetchNotifications';
import NotificationTile from './NotificationTile';
import { RootState } from '../../redux/store';
import { useSocketEvent } from '../../utils/hooks/useSocket';
import { AnimatePresence, motion } from 'framer-motion';
import { NotificationFilterType } from '../../enum/notificationType';
import { openToas } from '../../redux/slice/toastSlice';
import ToasEnum from '../../enum/toastEnum';
import { useWindowSize } from '../../utils/hooks/useGetWindowSize';

export default function CustomNotification() {

  const dispatch = useDispatch();


  const { notifications, isVisible, isClickedATile, isHovered, isInitialPageDataLoad } = useSelector((state: RootState) => state.notificationSlice);

  const fetchData = async (offset: number, limit: number) => {
    try {


      if (notifications.length >= 4) return;

      const data = await fetchNotifications(offset, limit, false, NotificationFilterType.TODAY);

      dispatch(notificationUpdateNotifications(data));

      if (!isVisible && data.length > 0) {
        setTimeout(() => {
          dispatch(notificationChangeVisiblity(true))
        }, 2500);
      }
    } catch (e) {

      throw new Error("Failed to get notifications");
    }
  }

  const handleWebSocketEvent = useCallback(async (payload: any) => {
    const { id } = payload;

    const type: "delete" | "add" | "all-read" = payload.type;

    if (type === 'delete') {
      dispatch(notificationDelete(id));
    }

    if (type === "all-read") {
      dispatch(notificationSetCount(0));
    }

    if (type === "add") {
      setTimeout(() => {
        dispatch(notificationAdd(payload.data));
        dispatch(notificationChangeVisiblity(true));
      }, 2000);
    }
  }, []);

  useSocketEvent("notification_event", handleWebSocketEvent);

  const handleNotificationCount = async () => {

    try {
      const res = await fetch("/api/notification/number-of-notifications", {
        method: "GET",
      })

      if (res) {
        const { notificationsCount } = await res.json();

        dispatch(notificationSetCount(notificationsCount));
      }

    } catch (e) {
      throw new Error("Failed to get notification count");
    }
  }


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isClickedATile && !isHovered) {
        dispatch(notificationChangeVisiblity(false));
      }
    }, 4000);

    return () => clearTimeout(timeout);

  }, [isVisible, notifications, isClickedATile, isHovered]);

  // fetch new notification when list is below 4
  useEffect(() => {

    const fetchNew = async () => {

      try {
        const res = await fetchNotifications(notifications.length - 1, 4 - notifications.length, false, NotificationFilterType.TODAY);

        console.log("NEW NOTIFICATION", res);
        dispatch(notificationUpdateNotifications(res));
      } catch (e) {
        dispatch(openToas({
          message: "Failed to get new notifications",
          type: ToasEnum.ERROR,
        }))
      }
    }

    if (isInitialPageDataLoad && notifications.length < 4 && notifications.length > 0) {
      fetchNew()
    }
  }, [notifications.length]);


  useEffect(() => {
    // fetch number of notifications
    if (notifications.length === 0) {
      handleNotificationCount();
      fetchData(0, 4);
      dispatch(notificationSetIsInitialPageLoad(true));
    }
  }, []);


  return <AnimatePresence>
    {isVisible && <motion.div className={`h-[55vh] absolute right-5 top-12 w-[vw] m:w-[30rem]`}

      initial={{
        opacity: 0
      }}

      animate={{
        opacity: 1
      }}

      exit={{
        opacity: 0
      }}

      onMouseEnter={() => dispatch(notificationHandleHover(true))}
      onMouseLeave={() => dispatch(notificationHandleHover(false))}
    >
      <div className='w-full h-full relative flex flex-col'>
        <AnimatePresence>
          {notifications.map((data, i) => (
            <NotificationTile key={data.id} data={data} index={i} maxTotal={notifications.length >= 4 ? 4 : notifications.length} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>}
  </AnimatePresence>
}

