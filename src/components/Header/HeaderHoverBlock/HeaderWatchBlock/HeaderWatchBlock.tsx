import HighlightButton from '@/components/UI/HighlightButton/HighlightButton'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { BiCameraMovie } from 'react-icons/bi'
import { BsDownload } from 'react-icons/bs'
import { CiBullhorn } from 'react-icons/ci'
import { MdSupervisorAccount } from 'react-icons/md'
import style from './HeaderWatchBlock.module.scss'

const HeaderWatchBlock = () => {
  return (
    <div>
      <div className={style.info}>
        <h1 className={style.info__title}>Подписка Иви</h1>
        <p className={style.info__subtitle}>
          Стоимость 399 ₽ в месяц, продление автоматическое
        </p>
      </div>

      <ul className={style.list}>
        <li>
          <BiCameraMovie />
          <p>Новинки сериалов и фильмов</p>
        </li>
        <li>
          <AiOutlineFolderAdd />
          <p>
            Еженедельное пополнение каталога фильмами и сериалами со всего мира
          </p>
        </li>
        <li>
          <CiBullhorn />
          <p>Фильмы и сериалы без рекламы</p>
        </li>
        <li>
          <MdSupervisorAccount />
          <p>Семейный аккаунт на 5 устройствах</p>
        </li>
        <li>
          <BsDownload />
          <p>Загрузка на мобильные устройства</p>
        </li>
      </ul>

      <div className={style.bottom_content}>
        <HighlightButton className={style.bottom_content__button}>
          Смотреть 30 дней за 1 ₽
        </HighlightButton>
        <p className={style.bottom_content__info}>
          Отключить можно в любой момент
        </p>
      </div>
    </div>
  )
}

export default HeaderWatchBlock
