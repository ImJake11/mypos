'use client';

import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { notificationAdd, notificationChangeVisiblity, notificationDelete, notificationHandleHover, notificationSetCount, notificationUpdateNotifications } from '../../redux/slice/notificationSlice';
import { fetchNotifications } from '../../utils/data/fetchNotifications';
import NotificationTile from './NotificationTile';
import { RootState } from '../../redux/store';
import { useSocketEvent } from '../../utils/hooks/useSocket';
import { AnimatePresence, motion } from 'framer-motion';
import { NotificationFilterType } from '../../enum/notificationType';

export default function CustomNotification() {

  const dispatch = useDispatch();


  const { notifications, isVisible, isClickedATile, isHovered } = useSelector((state: RootState) => state.notificationSlice);

  const fetchData = async () => {
    try {

      if (notifications.length >= 4) return;

      const data = await fetchNotifications(notifications.length, 4, NotificationFilterType.SUCCESSFUL);

      dispatch(notificationUpdateNotifications(data));

      if (!isVisible && data.length > 0) {
        dispatch(notificationChangeVisiblity(true))
      }
    } catch (e) {

      throw new Error("Failed to get notifications");
    }
  }

  const handleWebSocketEvent = useCallback(async (payload: any) => {
    const { id } = payload;

    const type: "delete" | "add" = payload.type;

    if (type === 'delete') {
      dispatch(notificationDelete(id));
      await fetchData();
    }

    if (type === "add") {
      dispatch(notificationAdd(payload.data));
      dispatch(notificationChangeVisiblity(true));
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
    }, 10000);

    return () => clearTimeout(timeout);

  }, [isVisible, notifications, isClickedATile, isHovered]);

  useEffect(() => {
    // fetch number of notifications

    if (notifications.length === 0) {
      handleNotificationCount();
      fetchData();
    }
  }, []);

  return <AnimatePresence>
    {isVisible && <motion.div className='w-[30rem] h-[55vh] absolute right-5 top-4'

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

