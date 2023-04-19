import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { useState } from 'react'
import { FiPhone } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'
import styles from './FooterSupport.module.scss'

const FooterSupport = () => {
	const [showPopUp, setShowPopUp] = useState(false)

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Служба поддержки</h3>
			<div className={styles.description}>
				<p>Мы всегда готовы вам помочь.</p>
				<p>Наши операторы онлайн 24/7</p>
			</div>
			<BasicBtn btnType='text' href='https://www.ivi.ru/profile'>
				Написать в чате
			</BasicBtn>
			<div className={styles.buttons}>
				<BasicBtn btnType='icon' href='mailto:support@ivi.ru'>
					<GoMail />
				</BasicBtn>

				<BasicBtn btnType='icon' onClick={() => setShowPopUp(prev => !prev)}>
					<FiPhone />
				</BasicBtn>

				<BasicBtn
					className={`${styles.popup} ${showPopUp ? styles.popupActive : ''}`}
					href='tel:+78442459825'
					btnType='text'
				>
					+7 347 258-80-05
				</BasicBtn>
			</div>
			<div className={styles.askivi}>
				<a href='https://ask.ivi.ru/' target='_blank' rel='noreferrer'>
					ask.ivi.ru
				</a>
				<p>Ответы на вопросы</p>
			</div>
		</div>
	)
}

export default FooterSupport
