import { FC } from 'react';
import styles from './WatchReview.module.scss';
import { IReviewGetResponse } from '@/types/api/reviews.api.interface';
import { localizeDateString } from '@/formatters/localizeDateString.format';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import Link from 'next/link';

interface IProps {
    locale: string;
    review: IReviewGetResponse;
    className?: string;
}

const WatchReview: FC<IProps> = ({
    review: { text, user_name, user_email, createdAt, film_id, id },
    locale,
    className: propsClassName,
}) => {
    const date = localizeDateString(new Date(createdAt), locale);

    return (
        <Link href={`/watch/${film_id}/review/${id}`}>
            <div className={`${styles.wrapper} ${propsClassName}`}>
                <div className={styles.user}>{user_name ?? user_email}</div>
                <div
                    className={styles.content}
                    style={{
                        lineHeight: 1.47,
                    }}>
                    {text}
                </div>
                <div className={styles.info}>
                    <span className={styles.date}>{date}</span>
                    <span className={styles.likes}>
                        <FiThumbsUp className={styles.likes__icon} />
                        <span className={styles.likes__num}>666</span>
                        <FiThumbsDown className={styles.likes__icon} />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default WatchReview;
