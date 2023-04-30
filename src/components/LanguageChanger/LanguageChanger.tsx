import { useRouter } from 'next/router';
import Router from 'next/router';
import Switch from '../UI/Switch/Switch';
import { delay } from '@/utils/delay';

const switchSpeed = 200;

const LanguageChanger = () => {
    const router = useRouter();
    const { pathname, asPath, query } = router;
    const onToggleLanguageClick = async (newLocale: string) => {
        await router.push({ pathname, query }, asPath, { locale: newLocale });
        await delay(switchSpeed * 1.25);
        Router.reload();
    };
    return (
        <Switch
            left={'РУ'}
            right={'EN'}
            startLeft={router.locale === 'ru'}
            callbackLeft={() => {
                onToggleLanguageClick('ru');
            }}
            callbackRight={() => {
                onToggleLanguageClick('en');
            }}
            speedms={switchSpeed}
        />
    );
};

export default LanguageChanger;
