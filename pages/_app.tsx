import type { AppProps } from "next/app";
import "../styles/globals.css";

import { RoomProvider } from "../liveblocks.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RoomProvider id="gh-next-lunch-and-learn">
      <Component {...pageProps} />
    </RoomProvider>
  );
}

export default MyApp;
