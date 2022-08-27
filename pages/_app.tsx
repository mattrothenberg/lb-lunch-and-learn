import type { AppProps } from "next/app";
import "../styles/globals.css";

import { RoomProvider } from "../liveblocks.config";
import { LiveObject } from "@liveblocks/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RoomProvider
      initialStorage={{
        asciiTorus: new LiveObject({
          characters: " .:-+*=%@#",
          rotation: 1,
          color: "#FFFFFF",
        }),
      }}
      id="gh-next-lunch-and-learn"
    >
      <Component {...pageProps} />
    </RoomProvider>
  );
}

export default MyApp;
