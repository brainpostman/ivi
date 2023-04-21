import { IBannerCarouselItem } from '../../types/IBannerCarouselItem';
import styles from './BannerCarousel.module.scss';
import BannerCarouselItem from './BannerCarouselItem/BannerCarouselItem';
import { useBannerCarousel } from '../../hooks/useBannerCarousel';

interface IBannerCarouselProps {
    items: IBannerCarouselItem[];
    speed?: number;
    autoScroll?: boolean;
    autoscrollSpeed?: number;
    numOfFakes?: number;
    className?: string;
}

const BannerCarousel = ({
    items = [],
    autoScroll = true,
    autoscrollSpeed = 5000,
    speed = 400,
    numOfFakes = 2,
    className = '',
}: IBannerCarouselProps) => {
    const itemGapPx = 12;

    const [carouselItems, currentIndex, transitionEnabled, handlePrevious, handleNext] =
        useBannerCarousel(items, speed, autoScroll, autoscrollSpeed, numOfFakes);

    return (
        <div className={`${styles.container} ${className}`}>
            <div
                className={styles.arrowArea + ' ' + styles.arrowArea_left}
                onClick={handlePrevious}>
                <div className={`${styles.arrow} ${styles.arrow_left}`}>〈</div>
            </div>
            <div
                className={styles.window}
                style={{
                    transform: `translateX(calc(-${currentIndex * 100}% - ${
                        itemGapPx * currentIndex
                    }px))`,
                    transition: !transitionEnabled
                        ? 'none'
                        : `transform ${speed}ms, opacity ${speed}ms`,
                }}>
                {carouselItems.map((item, index) => {
                    return (
                        <BannerCarouselItem
                            key={item.title + index}
                            item={item}
                            speed={speed}
                            active={index === currentIndex}
                            transition={transitionEnabled}
                        />
                    );
                })}
            </div>
            <div className={styles.arrowArea + ' ' + styles.arrowArea_right} onClick={handleNext}>
                <div className={`${styles.arrow} ${styles.arrow_right}`}>〉</div>
            </div>
        </div>
    );
};

export default BannerCarousel;
