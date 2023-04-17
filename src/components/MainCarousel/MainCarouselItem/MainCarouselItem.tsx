import { IMainCarouselItemProps } from '../../../types/MainCarouselTypes';
import BasicBtn from '../../BasicBtn/BasicBtn';
import styles from './MainCarouselItem.module.scss';

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
                    <BasicBtn btnType={'text'} variant={1}>
                        <span style={{ color: 'white' }}>Показать подборку</span>
                    </BasicBtn>
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
