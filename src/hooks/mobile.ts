import { useEffect, useState } from 'react';
import { isMobile as nativeIsMobile } from 'react-device-detect'

export default function useMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(nativeIsMobile);
    }, [])

    return isMobile;
}