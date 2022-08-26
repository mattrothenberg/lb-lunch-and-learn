import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_test_hECQgpOwG4doH2ybeoL-xrqf",
});

type Presence = {
  username?: string;
  cursor: {
    x: number;
    y: number;
  } | null;
};

export const { RoomProvider, useMyPresence, useOthers, useSelf } =
  createRoomContext<Presence>(client);
