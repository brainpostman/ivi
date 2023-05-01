import { IBannerCarouselItem } from '@/types/IBannerCarouselItem';
import { useEffect, useRef, useState } from 'react';

export function useBannerCarousel(
    items: IBannerCarouselItem[],
    speed: number,
    autoscroll: boolean,
    autoscrollSpeed: number,
    numOfFakes: number
): [IBannerCarouselItem[], number, boolean, () => void, () => void] {
    //состояния карусели
    const [carouselItems, setCarouselItems] = useState([...items]);
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [controlsEnabled, setControlsEnabled] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(numOfFakes);
    const controlsTimeoutRef = useRef<number>(0);
    const autoscrollIntervalRef = useRef<number>(0);

    const startIndex = numOfFakes;
    const endIndex = numOfFakes + items.length - 1;

    //добавление фейковых слайдов
    useEffect(() => {
        let newItems = [...carouselItems];
        for (let i = 0; i < numOfFakes; i++) {
            newItems.push(carouselItems[i]);
        }

        for (let i = carouselItems.length - 1; i > carouselItems.length - 1 - numOfFakes; i--) {
            newItems.unshift(carouselItems[i]);
        }
        setCarouselItems(newItems);
    }, []);

    //инициализация старта карусели
    const start = () => {
        if (autoscrollIntervalRef.current) {
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
        window.clearInterval(autoscrollIntervalRef.current);
    };

    useEffect(() => {
        if (autoscroll) {
            start();
        } else {
            stop();
        }
    }, [autoscroll]);

    //нажатие стрелок
    function handleDirectionChange(indexChange: number) {
        if (controlsEnabled) {
            if (autoscroll) {
                stop();
                restart();
            }
            window.clearTimeout(controlsTimeoutRef.current);
            setControlsEnabled(false);
            setCurrentIndex((prevIndex) => prevIndex + indexChange);
            controlsTimeoutRef.current = window.setTimeout(() => {
                setControlsEnabled(true);
            }, speed * 1.2);
        }
    }

    const handlePrevious = () => {
        handleDirectionChange(-1);
    };

    const handleNext = () => {
        handleDirectionChange(1);
    };

    //обработка перемотки в начало/конец
    function handleCarouselLoop(indexToLoop: number) {
        window.clearTimeout(controlsTimeoutRef.current);
        setControlsEnabled(false);
        window.setTimeout(() => {
            setTransitionEnabled(false);
            setCurrentIndex(indexToLoop);
            controlsTimeoutRef.current = window.setTimeout(() => {
                setControlsEnabled(true);
            }, speed);
        }, speed);
    }

    useEffect(() => {
        if (currentIndex > endIndex) {
            handleCarouselLoop(startIndex);
        }

        if (currentIndex < startIndex) {
            handleCarouselLoop(endIndex);
        }
    }, [currentIndex]);

    useEffect(() => {
        if (currentIndex === startIndex || currentIndex === endIndex) {
            window.setTimeout(() => {
                setTransitionEnabled(true);
            }, speed);
        }
    }, [currentIndex]);

    //возвращаем необходимые данные для взаимодействия в компоненте
    return [carouselItems, currentIndex, transitionEnabled, handlePrevious, handleNext];
}
