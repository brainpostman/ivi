import CustomCarousel from '@/components/CustomCarousel/CustomCarousel';
import Image from 'next/image';
import styleParent from '../HeaderHoverBlock.module.scss';
import style from './HeaderChannels.module.scss';
import { useTranslation } from 'next-i18next';

const HeaderChannels = () => {
    const { t } = useTranslation('header', { keyPrefix: 'left-side.tv-block' });

    return (
        <ul className={style.wrapper}>
            {t('carousels', { returnObjects: true }).map((channelList) => (
                <li key={channelList.title}>
                    <p className={styleParent.title}>{channelList.title}</p>
                    <CustomCarousel
                        elementsView={6}
                        elementsMove={4}
                        arrowSize={16}
                        space={[16, 16]}
                        width='fit-shadow'>
                        {channelList.channels.map((channel) => (
                            <Image
                                className={style.img}
                                key={channel.href}
                                src={channel.img}
                                alt='channel'
                                width={88}
                                height={58}
                            />
                        ))}
                    </CustomCarousel>
                </li>
            ))}
        </ul>
    );
};

export default HeaderChannels;
