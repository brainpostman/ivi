import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import {
	FaLinkedinIn,
	FaOdnoklassniki,
	FaTelegramPlane,
	FaTwitter,
	FaViber,
	FaVk,
} from 'react-icons/fa'
import styles from './FooterSocials.module.scss'

const FooterSocials = () => {
	return (
		<div className={styles.container}>
			<BasicBtn btnType='iconCircle' href='https://vk.com/iviru'>
				<FaVk />
			</BasicBtn>

			<BasicBtn btnType='iconCircle' href='https://ok.ru/ivi.ru'>
				<FaOdnoklassniki />
			</BasicBtn>
			<BasicBtn btnType='iconCircle' href='https://twitter.com/ivi_ru'>
				<FaTwitter />
			</BasicBtn>
			<BasicBtn btnType='iconCircle' href='https://vb.me/a0544c'>
				<FaViber />
			</BasicBtn>
			<BasicBtn
				btnType='iconCircle'
				href='https://www.linkedin.com/company/2543415/'
			>
				<FaLinkedinIn />
			</BasicBtn>
			<BasicBtn btnType='iconCircle' href='https://t.me/official_iviru'>
				<FaTelegramPlane />
			</BasicBtn>
		</div>
	)
}

export default FooterSocials
