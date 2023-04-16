import { IHead } from '@/types/head.interface'
import Head from 'next/head'
import { FC } from 'react'

// FIXME: не работают метатеги

const HeadModif: FC<IHead> = ({ title, description, keywords, noIndex }) => {
	return (
		<Head>
			<title>{title}</title>
			{noIndex ? (
				<meta name='robots' content='noindex,nofollow' />
			) : (
				<>
					{description && (
						<>
							<meta name='description' content={description} />
							<meta property='og:description' content={description} />
						</>
					)}
					{keywords && <meta name='keywords' content={keywords} />}
				</>
			)}
		</Head>
	)
}

export default HeadModif
