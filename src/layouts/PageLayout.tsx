import HeadModif from '@/components/HeadModif/HeadModif'
import Header from '@/components/Header/Header'
import { FC, PropsWithChildren } from 'react'

interface IProps {
	title: string
	description?: string
	keywords?: string
	noIndex?: boolean
}

const PageLayout: FC<PropsWithChildren<IProps>> = ({
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
