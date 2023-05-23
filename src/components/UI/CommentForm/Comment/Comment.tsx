import { IReviewGetResponse } from '@/types/films.api.interface';
import styles from './Comment.module.scss';

interface ICommentProps {
    comment: IReviewGetResponse;
    className?: string;
}

const Comment = ({ comment, className: propsClassName = '' }: ICommentProps) => {
    return (
        <article className={`${styles.openingPost} ${propsClassName}`}>
            <div className={styles.comment}>
                <div className={styles.comment__info}>
                    <p className={styles.comment__line} />
                    <p className={styles.comment__title}>
                        <span className={styles.comment__from}>
                            <span className={styles.comment__sender}>
                                {comment.name || comment.user_email}
                            </span>
                        </span>
                        <span>
                            {', отправлен '}
                            <span className={styles.comment__date} title={`${locDate}, ${locTime}`}>
                                {dateStr}
                            </span>
                        </span>
                    </p>
                    <p className={styles.comment__line} />
                </div>
                <p className={styles.comment__content}>{comment.text}</p>
                <div className={styles.comment__controls}>
                    <p className={styles.comment__line} />
                    {status === 'authenticated' && data.user.id === comment.user_id ? (
                        <div className={styles.comment__buttons}>
                            <span>Редактировать</span>
                        </div>
                    ) : (
                        <p className={styles.comment__line} />
                    )}
                    <p className={styles.comment__line} />
                </div>
            </div>
        </article>
    );
};

export default Comment;
