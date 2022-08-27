import { createClient, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_test_hECQgpOwG4doH2ybeoL-xrqf",
});

export type Presence = {
  username?: string;
  focusedInput: string | null;
  cursor: {
    x: number;
    y: number;
  } | null;
};

export type AsciiTorus = {
  rotation: number;
  characters: string;
  color: string;
};

type Storage = {
  asciiTorus: LiveObject<AsciiTorus>;
};

export const { RoomProvider, useMyPresence, useOthers, useSelf, useObject } =
  createRoomContext<Presence, Storage>(client);
