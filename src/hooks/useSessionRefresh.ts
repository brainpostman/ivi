import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useSessionRefresh() {
    const { status, data, update } = useSession();
    let timeout = 0;
    let currentTime = Date.now();

    useEffect(() => {
        if (status === 'authenticated' && data) {
            if (currentTime >= (data.expires_at - 30) * 1000) {
                console.log('update on first load', new Date());
                update();
            }
            console.log('timeout set');
            timeout = window.setTimeout(function callback() {
                currentTime = Date.now();
                console.log('update on timer', new Date());
                update();
                timeout = window.setTimeout(callback, (data.expires_at - 30) * 1000 - currentTime);
            }, (data.expires_at - 30) * 1000 - currentTime);
        }
        return () => {
            window.clearTimeout(timeout);
            console.log('timeout cleared');
        };
    }, [status]);
}
