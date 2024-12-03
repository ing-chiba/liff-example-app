import type { Profile } from "@liff/get-profile";
import type { Liff } from "@line/liff";
import liff from "@line/liff";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    liff
      .init({
        liffId: process.env.LIFF_ID as string,
        withLoginOnExternalBrowser: true,
      })
      .then(() => {
        console.log("LIFF init succeeded.");
        setLiffObject(liff);
        liff
          .getProfile()
          .then((profile) => {
            console.log("get profile");
            setProfile(profile);
          })
          .catch((error: Error) => {
            console.log("get profile failed");
            setError(error.toString());
          });
      })
      .catch((error: Error) => {
        console.log("LIFF init failed.");
        setError(error.toString());
      });
  }, []);

  pageProps.liff = liffObject;
  pageProps.error = error;
  pageProps.profile = profile;
  return <Component {...pageProps} />;
}

export default MyApp;
