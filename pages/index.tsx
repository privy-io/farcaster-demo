import Blobby from '@/components/svg/blobby'
import { useLogin, usePrivy } from '@privy-io/react-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';


const Index = () => {
	const router = useRouter()
	const { ready, authenticated, logout } = usePrivy()
	const { login } = useLogin({
		onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
			console.log('🔑 ✅ Login success', {
				user,
				isNewUser,
				wasPreviouslyAuthenticated,
			})
			router.push('/farcaster')
		},
		onError(error) {
			console.log('🔑 🚨 Login error', { error })
		},
	})

	return (
		<>
			<Head>
				<title>slay⚡caster</title>
			</Head>
			<main>
				<div className='flex h-screen w-screen flex-col items-center justify-center'>
<<<<<<< HEAD
					<Image
						src="/images/slaycaster-suare.png" // Path relative to the public directory
						alt="Slaycaster Logo"
						width={160} // Width of the image in pixels
						height={40} // Height of the image in pixels
						className="w-40 sm:w-40 md:w-48"
					/>
=======
				    <img src="https://slaycaster.4everland.store/slaycasterlogo.png" alt="Slaycaster Logo" className="w-40 sm:w-40 md:w-48" />
>>>>>>> parent of c334876 (improved logo)
					<h1 className='my-4 text-md text-gray-800'>
						Login with Farcaster using Privy and start casting.
					</h1>
					<div className='mt-2 w-1/3'> {/* This will make the button container one-third of the parent's width */}
  						<button
    						className='my-4 w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 disabled:bg-purple-400'
    						onClick={login}
    					disabled={!ready || authenticated}
  						>
    						Login with Farcaster
  						</button>
</div>
				</div>
			</main>
		</>
	)
}

export default Index
