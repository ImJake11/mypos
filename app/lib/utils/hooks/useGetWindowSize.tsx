import { useEffect, useState } from "react";


export function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {

        function handleResize() {
            setWindowSize({
                height: window.innerWidth,
                width: window.innerWidth,
            })
        }

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowSize;
}