import type { Profile } from "@liff/get-profile";
import type { Liff } from "@line/liff";
import Head from "next/head";

export default function Home({
  liff,
  liffError,
  profile,
}: {
  liff: Liff | null;
  liffError: string | null;
  profile: Profile | null;
}) {
  /** You can access to liff and liffError object through the props.
   *  const { liff, liffError } = props;
   *  console.log(liff.getVersion());
   *
   *  Learn more about LIFF API documentation (https://developers.line.biz/en/reference/liff)
   **/
  return (
    <div>
      <Head>
        <title>LIFF Starter</title>
      </Head>
      <div className="home">
        <p>
          エラー:
          {liffError}
        </p>
        <p>
          氏名:
          {profile?.displayName ?? "取得に失敗しました"}
        </p>
      </div>
    </div>
  );
}
