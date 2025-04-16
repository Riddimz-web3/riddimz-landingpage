import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Riddimz | Karaoke Meets Web3",
  description: "Discover how Riddimz blends karaoke with blockchain—sing, mint NFTs, and connect with a global music community.",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Riddimz"
        description="Riddimz reimagines karaoke with Web3 flair. Sing your heart out, own your performances as NFTs, and vibe with creators worldwide."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};
export default AboutPage;
