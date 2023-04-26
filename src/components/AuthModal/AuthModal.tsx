import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useActions } from '@/hooks/ReduxHooks';
import { signIn } from 'next-auth/react';
import Input from '../UI/Input/Input';
import HighlightButton from '../UI/HighlightButton/HighlightButton';
import BasicBtn from '../UI/BasicBtn/BasicBtn';
import { FaGoogle, FaVk } from 'react-icons/fa';
import { TbPencil } from 'react-icons/tb';
import { useForm } from 'react-hook-form';

interface IAuthModalProps {
    modalShown: boolean;
}

type EmailForm = {
    inputEmail: string;
};

const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const { setAuthModal } = useActions();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EmailForm>();
    const onEmailSubmit = handleSubmit((data) => {
        //console.log(data);
    });
    const [validatedEmail, setValidatedEmail] = useState('');
    const [progressBar, setProgressBar] = useState(5);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.style.top = window.scrollY + 'px';
        }
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalShown]);

    console.log(watch('inputEmail'));

    return (
        <div className={styles.modal} ref={modalRef}>
            <section className={styles.header}>
                <div className={styles.header__container}>
                    <div></div>
                    <h2 className={styles.header__title}>Вход или регистрация</h2>
                </div>
                <div
                    className={styles.header__progressBar}
                    style={{
                        width: `${progressBar}%`,
                    }}></div>
                <div className={styles.close} onClick={() => setAuthModal(false)}></div>
            </section>
            <section className={styles.chat}>
                <div className={styles.chat__container}>
                    <div className={`${styles.message} ${styles.message__prompt}`}>
                        Войдите или зарегистрируйтесь
                    </div>
                    <div className={styles.inputs}>
                        <form id='email-input' onSubmit={onEmailSubmit}>
                            <Input
                                {...register('inputEmail', { required: true })}
                                type='email'
                                placeholder='Введите ваш email'
                            />
                        </form>
                        <HighlightButton className={styles.highlightbtn} form='email-input'>
                            Продолжить
                        </HighlightButton>

                        <BasicBtn
                            onClick={() => {
                                signIn('google');
                            }}
                            btnType='textPlusIcon'
                            title='Войти с помощью Google'
                            className={`${styles.basicbtn} ${styles.basicbtn_google}`}>
                            <FaGoogle />
                        </BasicBtn>
                        <BasicBtn
                            onClick={() => signIn('vk')}
                            btnType='textPlusIcon'
                            title='Войти с помощью ВКонтакте'
                            className={`${styles.basicbtn} ${styles.basicbtn_vk}`}>
                            <FaVk />
                        </BasicBtn>
                    </div>
                    <div className={styles.useremail}>
                        <div className={styles.useremail_edit}>
                            <TbPencil />
                        </div>
                        <div className={`${styles.useremail_mail} ${styles.message}`}>
                            test@mail.ru
                        </div>
                    </div>
                    <div className={`${styles.message} ${styles.message__prompt}`}>
                        Введите пароль, чтобы войти
                    </div>
                    <Input type='password' charHideBtn placeholder='Введите пароль' />
                    <HighlightButton className={styles.highlightbtn}>Войти</HighlightButton>
                </div>
            </section>
        </div>
    );
};

export default AuthModal;
