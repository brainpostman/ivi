import { useState } from 'react';

export default function useTouchControls(prevCallback: () => void, nextCallback: () => void) {
    const [touchPosition, setTouchPosition] = useState<number | null>(null);

    const onTouchStart = (e: TouchEventHandler<HTMLDivElement>) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const onTouchMove = (e: TouchEventHandler<HTMLDivElement>) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            nextCallback();
        }

        if (diff < -5) {
            prevCallback();
        }

        setTouchPosition(null);
    };

    return { onTouchStart, onTouchMove };
}
