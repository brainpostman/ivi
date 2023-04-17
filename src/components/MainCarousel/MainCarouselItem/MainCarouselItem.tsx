import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { IMainCarouselItem } from '../../../types/IMainCarouselItem';
import styles from './MainCarouselItem.module.scss';

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
}: IMainCarouselItemProps) => {
    return (
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
                    <HighlightButton variant='primary'>
                        <span style={{ color: 'white' }}>Показать подборку</span>
                    </HighlightButton>
                </div>
            </div>
            <div className={styles.background}>
                <img src={item.imgUrl} />
                <img src={item.imgUrlMobile} />
            </div>
        </article>
    );
};

export default MainCarouselItem;
