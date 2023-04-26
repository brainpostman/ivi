import { useActions } from '@/hooks/ReduxHooks'
import { signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import styles from './AuthModal.module.scss'

interface IAuthModalProps {
  modalShown: boolean
}

const AuthModal = ({ modalShown }: IAuthModalProps) => {
  const { setAuthModal } = useActions()
  const [progressBar, setProgressBar] = useState(5)
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.top = window.scrollY + 'px'
    }
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalShown])

  return (
    <div className={styles.modal} ref={modalRef}>
      <section className={styles.header}>
        <div className={styles.header__container}>
          <div></div>
          <h2 className={styles.header__title}>Вход или регистрация</h2>
          <div
            className={styles.close}
            onClick={() => setAuthModal(false)}
          ></div>
        </div>
        <div
          className={styles.header__progressBar}
          style={{
            width: `${progressBar}%`,
          }}
        ></div>
      </section>
      <div className={styles.prompt}>
        <p className={styles.prompt__main}>Войдите или зарегистрируйтесь</p>
        <p className={styles.prompt__sub}>
          чтобы пользоваться сервисом на любом устройстве
        </p>
      </div>
      <div className={styles.inputs}>
        <input
          type='email'
          placeholder='Почта'
          onChange={e => setEmailInput(e.target.value)}
          value={emailInput}
          className={styles.input}
        />
        <input
          type='text'
          placeholder='Пароль'
          onChange={e => setPassInput(e.target.value)}
          value={passInput}
        />
        <button
          onClick={() =>
            signIn('login', {
              redirect: false,
              email: emailInput,
              password: passInput,
            })
          }
        >
          Login
        </button>
        <button
          onClick={() => {
            signIn('google')
          }}
        >
          Войти с помощью Google
        </button>
        <button onClick={() => signIn('vk')}>Login with Vkontakte</button>
      </div>
    </div>
  )
}

export default AuthModal
