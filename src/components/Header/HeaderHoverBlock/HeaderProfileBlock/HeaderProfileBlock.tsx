import HighlightButton from '@/components/UI/HighlightButton/HighlightButton';
import { BiChalkboard, BiPurchaseTagAlt } from 'react-icons/bi';
import { BsFillBookmarkFill, BsFillCreditCardFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { RiShareLine } from 'react-icons/ri';
import { SlDiamond } from 'react-icons/sl';
import { TbCertificate } from 'react-icons/tb';
import style from './HeaderProfileBlock.module.scss';
import AuthModal from '@/components/AuthModal/AuthModal';
import { setAuthModal } from '@/store/reducers/authModalReducer';
import { useTypedDispatch } from '@/hooks/ReduxHooks';

const HeaderProfileBlock = () => {
    const dispatch = useTypedDispatch();

    return (
        <div className={style.wrapper}>
            <ul className={style.list}>
                <li>
                    <BiPurchaseTagAlt className={style.icon} />
                    <p className={style.title}>Покупки</p>
                </li>
                <li>
                    <BsFillBookmarkFill className={style.icon} />
                    <p className={style.title}>Смотреть позже</p>
                </li>
                <li>
                    <FaHistory className={style.icon} />
                    <p className={style.title}>История просмотров</p>
                </li>
                <li>
                    <div className={style.circle}></div>
                    <SlDiamond className={style.icon} />
                    <div>
                        <p className={style.title}>Подписки</p>
                        <p className={style.subtitle}>Подключить</p>
                    </div>
                </li>
                <li>
                    <TbCertificate className={style.icon} />
                    <p className={style.title}>Активация сертификата</p>
                </li>
                <li>
                    <BiChalkboard className={style.icon} />
                    <p className={style.title}>Вход по коду</p>
                </li>
                <li>
                    <BsFillCreditCardFill className={style.icon} />
                    <p className={style.title}>Способ оплаты</p>
                </li>
                <li>
                    <RiShareLine className={style.icon} />
                    <p className={style.title}>Пригласить друзей</p>
                </li>
            </ul>

            <div className={style.right_side}>
                <HighlightButton onClick={() => dispatch(setAuthModal(true))}>
                    Войти или зарегистрироваться
                </HighlightButton>

                <div className={style.labels}>
                    <p className='text'>Настройки</p>
                    <p className='text'>Помощь</p>
                </div>
            </div>
        </div>
    );
};

export default HeaderProfileBlock;
