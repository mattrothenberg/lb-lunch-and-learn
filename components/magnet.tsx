import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import { LiveObject } from "@liveblocks/client";
import { useEffect } from "react";
import {
  Magnet,
  useHistory,
  useMyPresence,
  useOthers,
  useRoom,
} from "../liveblocks.config";
import { snapToGrid } from "utils";

export function Magnet({
  id,
  magnet,
}: {
  id: number;
  magnet: LiveObject<Magnet>;
}) {
  const [{ x, y }] = useSpring(() => ({
    x: magnet.get("x"),
    y: magnet.get("y"),
  }));

  let room = useRoom();
  let others = useOthers();
  let [_, setPresence] = useMyPresence();
  let history = useHistory();

  let isBeingDragged = others
    .toArray()
    .some((user) => user.presence?.focusedMagnet === id);

  useEffect(() => {
    if (!magnet) return;
    if (!room) return;
    return room.subscribe(magnet, () => {
      x.set(magnet.get("x"));
      y.set(magnet.get("y"));
    });
  }, [magnet, room]);

  const bind = useGesture(
    {
      onDrag: ({ offset, event }) => {
        event.stopPropagation();
        const [x, y] = snapToGrid([10, 10], offset[0], offset[1]);
        magnet.update({ x, y });
      },
      onPointerDown: () => {
        history.pause();
        setPresence({ focusedMagnet: id }, { addToHistory: true });
      },
      onPointerUp: () => {
        setPresence({ focusedMagnet: null }, { addToHistory: true });
        history.resume();
      },
    },
    {
      drag: {
        from: () => [x.get(), y.get()],
      },
    }
  );

  return (
    <animated.div
      className="pane absolute top-0 left-0 touch-none"
      style={{ x, y }}
      {...bind()}
    >
      <div
        style={{
          opacity: isBeingDragged ? 0.5 : 1,
        }}
        className="select-none cursor-grab active:cursor-grabbing magnet bg-offWhite flex-shrink-0 inline-flex border-2 items-center justify-center h-[40px] text-xl border-gray-900 overflow-hidden transition-opacity px-2 whitespace-pre"
      >
        {magnet.get("word")}
      </div>
    </animated.div>
  );
}
