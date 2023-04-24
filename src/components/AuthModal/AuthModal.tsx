import { useEffect, useRef, useState } from 'react';
import styles from './AuthModal.module.scss';
import { useTypedDispatch } from '@/hooks/ReduxHooks';
import { setAuthModal } from '../../store/reducers/authModalReducer';
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from 'axios';

interface IAuthModalProps {
    modalShown: boolean;
}

const AuthModal = ({ modalShown }: IAuthModalProps) => {
    const [progressBar, setProgressBar] = useState(5);
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const dispatch = useTypedDispatch();
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

    const getGoogle = async () => {
        const response = await axios.get('http://localhost:3000/google');
    };

    return (
        <div className={styles.modal} ref={modalRef}>
            <section className={styles.header}>
                <div className={styles.header__container}>
                    <div></div>
                    <h2 className={styles.header__title}>Вход или регистрация</h2>
                    <div
                        className={styles.close}
                        onClick={() => dispatch(setAuthModal(false))}></div>
                </div>
                <div
                    className={styles.header__progressBar}
                    style={{
                        width: `${progressBar}%`,
                    }}></div>
            </section>
            <div className={styles.inputs}>
                <input
                    type='email'
                    placeholder='Почта'
                    onChange={(e) => setEmailInput(e.target.value)}
                    value={emailInput}
                />
                <input
                    type='text'
                    placeholder='Пароль'
                    onChange={(e) => setPassInput(e.target.value)}
                    value={passInput}
                />
                <button
                    onClick={() =>
                        signIn('login', {
                            redirect: false,
                            email: emailInput,
                            password: passInput,
                        })
                    }>
                    Login
                </button>
                <button
                    onClick={() => {
                        signIn('google');
                    }}>
                    Login with google
                </button>
                <button onClick={() => signIn('vk')}>Login with Vkontakte</button>
            </div>
        </div>
    );
};

export default AuthModal;
