'use client';

import { useEffect, useState, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/navigation';
import { Howl } from 'howler';
import WalletProviderWrapper from '../../components/WalletProviderWrapper';

interface UserProfile {
  publicKey: string;
  username: string;
  avatar: string;
}

interface Lyric {
  time: number; // Time in seconds
  text: string;
}

interface Song {
  id: string;
  name: string;
  artist: string;
  description: string;
  album: string;
  audioUrl: string;
  lyrics: Lyric[];
}

// Sample music list with real audio URLs and lyrics
const musicList: Song[] = [
  {
    id: '1',
    name: 'Jazz Groove',
    artist: 'Sample Band',
    description: 'A smooth jazz track for relaxing evenings.',
    album: 'Chill Vibes',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: [
      { time: 5, text: 'Feel the rhythm, let it flow,' },
      { time: 10, text: 'Through the night, we’ll take it slow.' },
      { time: 15, text: 'Jazz in the air, hearts aglow,' },
      { time: 20, text: 'Move with the beat, let it show.' },
    ],
  },
  {
    id: '2',
    name: 'Electronic Pulse',
    artist: 'Synth Wave',
    description: 'An upbeat electronic track for dancing.',
    album: 'Neon Nights',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    lyrics: [
      { time: 3, text: 'Lights flash, the night’s alive,' },
      { time: 8, text: 'Feel the pulse, we’re gonna thrive.' },
      { time: 13, text: 'Bass drops, we take the dive,' },
      { time: 18, text: 'Electronic dreams, we survive.' },
    ],
  },
  {
    id: '3',
    name: 'Acoustic Breeze',
    artist: 'Folk Tunes',
    description: 'A gentle acoustic melody for calm moments.',
    album: 'Open Fields',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    lyrics: [
      { time: 4, text: 'Soft breeze, through the trees,' },
      { time: 9, text: 'Whispering tales with such ease.' },
      { time: 14, text: 'Strum the chords, feel the peace,' },
      { time: 19, text: 'In this moment, time will cease.' },
    ],
  },
];

function StreamPage() {
  const { publicKey, connected, wallet } = useWallet();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [walletInitialized, setWalletInitialized] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef<Howl | null>(null);

  // Wait for wallet initialization
  useEffect(() => {
    if (wallet) {
      setWalletInitialized(true);
    }
  }, [wallet]);

  // Fetch user profile when connected
  useEffect(() => {
    if (!walletInitialized) return;

    if (!connected || !publicKey) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile?publicKey=${publicKey.toBase58()}`);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [walletInitialized, connected, publicKey]);

  // Redirect to landing if profile fetch fails after connection
  useEffect(() => {
    if (walletInitialized && connected && !loading && !profile) {
      router.push('/');
    }
  }, [walletInitialized, connected, loading, profile, router]);

  // Handle music playback
  useEffect(() => {
    if (currentSong) {
      soundRef.current = new Howl({
        src: [currentSong.audioUrl],
        html5: true,
        onplay: () => setIsPlaying(true),
        onpause: () => setIsPlaying(false),
        onend: () => {
          setIsPlaying(false);
          setCurrentTime(0);
          playNextSong();
        },
        onload: () => setDuration(soundRef.current?.duration() || 0),
      });

      return () => {
        soundRef.current?.unload();
      };
    }
  }, [currentSong]);

  // Update current time for lyrics
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && soundRef.current) {
      interval = setInterval(() => {
        setCurrentTime(soundRef.current?.seek() || 0);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id && soundRef.current) {
      if (isPlaying) {
        soundRef.current.pause();
      } else {
        soundRef.current.play();
      }
    } else {
      if (soundRef.current) {
        soundRef.current.stop();
      }
      setCurrentSong(song);
      setCurrentTime(0);
    }
  };

  const playNextSong = () => {
    if (!currentSong) return;
    const currentIndex = musicList.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % musicList.length;
    setCurrentSong(musicList[nextIndex]);
    setCurrentTime(0);
  };

  const playPreviousSong = () => {
    if (!currentSong) return;
    const currentIndex = musicList.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + musicList.length) % musicList.length;
    setCurrentSong(musicList[prevIndex]);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (soundRef.current) {
      soundRef.current.seek(time);
    }
  };

  if (!walletInitialized || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-900 to-black text-white">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!connected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-red-900 to-black text-white">
        <p className="text-lg">Please connect your wallet to access the streaming page.</p>
        <WalletMultiButton
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-900 to-black text-white">
        Profile not found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-red-900 to-black text-white py-35 px-4">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold tracking-tight"></h1>
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-red-500"
          />
          <span className="text-lg font-medium">{profile.username}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Music Streaming Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Music Streaming</h2>
          <div className="grid grid-cols-1 gap-4">
            {musicList.map((song) => (
              <div
                key={song.id}
                className="bg-black/50 backdrop-blur-md p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-red-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-600 rounded-md flex items-center justify-center">
                    <span className="text-white text-2xl">🎵</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{song.name}</h3>
                    <p className="text-sm text-gray-300">{song.artist} • {song.album}</p>
                    <p className="text-sm text-gray-400 mt-1">{song.description}</p>
                  </div>
                  <button
                    onClick={() => playSong(song)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
                  >
                    {currentSong?.id === song.id && isPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Music Player */}
          {currentSong && (
            <div className="bg-black/70 backdrop-blur-md p-4 rounded-lg shadow-lg border border-red-500 mt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl">🎵</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">{currentSong.name}</h3>
                  <p className="text-sm text-gray-300">{currentSong.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={playPreviousSong}
                  className="text-red-500 hover:text-red-400"
                >
                  ⏮
                </button>
                <button
                  onClick={() => playSong(currentSong)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={playNextSong}
                  className="text-red-500 hover:text-red-400"
                >
                  ⏭
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-red-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-300">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Karaoke Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Karaoke Lounge</h2>
          <div className="bg-black/50 backdrop-blur-md p-6 rounded-lg shadow-lg border border-red-500 flex flex-col items-center justify-center h-64">
            {currentSong && isPlaying ? (
              <div className="text-center">
                {currentSong.lyrics.map((lyric, index) => (
                  <p
                    key={index}
                    className={`text-lg transition-colors duration-300 ${
                      Math.abs(currentTime - lyric.time) < 1
                        ? 'text-red-500 font-bold'
                        : 'text-gray-300'
                    }`}
                  >
                    {lyric.text}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-300 mb-4">Play a song to preview lyrics...</p>
            )}
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300 mt-4">
              Start Karaoke
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper to format time (mm:ss)
function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function StreamPageWrapper() {
  return (
    <WalletProviderWrapper>
      <StreamPage />
    </WalletProviderWrapper>
  );
}