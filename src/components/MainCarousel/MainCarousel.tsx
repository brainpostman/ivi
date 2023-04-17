import { useEffect, useRef, useState } from 'react';
import styles from './MainCarousel.module.scss';
import { IMainCarouselProps } from '../../types/MainCarouselTypes';
import MainCarouselItem from './MainCarouselItem/MainCarouselItem';

const MainCarousel = ({
    items = [],
    autoScroll = true,
    autoscrollSpeed = 5000,
    speed = 400,
    className = '',
}: IMainCarouselProps) => {
    const [carouselItems, setCarouselItems] = useState([...items]);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [controlsEnabled, setControlsEnabled] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(2);
    const controlsTimeoutRef = useRef<number | null>(null);
    const autoscrollIntervalRef = useRef<number | null>(null);

    const itemGap = 15;

    useEffect(() => {
        if (autoScroll) {
            start();
        } else {
            stop();
        }
    }, [autoScroll]);

    const start = () => {
        if (autoscrollIntervalRef.current != null) {
            return;
        }
        restart();
    };

    const restart = () => {
        autoscrollIntervalRef.current = window.setInterval(() => {
            setCurrentIndex((prevIndex) => {
                return prevIndex + 1;
            });
        }, autoscrollSpeed);
    };

    const stop = () => {
        clearInterval(autoscrollIntervalRef.current as number);
    };

    useEffect(() => {
        let newItems = [...carouselItems];
        newItems.push(newItems[0], newItems[1]);
        newItems.unshift(newItems[newItems.length - 4], newItems[newItems.length - 3]);
        setCarouselItems(newItems);
    }, []);

    const handlePrevious = () => {
        if (controlsEnabled) {
            stop();
            restart();
            clearTimeout(controlsTimeoutRef.current as number);
            setControlsEnabled(false);
            setCurrentIndex((prevIndex) => prevIndex - 1);
            controlsTimeoutRef.current = window.setTimeout(() => {
                setControlsEnabled(true);
            }, speed * 1.2);
        }
    };

    const handleNext = () => {
        if (controlsEnabled) {
            stop();
            restart();
            clearTimeout(controlsTimeoutRef.current as number);
            setControlsEnabled(false);
            setCurrentIndex((prevIndex) => prevIndex + 1);
            controlsTimeoutRef.current = window.setTimeout(() => {
                setControlsEnabled(true);
            }, speed * 1.2);
        }
    };

    useEffect(() => {
        if (currentIndex > carouselItems.length - 3) {
            clearTimeout(controlsTimeoutRef.current as number);
            setControlsEnabled(false);
            window.setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentIndex(2);
                controlsTimeoutRef.current = window.setTimeout(() => {
                    setControlsEnabled(true);
                }, speed);
            }, speed);
        }

        if (currentIndex < 2) {
            clearTimeout(controlsTimeoutRef.current as number);
            setControlsEnabled(false);
            window.setTimeout(() => {
                setTransitionEnabled(false);
                setCurrentIndex(7);
                controlsTimeoutRef.current = window.setTimeout(() => {
                    setControlsEnabled(true);
                }, speed);
            }, speed);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === 2 || currentIndex === 7) {
            window.setTimeout(() => {
                setTransitionEnabled(true);
            }, speed);
        }
    }, [currentIndex]);

    return (
        <div className={`${styles.container} ${className}`} style={{ gap: itemGap }}>
            <div
                className={styles.arrowArea + ' ' + styles.arrowArea_left}
                onClick={handlePrevious}>
                <div className={`${styles.arrow} ${styles.arrow_left}`}>〈</div>
            </div>
            <div
                className={styles.window}
                style={{
                    transform: `translateX(calc(-${currentIndex * 100}% - ${
                        itemGap * currentIndex + 2
                    }px))`,
                    gap: itemGap,
                    transition: !transitionEnabled
                        ? 'none'
                        : `transform ${speed}ms, opacity ${speed}ms`,
                }}>
                {carouselItems.map((item, index) => {
                    return (
                        <MainCarouselItem
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

export default MainCarousel;
