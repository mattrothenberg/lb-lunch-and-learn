import { LiveObject } from "@liveblocks/client";
import useMeasure from "react-use-measure";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated, to } from "react-spring";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useList,
} from "../liveblocks.config";
import { Magnet } from "./magnet";
import { useCallback } from "react";

export function HistoryCanvas() {
  const magnets = useList("magnets");
  const [ref, bounds] = useMeasure();

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const bind = useDrag(
    ({ offset }) => {
      api.set({ x: offset[0], y: offset[1] });
    },
    {
      from: () => [x.get(), y.get()],
    }
  );

  let canUndo = useCanUndo();
  let canRedo = useCanRedo();
  let history = useHistory();

  const handleAdd = useCallback(() => {
    if (typeof window === "undefined") return;
    let newWord = window.prompt("What is the word?");
    if (!newWord) {
      console.error("No word provided");
      return;
    }

    let xOffset = x.get();
    let yOffset = y.get();

    let adjustedX = bounds.width / 2 - xOffset;
    let adjustedY = bounds.height / 2 - yOffset;

    magnets?.push(
      new LiveObject({
        word: newWord,
        x: adjustedX,
        y: adjustedY,
      })
    );
  }, [bounds]);

  return (
    <animated.div
      {...bind()}
      className="w-full h-full relative overflow-hidden touch-none"
    >
      <div className="absolute top-4 left-4 bg-gray-900 cursor-not-allowed py-1 px-2 text-sm text-offWhite flex item-center rounded-xl z-50">
        <animated.div>{x.to((x) => Math.round(x))}</animated.div>
        <span>x</span>
        <animated.div>{y.to((y) => Math.round(y))}</animated.div>
      </div>
      <div className="absolute top-4 right-4 flex item-center space-x-2 z-50">
        <button
          disabled={!canUndo}
          onClick={history.undo}
          className="rounded-xl bg-gray-900 py-1 px-2 text-sm text-offWhite disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Undo
        </button>
        <button
          disabled={!canRedo}
          onClick={history.redo}
          className="rounded-xl bg-gray-900 py-1 px-2 text-sm text-offWhite disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Redo
        </button>
        <button
          onClick={handleAdd}
          className="rounded-xl bg-gray-900 py-1 px-2 text-sm text-offWhite disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Word
        </button>
      </div>

      <animated.div
        ref={ref}
        style={{
          backgroundPosition: to([x, y], (x, y) => `${x}px ${y}px`),
        }}
        className="bg-grid absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0"
      ></animated.div>
      <animated.div
        data-container
        className="absolute touch-none"
        style={{ x, y }}
      >
        {magnets?.map((magnet, index) => {
          return <Magnet key={index} id={index} magnet={magnet} />;
        })}
      </animated.div>
    </animated.div>
  );
}
