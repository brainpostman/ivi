import { ChangeEvent, FC, useEffect, useState } from 'react';
import style from './WatchReviews.module.scss';
import SimpleButton from '../UI/SimpleButton/SimpleButton';
import CustomCarousel from '../CustomCarousel/CustomCarousel';
import WatchReview from './WatchReview/WatchReview';
import { useRouter } from 'next/router';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useSession } from 'next-auth/react';
import ModalFilmPoster from '../ModalFilmPoster/ModalFilmPoster';
import { trimComment, validateComment } from '@/utils/comment.utils';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import CommentForm from '../UI/CommentForm/CommentForm';
import { useTranslation } from 'next-i18next';
import { IReviewGetResponse } from '@/types/api/reviews.api.interface';
import { IMovieById } from '@/types/api/films.api.interface';
import { reviewsAPI } from '@/api/queries/reviews.api';

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
    const { t } = useTranslation('watch', { keyPrefix: 'watch-reviews' });
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
        const str = trimComment(text);
        setText(str);
        if (!validateComment(100, 10000, str)) {
            toast.warn(t('messages.review-length'));
            return;
        }
        if (data) {
            const response = await reviewsAPI.postFilmReview(
                {
                    text: text,
                    user_id: data.user.id,
                    film_id: film.id,
                    parent: null,
                },
                data.accessToken
            );
            if (response) {
                toast.success(t('messages.thanks'));
                setShowModal(false);
                setText('');
                setIsLoading(true);
            } else {
                toast.error(t('messages.problem'));
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
            const reviewCountReq = await reviewsAPI.getFilmReviewCount(film.id);
            if (reviewCountReq) setReviewCount(reviewCountReq);
            const reviewsReq = await reviewsAPI.getFilmReviews(film.id);
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
                        {t('reviews')}
                        <span className={style.quantity}>{reviews.length}</span>
                    </p>
                    <p className={style.subtitle}>
                        {t('about')} &#171;{filmName}&#187;
                    </p>
                </div>
                <SimpleButton className={style.makeReview} onClick={handleLeaveReview}>
                    {t('leave-review')}
                </SimpleButton>
            </div>
            <div className={style.reviews}>
                {isLoading ? (
                    <Loader />
                ) : reviews.length > 0 ? (
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
                ) : (
                    <></>
                )}
            </div>
            <ModalWindow
                isShow={showModal}
                closeFunc={() => {
                    setShowModal(false);
                    setText('');
                }}>
                <div className={style.modal}>
                    <h1 className={style.title__reviews}>{t('leave-review')}</h1>
                    <div className={style.commentForm}>
                        <CommentForm
                            value={text}
                            placeholder={t('placeholder')}
                            onChange={handleChange}
                            onClickSubmit={handleClick}
                        />
                        <ModalFilmPoster film={film} />
                    </div>
                </div>
            </ModalWindow>
        </div>
    );
};

export default WatchReviews;
