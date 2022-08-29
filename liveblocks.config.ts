import { createClient, LiveList, LiveObject } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_test_hECQgpOwG4doH2ybeoL-xrqf",
});

export type Presence = {
  username?: string;
  focusedInput: string | null;
  focusedMagnet: number | null;
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

export type Magnet = {
  word: string;
  x: number;
  y: number;
};

type Storage = {
  asciiTorus: LiveObject<AsciiTorus>;
  magnets: LiveList<LiveObject<Magnet>>;
};

export const {
  RoomProvider,
  useMyPresence,
  useOthers,
  useSelf,
  useObject,
  useCanUndo,
  useCanRedo,
  useHistory,
  useRoom,
  useList,
} = createRoomContext<Presence, Storage>(client);
