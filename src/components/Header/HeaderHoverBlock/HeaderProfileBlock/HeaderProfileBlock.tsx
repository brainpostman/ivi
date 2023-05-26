import HighlightButton from '@/components/UI/Buttons/HighlightButton/HighlightButton';
import { useActions } from '@/hooks/ReduxHooks';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { BiChalkboard, BiPurchaseTagAlt } from 'react-icons/bi';
import { BsFillBookmarkFill, BsFillCreditCardFill } from 'react-icons/bs';
import { FaHistory } from 'react-icons/fa';
import { RiShareLine } from 'react-icons/ri';
import { SlDiamond } from 'react-icons/sl';
import { TbCertificate } from 'react-icons/tb';
import style from './HeaderProfileBlock.module.scss';
import Link from 'next/link';
import { authAPI } from '@/api/queries/auth.api';

const HeaderProfileBlock = () => {
    const { setAuthModal } = useActions();
    const { status, data } = useSession();
    const { t } = useTranslation('header', {
        keyPrefix: 'right-side.profile-block',
    });

    const email = data ? data.user.name || data.user.email : '';
    const isAdmin = data ? data.user.roles.some((role) => role.value === 'admin') : false;

    return (
        <div className={style.wrapper}>
            <ul className={style.list}>
                <li>
                    <BiPurchaseTagAlt className={style.icon} />
                    <p className={style.title}>{t('purchases')}</p>
                </li>
                <li>
                    <BsFillBookmarkFill className={style.icon} />
                    <p className={style.title}>{t('watch-later')}</p>
                </li>
                <li>
                    <FaHistory className={style.icon} />
                    <p className={style.title}>{t('watch-history')}</p>
                </li>
                <li>
                    <div className={style.circle}></div>
                    <SlDiamond className={style.icon} />
                    <div>
                        <p className={style.title}>{t('subscriptions')}</p>
                        <p className={style.subtitle}>{t('connect')}</p>
                    </div>
                </li>
                <li>
                    <TbCertificate className={style.icon} />
                    <p className={style.title}>{t('cert-activation')}</p>
                </li>
                <li>
                    <BiChalkboard className={style.icon} />
                    <p className={style.title}>{t('sign-in-by-code')}</p>
                </li>
                <li>
                    <BsFillCreditCardFill className={style.icon} />
                    <p className={style.title}>{t('payment')}</p>
                </li>
                <li>
                    <RiShareLine className={style.icon} />
                    <p className={style.title}>{t('invite-friends')}</p>
                </li>
            </ul>

            <div className={style.right_side}>
                {status !== 'authenticated' ? (
                    <HighlightButton onClick={() => setAuthModal(true)}>
                        {t('sign-in-register')}
                    </HighlightButton>
                ) : (
                    <div className={style.right_side__auth_block}>
                        <p className={style.right_side__auth_block__name}>{email}</p>
                        <HighlightButton
                            onClick={() => authAPI.signOut(data.accessToken, data.user.id)}>
                            {t('sign-out')}
                        </HighlightButton>

                        {isAdmin && (
                            <Link href='/admin'>
                                <HighlightButton>{t('admin')}</HighlightButton>
                            </Link>
                        )}
                    </div>
                )}

                <div className={style.labels}>
                    <p className='text'>{t('settings')}</p>
                    <p className='text'>{t('support')}</p>
                </div>
            </div>
        </div>
    );
};

export default HeaderProfileBlock;
