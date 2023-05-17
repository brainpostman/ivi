import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function useSessionRefresh() {
    const { status, data, update } = useSession();
    let timeout = -1;
    let currentTime = Date.now();

    useEffect(() => {
        if (status === 'authenticated') {
            if (currentTime >= data.expires_at * 1000) {
                update();
            }
            timeout = window.setTimeout(function callback() {
                currentTime = Date.now();
                update();
                timeout = window.setTimeout(callback, 60 * 60 * 1000);
            }, data.expires_at * 1000 - currentTime);
        }
        return () => {
            if (timeout > 0) {
                window.clearTimeout(timeout);
            }
        };
    }, [status]);
}
