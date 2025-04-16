import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Riddimz | Join Our Karaoke Community",
  description: "Reach out to Riddimz—connect with our team, ask about karaoke, NFTs, or join the global singing vibe!",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Riddimz"
        description="Have questions or ready to sing? Connect with our team and dive into the Riddimz karaoke community today!"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
