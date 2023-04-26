import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useActions } from '@/hooks/ReduxHooks';
import { signIn } from 'next-auth/react';
import Input from '../UI/Input/Input';
import HighlightButton from '../UI/HighlightButton/HighlightButton';
import BasicBtn from '../UI/BasicBtn/BasicBtn';
import { FaGoogle, FaVk } from 'react-icons/fa';
import { TbPencil } from 'react-icons/tb';

interface IAuthModalProps {
    modalShown: boolean;
}

const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const { setAuthModal } = useActions();
    const [progressBar, setProgressBar] = useState(5);
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
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
                        <Input
                            type='text'
                            placeholder='Введите ваш email'
                            onChange={(e) => setEmailInput(e.target.value)}
                            value={emailInput}
                        />
                        <HighlightButton
                            onClick={() =>
                                signIn('login', {
                                    redirect: false,
                                    email: emailInput,
                                    password: passInput,
                                })
                            }>
                            Продолжить
                        </HighlightButton>
                        <BasicBtn
                            onClick={() => {
                                signIn('google');
                            }}
                            btnType='textPlusIcon'
                            title='Войти с помощью Google'
                            className={styles.basicbtn}>
                            <FaGoogle />
                        </BasicBtn>
                        <BasicBtn
                            onClick={() => signIn('vk')}
                            btnType='textPlusIcon'
                            title='Войти с помощью ВКонтакте'
                            className={styles.basicbtn}>
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
                    <Input
                        type='password'
                        charHideBtn
                        placeholder='Введите пароль'
                        onChange={(e) => setPassInput(e.target.value)}
                        value={passInput}
                    />
                    <HighlightButton
                        onClick={() =>
                            signIn('login', {
                                redirect: false,
                                email: emailInput,
                                password: passInput,
                            })
                        }>
                        Войти
                    </HighlightButton>
                </div>
            </section>
        </div>
    );
};

export default AuthModal;
