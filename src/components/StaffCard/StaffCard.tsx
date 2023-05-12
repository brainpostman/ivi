import Image from 'next/image'
import style from './StaffCard.module.scss'
import { IStaffGetResponse } from '@/types/staffs.interface'
import { FC } from 'react'

interface IProps {
  staff: IStaffGetResponse
}

const StaffCard: FC<IProps> = ({ staff }) => {
  return (
    <div className={style.container}>
      <div className={style.wrapper_img}>
        <Image
          src='/film/noPhotoIcon60x60.png'
          alt={staff.name}
          className={style.img}
          fill
        />
      </div>
      <p className={style.name}>{staff.name}</p>
    </div>
  )
}

export default StaffCard
