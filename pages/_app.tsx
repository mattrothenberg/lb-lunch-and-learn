import type { AppProps } from "next/app";
import "../styles/globals.css";

import { RoomProvider } from "../liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import magnets from "../magnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RoomProvider
      initialStorage={{
        asciiTorus: new LiveObject({
          characters: " .:-+*=%@#",
          rotation: 1,
          color: "#FFFFFF",
        }),
        magnets: new LiveList(
          magnets.map((m) => {
            return new LiveObject({
              word: m.word,
              x: m.bbox.x,
              y: m.bbox.y,
            });
          })
        ),
      }}
      id="gh-next-lunch-and-learn"
    >
      <Component {...pageProps} />
    </RoomProvider>
  );
}

export default MyApp;
