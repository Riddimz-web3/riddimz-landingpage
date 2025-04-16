import { Feature } from "@/types/feature";

const featuresData: Feature[] = [
  {
    id: 1,
    icon: (
      <svg width="40" height="41" viewBox="0 0 40 41" className="fill-current">
        <path
          opacity="0.5"
          d="M20 10C22.2091 10 24 11.7909 24 14V20C24 22.2091 22.2091 24 20 24C17.7909 24 16 22.2091 16 20V14C16 11.7909 17.7909 10 20 10Z"
        />
        <path
          d="M20 0C15.5817 0 12 3.58172 12 8V20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20V8C28 3.58172 24.4183 0 20 0ZM10 28V32C10 34.2091 11.7909 36 14 36H26C28.2091 36 30 34.2091 30 32V28H10Z"
        />
      </svg>
    ),
    title: "Built for Karaoke Lovers",
    paragraph:
      "Riddimz brings karaoke to the future with a platform where anyone can sing, share, and shine. Record your performances and connect with singers worldwide, no matter your skill level.",
  },
  {
    id: 2,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M20 28C24.4183 28 28 24.4183 28 20C28 15.5817 24.4183 12 20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28Z"
        />
        <path
          d="M20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM20 32C13.3726 32 8 26.6274 8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20C32 26.6274 26.6274 32 20 32Z"
        />
      </svg>
    ),
    title: "Own Your Performances",
    paragraph:
      "Turn your karaoke sessions into unique NFTs. Mint your recordings as digital assets you can own, trade, or sell, giving you full control over your creative work.",
  },
  {
    id: 3,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M10 10L12 14L16 15L12 16L10 20L8 16L4 15L8 14L10 10ZM30 10L32 14L36 15L32 16L30 20L28 16L24 15L28 14L30 10Z"
        />
        <path
          d="M20 12C24.4183 12 28 15.5817 28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20C12 15.5817 15.5817 12 20 12ZM20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C26.6274 32 32 26.6274 32 20C32 13.3726 26.6274 8 20 8Z"
        />
      </svg>
    ),
    title: "Sparkle with AR Filters",
    paragraph:
      "Make every performance pop with augmented reality filters. Transform into characters, add effects, or change your background to create unforgettable karaoke moments.",
  },
  {
    id: 4,
    icon: (
      <svg width="40" height="42" viewBox="0 0 40 42" className="fill-current">
        <path
          opacity="0.5"
          d="M20 10C24.4183 10 28 13.5817 28 18C28 22.4183 24.4183 26 20 26C15.5817 26 12 22.4183 12 18C12 13.5817 15.5817 10 20 10Z"
        />
        <path
          d="M20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 42 20 42C31.0457 42 40 31.0457 40 20C40 8.9543 31.0457 0 20 0ZM20 34C14.4772 34 10 29.5228 10 24V20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20V24C30 29.5228 25.5228 34 20 34Z"
        />
      </svg>
    ),
    title: "Join the Global Stage",
    paragraph:
      "Compete on leaderboards, share Stories, or meet up via Karaoke Map. Riddimz connects you with singers everywhere, turning karaoke into a vibrant community.",
  },
  {
    id: 5,
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" className="fill-current">
        <path
          opacity="0.5"
          d="M28 12C28 9.79086 26.2091 8 24 8C21.7909 8 20 9.79086 20 12C20 14.2091 21.7909 16 24 16C26.2091 16 28 14.2091 28 12Z"
        />
        <path
          d="M16 24C16 21.7909 14.2091 20 12 20C9.79086 20 8 21.7909 8 24C8 26.2091 9.79086 28 12 28C14.2091 28 16 26.2091 16 24ZM24 16C26.2091 16 28 14.2091 28 12C28 9.79086 26.2091 8 24 8C21.7909 8 20 9.79086 20 12V16H16C13.7909 16 12 17.7909 12 20H8C5.79086 20 4 21.7909 4 24C4 26.2091 5.79086 28 8 28H12V32C12 34.2091 13.7909 36 16 36C18.2091 36 20 34.2091 20 32V28H24C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20H20V16H24Z"
        />
      </svg>
    ),
    title: "Powered by Blockchain",
    paragraph:
      "Enjoy secure, transparent ownership with blockchain technology. Your performances and digital assets are safely stored and managed, giving you peace of mind.",
  },
  {
    id: 6,
    icon: (
      <svg width="40" height="45" viewBox="0 0 40 45" className="fill-current">
        <path
          opacity="0.5"
          d="M28 16C28 12.6863 25.3137 10 22 10C18.6863 10 16 12.6863 16 16C16 19.3137 18.6863 22 22 22C25.3137 22 28 19.3137 28 16Z"
        />
        <path
          d="M20 0C17.7909 0 16 1.79086 16 4V8H12C9.79086 8 8 9.79086 8 12V16H4C2.20914 16 0 17.7909 0 20V24C0 26.2091 2.20914 28 4 28H8V32C8 34.2091 9.79086 36 12 36H16V40C16 42.2091 17.7909 44 20 44C22.2091 44 24 42.2091 24 40V36H28C30.2091 36 32 34.2091 32 32V28H36C37.7909 28 39 26.2091 39 24V20C39 17.7909 37.7909 16 36 16H32V12C32 9.79086 30.2091 8 28 8H24V4C24 1.79086 22.2091 0 20 0Z"
        />
      </svg>
    ),
    title: "Discover and Compete",
    paragraph:
      "Explore trending performances with Spotlight, chat with friends via Messenger, or climb the ranks. Riddimz makes every song a chance to stand out and connect.",
  },
];

export default featuresData;