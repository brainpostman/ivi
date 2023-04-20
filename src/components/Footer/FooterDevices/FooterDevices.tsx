import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import { BiDevices } from 'react-icons/bi';
import { FaApple, FaGooglePlay, FaTv } from 'react-icons/fa';
import styles from './FooterDevices.module.scss';

const FooterDevices = () => {
    return (
        <div className={styles.container}>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://apps.apple.com/RU/app/id455705533'
                title='App Store'
                suptitle='Загрузить в'>
                <FaApple />
            </BasicBtn>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://play.google.com/store/apps/details?id=ru.ivi.client'
                title='Google Play'
                suptitle='Доступно в'>
                <FaGooglePlay />
            </BasicBtn>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://www.ivi.ru/pages/tvsmart/'
                title='Smart TV'
                suptitle='Смотрите на'>
                <FaTv />
            </BasicBtn>
            <BasicBtn
                btnType='textPlusIcon'
                href='https://www.ivi.ru/devices'
                title='Все устройства'>
                <BiDevices />
            </BasicBtn>
        </div>
    );
};

export default FooterDevices;
