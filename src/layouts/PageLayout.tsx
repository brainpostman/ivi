import HeadModif from '@/components/HeadModif/HeadModif'
import Header from '@/components/Header/Header'
import { IHead } from '@/types/head.interface'
import { FC, PropsWithChildren } from 'react'

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
			<main>{children}</main>
		</>
	)
}

export default PageLayout
