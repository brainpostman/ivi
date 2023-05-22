import { FC, useState } from 'react';
import style from './WatchReviews.module.scss';
import SimpleButton from '../UI/SimpleButton/SimpleButton';
import { IMovieById, IReview } from '@/types/films.api.interface';
import CustomCarousel from '../CustomCarousel/CustomCarousel';
import WatchReview from './WatchReview/WatchReview';
import { useRouter } from 'next/router';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSession } from 'next-auth/react';
import ModalFilmPoster from '../ModalFilmPoster/ModalFilmPoster';
import TextArea from '../UI/TextArea/TextArea';

interface IProps {
    filmName: string;
    reviewData: { reviewCount: number; reviews: IReview[] };
    className?: string;
    film: IMovieById;
}

const WatchReviews: FC<IProps> = ({
    filmName,
    reviewData: { reviewCount, reviews },
    className: propsClassName,
    film,
}) => {
    const router = useRouter();
    const { locale } = router;
    const [showModal, setShowModal] = useState(false);
    const { status } = useSession();
    const handleLeaveReview = () => {
        if (status === 'authenticated') {
            setShowModal(true);
        } else {
            router.push('/auth/signin');
        }
    };

    const [text, setText] = useState('');

    return (
        <div className={`${style.wrapper} ${style.propsClassName}`}>
            <div className={style.container}>
                <div className={style.title}>
                    <p className={style.title__reviews}>
                        Отзывы<span className={style.quantity}>{reviewCount}</span>
                    </p>
                    <p className={style.subtitle}>о фильме &#171;{filmName}&#187;</p>
                </div>
                <SimpleButton className={style.makeReview} onClick={handleLeaveReview}>
                    Оставить отзыв
                </SimpleButton>
            </div>
            <div className={style.reviews}>
                <CustomCarousel
                    elementsView={3}
                    elementsMove={3}
                    arrowSize={16}
                    classNameWrapper={''}
                    space={[24, 24]}
                    width='full'>
                    {reviews.map((review) => (
                        <WatchReview key={review.id} locale={locale ?? 'ru'} review={review} />
                    ))}
                </CustomCarousel>
            </div>
            <ModalWindow
                isShow={showModal}
                closeFunc={() => {
                    setShowModal(false);
                }}>
                <div className={style.modal}>
                    <h1 className={style.title__reviews}>Оставить отзыв</h1>
                    <div className={style.commentForm}>
                        <div className={style.textarea_wrapper}>
                            <TextArea
                                value={text}
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                                placeholder='Написать отзыв'
                                className={style.textarea}
                            />
                            <SimpleButton className={style.sendReview}>Отправить</SimpleButton>
                        </div>
                        <ModalFilmPoster film={film} />
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

export default WatchReviews;
