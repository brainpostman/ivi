import { IMovieById } from '@/types/api/films.api.interface';
import styles from './ReviewComment.module.scss';
import { buildDateString, trimComment, validateComment } from '@/utils/comment.utils';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Session } from 'next-auth';
import CommentForm from '../UI/CommentForm/CommentForm';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader/Loader';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import ModalFilmPoster from '@/components/ModalFilmPoster/ModalFilmPoster';
import { reviewsAPI } from '@/api/queries/reviews.api';
import { IReviewGetResponse } from '@/types/api/reviews.api.interface';
import { useTranslation } from 'next-i18next';
import ModalCommentForm from './ModalCommentForm/ModalCommentForm';

interface ICommentProps {
    sessionStatus: 'authenticated' | 'loading' | 'unauthenticated';
    sessionData: Session | null;
    film: IMovieById;
    comment: IReviewGetResponse;
    className?: string;
    depth: number;
}

const ReviewComment = ({
    sessionStatus: status,
    sessionData: data,
    film,
    comment,
    className: propsClassName = '',
    depth,
}: ICommentProps) => {
    const { t } = useTranslation('review');
    const router = useRouter();
    const { locale } = router;
    const date = new Date(comment.createdAt);
    const dateStr = buildDateString(date, locale ?? 'ru');
    const locDate = date.toLocaleDateString();
    const locTime = date.toLocaleTimeString();
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [childComments, setChildComments] = useState<IReviewGetResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [commentText, setCommentText] = useState(comment.text);
    const [editText, setEditText] = useState(comment.text);

    useEffect(() => {
        setIsLoading(true);
    }, []);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        toast.dismiss();
    };

    const handleClick = async () => {
        toast.dismiss();
        const str = trimComment(text);
        setText(str);
        if (!validateComment(10, 10000, str)) {
            toast.warn(t('review-comment.messages.warn'));
            return;
        }
        if (data) {
            const response = await reviewsAPI.postFilmReview(
                {
                    text: str,
                    user_id: data.user.id,
                    film_id: film.id,
                    parent: comment.id,
                },
                data.accessToken
            );
            if (response) {
                setText('');
                setShowForm(false);
                setIsLoading(true);
            } else {
                toast.error(t('review-comment.messages.error'));
            }
        }
    };

    const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditText(e.target.value);
        toast.dismiss();
    };

    const handleEditClick = async () => {
        toast.dismiss();
        const str = trimComment(editText);
        setEditText(str);
        if (!validateComment(10, 10000, str)) {
            toast.warn(t('review-comment.messages.warn'));
            return;
        }
        if (data) {
            const response = await reviewsAPI.putFilmReview(
                {
                    id: comment.id,
                    text: str,
                },
                data.accessToken
            );
            if (response) {
                setCommentText(editText);
                setShowModal(false);
                toast.success(t('review-comment.messages-edit.success'));
            } else {
                toast.error(t('review-comment.messages-edit.error'));
            }
        }
    };

    const handleReplyClick = () => {
        if (status === 'authenticated') {
            setShowForm(true);
        } else {
            router.push('/auth/signin');
        }
    };

    useEffect(() => {
        const getChildComments = async () => {
            const commentsReq = await reviewsAPI.getComments(film.id, comment.id);
            if (commentsReq.length > 0) {
                setChildComments(commentsReq);
            }
        };
        if (isLoading) {
            getChildComments();
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <article className={`${styles.openingPost} ${propsClassName}`}>
            <div className={styles.comment}>
                <div className={styles.comment__info}>
                    <p className={styles.comment__line} />
                    <p className={styles.comment__title}>
                        <span className={styles.comment__from}>
                            <span className={styles.comment__sender}>
                                {comment.user_name || comment.user_email}
                            </span>
                        </span>
                        <span>
                            {t('sent-date')}
                            <span className={styles.comment__date} title={`${locDate}, ${locTime}`}>
                                {dateStr}
                            </span>
                        </span>
                    </p>
                    <p className={styles.comment__line} />
                </div>
                <p className={styles.comment__content}>{commentText}</p>
                <div className={styles.comment__controls}>
                    <p className={styles.comment__line} />
                    <div className={styles.comment__buttons}>
                        {depth > 5 && childComments.length > 0 ? (
                            <span
                                onClick={() => {
                                    router.push(`/watch/${film.id}/review/${comment.id}`);
                                }}>
                                {t('review-comment.load-comments')}
                            </span>
                        ) : (
                            <>
                                <span onClick={handleReplyClick}>{t('review-comment.reply')}</span>
                                {data && data.user.id === comment.user_id && (
                                    <span
                                        onClick={() => {
                                            setShowModal(true);
                                        }}>
                                        {t('edit')}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                    <p className={styles.comment__line} />
                </div>
                {showForm && (
                    <div className={styles.commentForm}>
                        <CommentForm
                            value={text}
                            onChange={handleChange}
                            onClickSubmit={handleClick}
                            placeholder={t('review-comment.leave-comment')}
                            cancelButtonCallback={() => {
                                setShowForm(false);
                            }}
                        />
                    </div>
                )}
                {isLoading ? (
                    <Loader />
                ) : depth < 6 && childComments.length > 0 ? (
                    <div className={styles.comments__list}>
                        {childComments.map((comment) => {
                            return (
                                <ReviewComment
                                    key={comment.id}
                                    sessionStatus={status}
                                    sessionData={data}
                                    film={film}
                                    comment={comment}
                                    depth={depth + 1}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}
            </div>
            {showModal && (
                <ModalCommentForm
                    isShow={showModal}
                    closeFunc={() => {
                        setShowModal(false);
                        setEditText(comment.text);
                    }}
                    title={t('review-comment.edit-comment')}
                    value={editText}
                    placeholder={t('review-comment.edit-placeholder')}
                    onChange={handleEditChange}
                    onClickSubmit={handleEditClick}
                    film={film}
                />
            )}
            {showForm && (
                <ModalCommentForm
                    isShow={showForm}
                    closeFunc={() => {
                        setShowForm(false);
                    }}
                    title={t('review-comment.edit-comment')}
                    value={text}
                    placeholder={t('review-comment.edit-placeholder')}
                    onChange={handleChange}
                    onClickSubmit={handleClick}
                    film={film}
                />
            )}
        </article>
    );
};

export default ReviewComment;
