import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react';
import { HeartIcon, ArrowPathIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import {
  useLogout,
  usePrivy,
  useExperimentalFarcasterSigner,
  FarcasterWithMetadata,
} from '@privy-io/react-auth';
import Head from 'next/head';
import useSWRMutation from 'swr/mutation';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FarcasterPage() {
  const [isHashVisible, setIsHashVisible] = useState(false);

  const toggleHashVisibility = () => {
    setIsHashVisible(!isHashVisible);
  };

  const router = useRouter();

  const [castInput, setCastInput] = useState('');

  const {getAccessToken, user} = usePrivy();

  const {
    submitCast,
    removeCast,
    likeCast,
    recastCast,
    followUser,
    unfollowUser,
    requestFarcasterSigner,
  } = useExperimentalFarcasterSigner();

  const {logout} = useLogout({
    onSuccess: () => {
      console.log('🫥 ✅ logOut onSuccess');
      router.push('/');
    },
  });

  const farcasterAccount = user?.linkedAccounts.find(
    (a) => a.type === 'farcaster',
  ) as FarcasterWithMetadata;
  const signerPublicKey = farcasterAccount?.signerPublicKey;

  const getUserCasts = async (
    url: string,
  ): Promise<{
    result: any;
    next: string;
  }> => {
    return (await (
      await fetch(url, {
        headers: {
          api_key: '97238FF8-F378-4218-98DF-B940C7AD8172',
          accept: 'application/json',
        },
      })
    ).json()) as {
      result: any;
      next: string;
    };
  };

  const {data, isMutating, trigger} = useSWRMutation<{
    result: any;
    next: string;
  }>(
    farcasterAccount
      ? `https://api.neynar.com/v1/farcaster/casts?fid=${farcasterAccount.fid}&viewerFid=3&limit=25`
      : undefined,
    getUserCasts,
  );

  useEffect(() => {
    if (farcasterAccount) setTimeout(() => trigger(), 2000);
  }, [!!farcasterAccount]);

  const formattedCasts = data?.result.casts.map((cast: any) => {
    return (
      <div className="mt-4 mx-auto max-w-2xl p-4 bg-white shadow rounded-lg relative">
      {/* Cast Content and Info Icon */}
      <div className="flex justify-between items-start mb-4">
        {/* Cast Text */}
        <p className="text-sm text-gray-700 flex-1">{cast.text}</p>

        {/* Toggle Icon */}
        <button
          onClick={toggleHashVisibility}
          type="button"
          className="ml-4 flex-shrink-0"
        >
          <InformationCircleIcon className="h-6 w-6 text-gray-500 hover:text-gray-700" />
        </button>
      </div>

      {/* Optionally Displayed Hash */}
      {isHashVisible && (
        <div className="text-left">
          <span className="text-xs text-gray-500">Cast Hash is {cast.hash}</span>
        </div>
      )}
  
  {/* Cast Actions */}
  <div className="flex justify-between items-center mt-4">
    <div className="flex space-x-2">
      <button
        className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        onClick={async () => {
          // Add your logic to remove cast
        }}
      >
        Remove Cast
      </button>
      <button
        className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        onClick={async () => {
          // Add your logic to like cast
        }}
      >
        Like
      </button>
      <button
        className="bg-purple-500 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        onClick={async () => {
          // Add your logic to recast
        }}
      >
        Recast
      </button>
    </div>

    {/* Cast Statistics */}
    <div className="flex items-center">
      <HeartIcon className="h-6 w-6 text-gray-700" />
      <span className="text-sm text-gray-700 mx-2">{cast.reactions.count}</span>
      <ArrowPathIcon className="h-6 w-6 text-gray-700" />
      <span className="text-sm text-gray-700 mx-2">{cast.recasts.count}</span>
    </div>
  </div>
</div>

    );
  });

  return (
    <>
      <Head>
        <title>slay⚡caster</title>
      </Head>

      <main className="flex min-h-screen flex-col bg-privy-light-blue px-4 py-6 sm:px-20 sm:py-10">
        <ToastContainer />
        <div className="flex flex-row justify-between">
        <img src="https://slaycaster.4everland.store/slaycasterlogo.png" alt="Slaycaster Logo" className="w-40 sm:w-40 md:w-48" />
          <div className="flex flex-row gap-4">
            <button
              onClick={logout}
              className="rounded-md bg-violet-200 px-4 py-2 text-sm text-violet-700 hover:text-violet-900"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <p className="my-2 text-sm text-gray-600">
            Welcome {farcasterAccount?.displayName} @{farcasterAccount?.username}
          </p>
          <p className="my-2 text-sm text-gray-600">
            Farcaster Signer: {signerPublicKey ?? 'NONE'}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          {!signerPublicKey && (
            <button
              className="rounded-md bg-violet-600 py-2 px-4 mt-4 text-sm text-white hover:bg-violet-700"
              onClick={requestFarcasterSigner}
              disabled={!!signerPublicKey}
            >
              Request Farcaster Signer
            </button>
          )}
        </div>

        <p className="mt-6 mb-2 text-sm font-bold uppercase text-gray-600">Submit a cast</p>
        <div className="flex flex-wrap gap-4 p-2">
          <input
            placeholder="My cast text!"
            className="w-full rounded-md p-2"
            type="text"
            value={castInput}
            onChange={(e) => setCastInput(e.target.value)}
          ></input>
          <button
            className="rounded-md bg-violet-600 py-2 px-4 text-sm text-white hover:bg-violet-700"
            onClick={async () => {
              const {hash} = await submitCast({
                text: castInput,
              });
              setCastInput('');
              toast(`Submitted cast. Message hash: ${hash}`);
              setTimeout(() => trigger(), 2000);
            }}
            disabled={!castInput}
          >
            Submit
          </button>
        </div>

        <p className="mt-6 mb-2 text-sm font-bold uppercase text-gray-600">My Casts</p>
        <div className="gap-4">{!isMutating && formattedCasts}</div>
        <p className="mt-6 mb-2 text-sm font-bold uppercase text-gray-600">Follow saltï</p>
        <div className="flex flex-wrap gap-4">
          <button
            className="rounded-md bg-green-600 py-2 px-4 text-sm text-white hover:bg-green"
            onClick={async () => {
              const {hash} = await followUser({fid: 5124});
              toast(`Followed user. Message hash: ${hash}`);
              setTimeout(() => trigger(), 2000);
            }}
          >
            Follow
          </button>
        </div>
      </main>
    </>
  );
}
