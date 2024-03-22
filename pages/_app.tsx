import type { AppProps } from 'next/app'
import Meta from '@/components/meta'
import '@/styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<PrivyProvider
			appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
			// Exists but is hidden as a private feature
			// @ts-ignore
			apiUrl={process.env.NEXT_PUBLIC_PRIVY_AUTH_URL}
			config={{
				loginMethods: ['farcaster'],
				embeddedWallets: {
					createOnLogin: 'all-users',
				},
			}}
		>
			<Meta />
			<Component {...pageProps} />
		</PrivyProvider>
	)
}

export default App
