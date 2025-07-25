'use client';

import React, { useEffect } from 'react'
import { motion, useSpring, useTransform } from "framer-motion";

const AnimateNumber = ({ value = 100, isCurrency = true }:
    { value: number, isCurrency?: boolean }) => {
    let spring = useSpring(value, { mass: 15, stiffness: 30, damping: 40 });

    let display = useTransform(spring, (current) => {
        return Number(current).toLocaleString('en-US',
            {
                style: isCurrency?  "currency" : undefined,
                currency: isCurrency?  "PHP" : undefined
            });
    })

    useEffect(() => {
        spring.set(value);
    }, [spring, value]);

    return (
        <motion.span>
            {display}
        </motion.span>
    )
}

export default AnimateNumber
