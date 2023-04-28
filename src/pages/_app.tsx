import { store } from '@/store';
import '@/styles/globals.scss';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </Provider>
    );
}

export default appWithTranslation(App);
