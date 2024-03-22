import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'
import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
	title?: string
	children: React.ReactNode
}

const AuthenticatedPage = ({ title, children }: Props) => {
	const router = useRouter()
	const { ready, authenticated, user } = usePrivy()

	useEffect(() => {
		if (ready && !authenticated) {
			router.push('/')
		}
	}, [ready, authenticated, router])

	return (
		<>
			{title ? (
				<Head>
					<title>{title}</title>
				</Head>
			) : null}

			<Appbar />

			<main
				/**
				 * Padding top = `appbar` height
				 * Padding bottom = `bottom-nav` height
				 */
				className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'
			>
				<div className='p-6'>{children}</div>
			</main>

			<BottomNav />
		</>
	)
}

export default AuthenticatedPage
