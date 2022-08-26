import Cursor from "./cursor";
import { useMyPresence, useOthers, useSelf } from "../liveblocks.config";

export const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

export function CursorCanvas() {
  const others = useOthers();
  const [_, updateMyPresence] = useMyPresence();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formEl = e.target as HTMLFormElement;
    let formData = new FormData(formEl);
    let username = formData.get("username") as string;

    updateMyPresence({
      username,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <input
              name="username"
              className="p-1 bg-transparent border-gray-900 border-2 focus:ring-black/20 focus:outline-none focus:ring focus:border-black w-64"
              placeholder="Enter your GitHub username"
              type="text"
            />
            <button
              className="bg-gray-900 text-offWhite px-4 font-semibold tracking-tight"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
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
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity">
          <p className="text-gray-400 text-3xl transform -rotate-6">
            Move your mouse around this box!
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
