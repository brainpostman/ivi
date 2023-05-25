import ModalFilmPoster from '@/components/Watch/ModalFilmPoster/ModalFilmPoster';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import CommentForm from '@/components/UI/CommentForm/CommentForm';
import { IMovieById } from '@/types/api/films.api.interface';
import { ChangeEvent } from 'react';
import styles from './ModalCommentForm.module.scss';

interface IModalCommentFormProps {
    isShow: boolean;
    closeFunc: () => void;
    title: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onClickSubmit: () => void;
    film: IMovieById;
}

const ModalCommentForm = ({
    isShow,
    closeFunc,
    title,
    value,
    placeholder,
    onChange,
    onClickSubmit,
    film,
}: IModalCommentFormProps) => {
    return (
        <ModalWindow isShow={isShow} closeFunc={closeFunc}>
            <div className={styles.modal}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.commentForm}>
                    <CommentForm
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                        onClickSubmit={onClickSubmit}
                        className={styles.textarea}
                    />
                    <ModalFilmPoster film={film} />
                </div>
            </div>
        </ModalWindow>
    );
};

export default ModalCommentForm;
