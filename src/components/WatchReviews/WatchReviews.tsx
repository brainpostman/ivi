import { ChangeEvent, FC, useEffect, useState } from 'react';
import style from './WatchReviews.module.scss';
import SimpleButton from '../UI/SimpleButton/SimpleButton';
import { IMovieById, IReviewGetResponse } from '@/types/films.api.interface';
import CustomCarousel from '../CustomCarousel/CustomCarousel';
import WatchReview from './WatchReview/WatchReview';
import { useRouter } from 'next/router';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSession } from 'next-auth/react';
import ModalFilmPoster from '../ModalFilmPoster/ModalFilmPoster';
import TextArea from '../UI/TextArea/TextArea';
import { trimComment, validateComment } from '@/utils/comment.utils';
import { filmsAPI } from '@/api/queries/films.api';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import CommentForm from '../UI/CommentForm/CommentForm';

interface IProps {
    filmName: string;
    reviewData: { reviewCount: number; reviews: IReviewGetResponse[] };
    className?: string;
    film: IMovieById;
}

const WatchReviews: FC<IProps> = ({
    filmName,
    reviewData: { reviewCount: propsReviewCount, reviews: propsReviews },
    className: propsClassName,
    film,
}) => {
    const [reviews, setReviews] = useState<IReviewGetResponse[]>([...propsReviews]);
    const [reviewCount, setReviewCount] = useState(propsReviewCount);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { locale } = router;
    const [showModal, setShowModal] = useState(false);
    const { status, data } = useSession();
    const handleLeaveReview = () => {
        if (status === 'authenticated') {
            setShowModal(true);
        } else {
            router.push('/auth/signin');
        }
    };

    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        toast.dismiss();
    };

    const handleClick = async () => {
        toast.dismiss();
        setText((prev) => trimComment(prev));
        if (!validateComment(100, 10000, text)) {
            toast.warn('Отзыв должен иметь не менее 100 и не более 10000 символов.');
            return;
        }
        if (data) {
            const response = await filmsAPI.postFilmReview(
                {
                    text: text,
                    user_id: data.user.id,
                    film_id: film.id,
                    parent: null,
                },
                data.accessToken
            );
            if (response) {
                toast.success('Спасибо за Ваш отзыв!');
                setShowModal(false);
                setText('');
                setIsLoading(true);
            } else {
                toast.error('При отправке отзыва возникла проблема, пожалуйста повторите позже.');
            }
        }
    };

    useEffect(() => {
        setText('');
        setReviews(propsReviews);
        setReviewCount(propsReviewCount);
    }, [router.asPath]);

    useEffect(() => {
        const getReviews = async () => {
            const reviewCountReq = await filmsAPI.getFilmReviewCount(film.id);
            if (reviewCountReq) setReviewCount(reviewCountReq);
            const reviewsReq = await filmsAPI.getFilmReviews(film.id);
            if (reviewsReq.length > 0) {
                setReviews(reviewsReq);
            }
        };
        if (isLoading) {
            getReviews();
            setIsLoading(false);
        }
    }, [isLoading]);

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
                {isLoading ? (
                    <Loader />
                ) : (
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
                )}
            </div>
            <ModalWindow
                isShow={showModal}
                closeFunc={() => {
                    setShowModal(false);
                    setText('');
                }}>
                <div className={style.modal}>
                    <h1 className={style.title__reviews}>Оставить отзыв</h1>
                    <div className={style.commentForm}>
                        <CommentForm
                            textareaValue={text}
                            textareaPlaceholder='Напишите отзыв'
                            textareaOnChangeFn={handleChange}
                            sendButtonClickFn={handleClick}
                        />
                        <ModalFilmPoster film={film} />
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

export default WatchReviews;
