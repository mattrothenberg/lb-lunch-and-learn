import { createEmotionCache, MantineProvider } from "@mantine/core";
import type { AppProps } from "next/app";
import "../styles/globals.css";

import { RoomProvider } from "../liveblocks.config";

export const tailwindCache = createEmotionCache({
  key: "mantine-tw",
  prepend: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider emotionCache={tailwindCache}>
      <RoomProvider id="gh-next-lunch-and-learn">
        <Component {...pageProps} />
      </RoomProvider>
    </MantineProvider>
  );
}

export default MyApp;
