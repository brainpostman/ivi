import { IHeaderTab } from '@/types/header.interface'
import Image from 'next/image'
import Link from 'next/link'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import style from './HeaderLeftSide.module.scss'
import { useTranslation } from 'next-i18next'

const logoSrc =
  'https://solea-parent.dfs.ivi.ru/picture/ea003d,ffffff/reposition_iviLogoPlateRounded.svg'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  showHoverBlock: (tab: IHeaderTab) => void
}

const HeaderLeftSide: FC<IProps> = ({ showHoverBlock, ...props }) => {
  const { t } = useTranslation('header', { keyPrefix: 'left-side.titles' })

  return (
    <article className={style.wrapper} {...props}>
      <Link href='/' className={style.logo}>
        <Image src={logoSrc} alt='logo' width={66} height={72} />
      </Link>

      <nav className={style.nav}>
        <Link href='/'>{t('my-ivi')}</Link>
        <Link href='/' onMouseEnter={() => showHoverBlock(undefined)}>
          {t('new-releases')}
        </Link>
        <Link href='/movies' onMouseEnter={() => showHoverBlock('movies')}>
          {t('movies')}
        </Link>
        <Link
          href='https://www.ivi.ru/series'
          onMouseEnter={() => showHoverBlock('series')}
        >
          {t('series')}
        </Link>
        <Link
          href='https://www.ivi.ru/animation'
          onMouseEnter={() => showHoverBlock('cartoons')}
        >
          {t('animation')}
        </Link>
        <Link
          href='https://www.ivi.ru/tvplus'
          onMouseEnter={() => showHoverBlock('TV+')}
        >
          {t('tv+')}
        </Link>
      </nav>
    </article>
  )
}

export default HeaderLeftSide
