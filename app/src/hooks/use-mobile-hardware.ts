import { useState, useEffect } from 'react';

export function useIsMobileHardware() {
    const [isMobileHardware, setIsMobileHardware] = useState(false);

    useEffect(() => {
        const checkMobileHardware = () => {
            // Check for touch points - definitive for most mobile/tablet devices
            // even when desktop site is requested
            const hasTouch = navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;

            // Check usage agent for mobile keywords (though desktop mode might hide these)
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

            // Check screen dimensions - unlikely for desktops to have these specific constraints
            // combined with other factors, but let's stick to touch + UA

            // If it has touch, we treat it as "potentially constrained" or "mobile-like"
            // This might include touch laptops, but for the sake of performance (reducing lag),
            // it is a safe tradeoff to show the lighter version on touch laptops too.
            if (hasTouch) {
                return true;
            }

            return isMobileUA;
        };

        setIsMobileHardware(checkMobileHardware());
    }, []);

    return isMobileHardware;
}
