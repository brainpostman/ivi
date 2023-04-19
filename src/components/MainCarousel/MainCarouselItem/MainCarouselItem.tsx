import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { IMainCarouselItem } from '../../../types/IMainCarouselItem';
import styles from './MainCarouselItem.module.scss';
import Image from 'next/image';

interface IMainCarouselItemProps {
    item: IMainCarouselItem;
    transition: boolean;
    speed: number;
    active: boolean;
}

const MainCarouselItem = ({
    item,
    speed = 400,
    active = false,
    transition = true,
}: IMainCarouselItemProps) => (
    <article
        className={`${styles.element} ${active ? styles.element_active : ''}`}
        style={{
            transition: !transition ? 'none' : `transform ${speed}ms, opacity ${speed}ms`,
        }}>
        <div className={styles.content}>
            <h2 className={styles.title}>{item.title}</h2>
            <h3 className={styles.subtitle}>{item.subtitle}</h3>
            <div
                className={`${styles.button} ${active ? styles.button_active : ''}`}
                style={{
                    transition: !transition ? 'none' : `opacity ${speed}ms`,
                }}>
                <HighlightButton>
                    <span style={{ color: 'white' }}>Показать подборку</span>
                </HighlightButton>
            </div>
        </div>
        <div className={styles.background}>
            <Image
                src={item.imgUrl}
                alt={'Banner'}
                placeholder='empty'
                fill={true}
                className={styles.image}
            />
            <Image
                src={item.imgUrlMobile}
                alt={'Banner'}
                placeholder='empty'
                fill={true}
                className={`${styles.image} ${styles.image_mobile}`}
            />
        </div>
    </article>
);

export default MainCarouselItem;
