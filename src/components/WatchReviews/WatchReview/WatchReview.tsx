import { FC } from 'react';
import styles from './WatchReview.module.scss';
import { IReview } from '@/types/films.api.interface';
import { localizeDateString } from '@/formatters/localizeDateString.format';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

interface IProps {
    locale: string;
    review: IReview;
    className?: string;
}

const WatchReview: FC<IProps> = ({
    review: { text, name, user_email, createdAt },
    locale,
    className: propsClassName,
}) => {
    const date = localizeDateString(new Date(createdAt), locale);

    return (
        <div className={`${styles.wrapper} ${propsClassName}`}>
            <div className={styles.user}>{name ?? user_email}</div>
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
    );
};

export default WatchReview;
