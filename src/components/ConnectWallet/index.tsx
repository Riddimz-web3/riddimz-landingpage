'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import WalletProviderWrapper from '../WalletProviderWrapper';
import '@solana/wallet-adapter-react-ui/styles.css';

// User profile interface
interface UserProfile {
  publicKey: string;
  username: string;
  avatar: string;
}

// Wallet connection component
const WalletConnectButton = () => {
  const { publicKey } = useWallet();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle profile creation/fetch and redirection on wallet connect
  useEffect(() => {
    if (publicKey) {
      const handleProfile = async () => {
        try {
          // Check if profile exists
          const response = await fetch(`/api/profile?publicKey=${publicKey.toBase58()}`);
          if (response.ok) {
            // Profile exists, redirect to stream
            router.push('/stream');
            return;
          }

          // Profile doesn't exist, create one
          const newProfile: UserProfile = {
            publicKey: publicKey.toBase58(),
            username: `User_${publicKey.toBase58().slice(0, 4)}`,
            avatar: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${publicKey.toBase58()}`,
          };

          const createResponse = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProfile),
          });

          if (createResponse.ok) {
            router.push('/stream');
          } else {
            console.error('Failed to create profile');
          }
        } catch (error) {
          console.error('Error handling profile:', error);
        }
      };
      handleProfile();
    }
  }, [publicKey, router]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <WalletMultiButton
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
      />
      {publicKey && (
        <div className="text-sm text-gray-600">
          Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
        </div>
      )}
    </div>
  );
};

// Wrap with provider
export default function WalletConnect() {
  return (
    <WalletProviderWrapper>
      <WalletConnectButton />
    </WalletProviderWrapper>
  );
}