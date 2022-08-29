import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { useDebounce } from "use-debounce";
import { useMyPresence, useOthers } from "../liveblocks.config";
import Cursor from "./cursor";

export const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function CursorCanvas() {
  const others = useOthers();
  const [username, setUsername] = useState("");
  const [presence, updateMyPresence] = useMyPresence();
  const [debouncedUsername] = useDebounce(username, 1000);

  useUpdateEffect(() => {
    updateMyPresence({ username: debouncedUsername });
  }, [debouncedUsername]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="relative w-72 inline-block">
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-2 py-1 pr-4 bg-transparent border-gray-900 border-2 focus:ring-black/20 focus:outline-none focus:ring focus:border-black w-full"
            placeholder="Enter your GitHub username"
            type="text"
          />
          {debouncedUsername && (
            <div className="absolute right-2 top-0 bottom-0 inline-flex ml-auto items-center justify-center">
              <img
                alt={debouncedUsername}
                className="w-6 h-6 rounded-full border-2 border-black"
                src={`https://github.com/${debouncedUsername}.png`}
              />
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold"># of Other Users</p>
          <p className="text-right text-lg font-mono">{others.count}</p>
        </div>
      </div>
      <div
        className="border-gray-900 border-2 border-dashed p-4 h-[500px] bg-black/5 relative mt-4 group"
        onPointerMove={(event) => {
          event.preventDefault();
          let bounds = (event.target as HTMLDivElement).getBoundingClientRect();
          let x = event.clientX - bounds.left;
          let y = event.clientY - bounds.top;

          updateMyPresence({
            cursor: {
              x: Math.round(x),
              y: Math.round(y),
            },
          });
        }}
        onPointerLeave={() => {
          updateMyPresence({
            cursor: null,
          });
        }}
      >
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
          <p className="text-gray-400 text-3xl transform -rotate-6">
            {presence.cursor
              ? `${presence.cursor.x}x${presence.cursor.y}`
              : `Move your mouse around this box!`}
          </p>
        </div>
        {others.map(({ connectionId, presence }) => {
          if (presence == null || !presence.cursor) {
            return null;
          }

          return (
            <Cursor
              key={connectionId}
              color={COLORS[connectionId % COLORS.length]}
              username={presence.username}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })}
      </div>
    </div>
  );
}
