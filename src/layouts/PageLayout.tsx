import Footer from '@/components/Footer/Footer'
import HeadModif from '@/components/HeadModif/HeadModif'
import Header from '@/components/Header/Header'
import { IHead } from '@/types/head.interface'
import { FC, PropsWithChildren } from 'react'
import style from './PageLayout.module.scss'

const PageLayout: FC<PropsWithChildren<IHead>> = ({
	title,
	description,
	keywords,
	noIndex,
	children,
}) => {
	return (
		<>
			<HeadModif
				title={title}
				description={description}
				keywords={keywords}
				noIndex={noIndex}
			/>
			<Header />
			<main>
				<section className={style.container}>{children}</section>
			</main>
			<Footer />
		</>
	)
}

export default PageLayout
