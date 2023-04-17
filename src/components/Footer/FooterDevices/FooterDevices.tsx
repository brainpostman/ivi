import BasicBtn from '@/components/UI/BasicBtn/BasicBtn';
import styles from './FooterDevices.module.scss';
import { FaApple, FaGooglePlay, FaTv } from 'react-icons/fa';
import { BiDevices } from 'react-icons/bi';

interface IDeviceTextProps {
    firstLine: string;
    secondLine: string;
}

const DeviceText = ({ firstLine, secondLine }: IDeviceTextProps) => {
    return (
        <div className={styles.description}>
            <p className={styles.firstLine}>{firstLine}</p>
            <p className={styles.secondLine}>{secondLine}</p>
        </div>
    );
};

const FooterDevices = () => {
    return (
        <div className={styles.container}>
            <a href='https://apps.apple.com/RU/app/id455705533' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'text'} variant={2} className={styles.button}>
                    <FaApple className={styles.icon} />
                    <DeviceText firstLine='Загрузить в' secondLine='App Store' />
                </BasicBtn>
            </a>
            <a
                href='https://play.google.com/store/apps/details?id=ru.ivi.client'
                target='_blank'
                rel='noreferrer'>
                <BasicBtn btnType={'text'} variant={2} className={styles.button}>
                    <FaGooglePlay className={styles.icon} />
                    <DeviceText firstLine='Доступно в' secondLine='Google Play' />
                </BasicBtn>
            </a>
            <a href='https://www.ivi.ru/pages/tvsmart/' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'text'} variant={2} className={styles.button}>
                    <FaTv className={styles.icon} />
                    <DeviceText firstLine='Смотрите на' secondLine='Smart TV' />
                </BasicBtn>
            </a>
            <a href='https://www.ivi.ru/devices' target='_blank' rel='noreferrer'>
                <BasicBtn btnType={'text'} variant={1}>
                    <BiDevices className={styles.icon} />
                    <p className={styles.alldevices}>Все устройства</p>
                </BasicBtn>
            </a>
        </div>
    );
};

export default FooterDevices;
