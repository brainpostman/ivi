import Image from 'next/image'
import style from './StaffCard.module.scss'
import { IStaff } from '@/types/films.api.interface'
import { FC } from 'react'

interface IProps {
  staff: IStaff
}

const StaffCard: FC<IProps> = ({ staff }) => {
  return (
    <div className={style.container}>
      <Image
        src='/film/noPhotoIcon60x60.png'
        width={128}
        height={128}
        alt={staff.name}
        className={style.img}
      />
      <p className={style.name}>{staff.name}</p>
    </div>
  )
}

export default StaffCard
