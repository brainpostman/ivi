import { FC } from 'react';
import style from './WatchReviews.module.scss';
import SimpleButton from '../UI/SimpleButton/SimpleButton';
import { IReview } from '@/types/films.api.interface';
import CustomCarousel from '../CustomCarousel/CustomCarousel';
import WatchReview from './WatchReview/WatchReview';
import { useRouter } from 'next/router';

const review = {
    id: 1,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus numquam accusantium voluptates officia nam! Sed, ea odio. Dolores excepturi itaque facilis placeat doloribus. Libero odit dignissimos, magni eius magnam sit!',
    user_id: 1,
    film_id: 1,
    parent: null,
    name: 'Brain',
    user_email: 'kopo6ko@mail.ru',
    createdAt: '2023-05-20T18:28:59.142Z',
};

interface IProps {
    filmName: string;
    reviewData: { reviewCount: number; reviews: IReview[] };
    className?: string;
}

const WatchReviews: FC<IProps> = ({
    filmName,
    reviewData: { reviewCount, reviews },
    className: propsClassName,
}) => {
    const { locale } = useRouter();
    
    return (
        <div className={`${style.wrapper} ${style.propsClassName}`}>
            <div className={style.container}>
                <div className={style.title}>
                    <p className={style.title__reviews}>
                        Отзывы<span className={style.quantity}>{reviewCount}</span>
                    </p>
                    <p className={style.subtitle}>о фильме &#171;{filmName}&#187;</p>
                </div>
                <SimpleButton className={style.makeReview}>Оставить отзыв</SimpleButton>
            </div>
            <div className={style.reviews}>
                <WatchReview review={review} locale={locale ?? 'ru'} className={style.review} />
                <WatchReview review={review} locale={locale ?? 'ru'} className={style.review} />
                <WatchReview review={review} locale={locale ?? 'ru'} className={style.review} />
                <WatchReview review={review} locale={locale ?? 'ru'} className={style.review} />
                {/* <CustomCarousel elementsView={0} elementsMove={0} children={[]}></CustomCarousel> */}
            </div>
        </div>
    );
};

export default WatchReviews;
