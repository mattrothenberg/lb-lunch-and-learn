import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_test_xa7TETBaGCfBtwwpimPz4DCf",
});

export const { RoomProvider } = createRoomContext(client);
