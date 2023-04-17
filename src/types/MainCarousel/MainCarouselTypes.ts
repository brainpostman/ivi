export interface IMainCarouselItem {
    title: string;
    subtitle: string;
    imgUrl: string;
    imgUrlMobile: string;
}

export interface IMainCarouselProps {
    items: IMainCarouselItem[];
    speed: number;
    autoScroll: boolean;
    autoscrollSpeed: number;
    className?: string;
}

export interface IMainCarouselItemProps {
    item: IMainCarouselItem;
    transition: boolean;
    speed: number;
    active: boolean;
}
