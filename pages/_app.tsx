import type { Profile } from "@liff/get-profile";
import type { Liff } from "@line/liff";
import liff from "@line/liff";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    liff
      .init({
        liffId: process.env.LIFF_ID!,
        // withLoginOnExternalBrowser: true,
      })
      .then(() => {
        console.log("LIFF init succeeded.");
        setLiffObject(liff);
      })
      .catch((error: Error) => {
        console.log("LIFF init failed.");
        setLiffError(error.toString());
      });
    liff
      .getProfile()
      .then((profile) => {
        console.log("get profile");
        setProfile(profile);
      })
      .catch((error: Error) => {
        console.log("get profile failed");
        setLiffError(error.toString());
      });
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  pageProps.profile = profile;
  return <Component {...pageProps} />;
}

export default MyApp;
