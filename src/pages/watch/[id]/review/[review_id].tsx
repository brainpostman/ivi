import { filmsAPI } from '@/api/queries/films.api';
import ModalFilmPoster from '@/components/ModalFilmPoster/ModalFilmPoster';
import PageLayout from '@/layouts/PageLayout/PageLayout';
import { IMovieById, IReviewGetResponse } from '@/types/films.api.interface';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from './index.module.scss';
import { localizeDateString } from '@/formatters/localizeDateString.format';
import { useRouter } from 'next/router';
import { buildDateString, trimComment, validateComment } from '@/utils/comment.utils';
import { useSession } from 'next-auth/react';
import CommentForm from '@/components/UI/CommentForm/CommentForm';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface IReviewProps {
    film: IMovieById;
    review: IReviewGetResponse;
    comments: IReviewGetResponse[];
}

export const getServerSideProps = async ({ locale, params }: GetServerSidePropsContext) => {
    if (!params || !parseInt(params.id as string)) {
        return {
            redirect: {
                destination: '/error',
                permanent: false,
            },
        };
    }

    const film = await filmsAPI.getFilmsById(Number(params.id));
    const review = await filmsAPI.getFilmReviewById(Number(params.review_id));
    const comments = await filmsAPI.getComments(Number(params.id), Number(params.review_id));

    return {
        props: {
            film,
            review,
            comments,
            ...(await serverSideTranslations(locale ?? 'ru', [
                'header',
                'auth_modal',
                'common',
                'footer',
            ])),
        },
    };
};

const Review = ({ film, review, comments: propsComments }: IReviewProps) => {
    const { status, data } = useSession();
    const router = useRouter();
    const { locale } = router;
    const date = new Date(review.createdAt);
    const dateStr = buildDateString(date, locale ?? 'ru');
    const locDate = date.toLocaleDateString();
    const locTime = date.toLocaleTimeString();
    const [comments, setComments] = useState([...propsComments]);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        toast.dismiss();
    };

    const handleClick = async () => {
        toast.dismiss();
        setText((prev) => trimComment(prev));
        if (!validateComment(10, 10000, text)) {
            toast.warn('Комментарий должен иметь не менее 10 и не более 10000 символов.');
            return;
        }
        if (data) {
            const response = await filmsAPI.postFilmReview(
                {
                    text: text,
                    user_id: data.user.id,
                    film_id: film.id,
                    parent: review.id,
                },
                data.accessToken
            );
            if (response) {
                setText('');
                setIsLoading(true);
            } else {
                toast.error(
                    'При отправке комментария возникла проблема, пожалуйста повторите позже.'
                );
            }
        }
    };

    useEffect(() => {
        setText('');
    }, [router.asPath]);

    useEffect(() => {
        const getReviews = async () => {
            const commentsReq = await filmsAPI.getComments(film.id, review.id);
            if (commentsReq.length > 0) {
                setComments(commentsReq);
            }
        };
        if (isLoading) {
            getReviews();
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <PageLayout title={'review'}>
            <div className={styles.wrapper}>
                <section className={styles.commentSection}>
                    <h1 className={styles.title}>
                        {review.parent
                            ? 'Комментарий к '
                            : 'Отзыв к фильму ' + (locale === 'ru' ? film.name : film.name_en)}
                    </h1>
                    <section className={styles.openingPost}>
                        <article className={styles.comment}>
                            <div className={styles.comment__info}>
                                <p className={styles.comment__line} />
                                <p className={styles.comment__title}>
                                    <span className={styles.comment__from}>
                                        {review.parent ? '' : 'Отзыв от '}
                                        <span className={styles.comment__sender}>
                                            {review.name || review.user_email}
                                        </span>
                                    </span>
                                    <span>
                                        {', отправлен '}
                                        <span
                                            className={styles.comment__date}
                                            title={`${locDate}, ${locTime}`}>
                                            {dateStr}
                                        </span>
                                    </span>
                                </p>
                                <p className={styles.comment__line} />
                            </div>
                            <p className={styles.comment__content}>{review.text}</p>
                            <div className={styles.comment__controls}>
                                <p className={styles.comment__line} />
                                {status === 'authenticated' && data.user.id === review.user_id ? (
                                    <div className={styles.comment__buttons}>
                                        <span>Редактировать</span>
                                    </div>
                                ) : (
                                    <p className={styles.comment__line} />
                                )}
                                <p className={styles.comment__line} />
                            </div>
                        </article>
                    </section>
                    <div className={styles.commentForm}>
                        <CommentForm
                            textareaValue={text}
                            textareaOnChangeFn={handleChange}
                            sendButtonClickFn={handleClick}
                            textareaPlaceholder='Оставьте комментарий'
                        />
                    </div>
                    <div className={styles.comments__title}>
                        <p className={styles.comment__line} />
                        <span>Комментарии</span>
                        <p className={styles.comment__line} />
                    </div>
                    <Comment />
                </section>
                <ModalFilmPoster film={film} />
            </div>
        </PageLayout>
    );
};

export default Review;
