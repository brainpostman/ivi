import { getSession, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';

export function useSessionRefresh() {
    const { status, data } = useSession();
    const { t } = useTranslation('auth_modal');
    let expiration = 0;
    let timeout = 0;
    let currentTime = Date.now();

    useEffect(() => {
        const func = async () => {
            if (status === 'authenticated') {
                if (currentTime >= data.expires_at * 1000) {
                    const session = await getSession();
                    if (session) {
                        expiration = session?.expires_at ?? 0;
                    } else {
                        toast.error(t('error-messages.refresh-token-error'));
                        signOut();
                    }
                }
                timeout = window.setTimeout(async function callback() {
                    currentTime = Date.now();
                    const session = await getSession();
                    if (session) {
                        expiration = session?.expires_at ?? 0;
                        timeout = window.setTimeout(
                            callback,
                            expiration ? expiration * 1000 - currentTime : 60 * 60 * 1000
                        );
                    } else {
                        toast.error(t('error-messages.refresh-token-error'));
                        signOut();
                    }
                }, (expiration || data.expires_at) * 1000 - currentTime);
            }
        };
        func();
        return () => {
            window.clearTimeout(timeout);
        };
    }, [status]);
}
