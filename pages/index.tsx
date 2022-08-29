import type { NextPage } from "next";
import { CursorCanvas } from "../components/cursor-canvas";
import { HistoryCanvas } from "../components/history-canvas";
import { ObjectExplorer } from "../components/object-explorer";

const Home: NextPage = () => {
  return (
    <div className="space-y-16 py-16">
      <section>
        <div className="container">
          <span className="uppercase tracking-wider font-bold text-xs bg-gray-800 text-offWhite rounded-full inline-flex items-center px-3 py-1">
            Step 1
          </span>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold tracking-tight">Presence</h1>
            <p className="mt-2 text-xl max-w-3xl text-gray-600">
              Liveblocks provides hooks for you to read and set arbitrary
              "presence" data, such as cursor position, username, emoji
              reaction, etc...
            </p>
          </div>
          <div className="mt-8">
            <CursorCanvas />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <span className="uppercase tracking-wider font-bold text-xs bg-gray-800 text-offWhite rounded-full inline-flex items-center px-3 py-1">
            Step 2
          </span>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold tracking-tight">Storage</h1>
            <p className="mt-2 text-xl max-w-3xl text-gray-600">
              Liveblocks provides a few different storage primitives –
              LiveObject, LiveList, LiveMap – for you to use to store data.
            </p>
          </div>
          <div className="mt-8">
            <ObjectExplorer />
          </div>
        </div>
      </section>
      <div className="container">
        <div aria-hidden className="zigzag" />
      </div>
      <section>
        <div className="container">
          <span className="uppercase tracking-wider font-bold text-xs bg-gray-800 text-offWhite rounded-full inline-flex items-center px-3 py-1">
            Step 2, cont.
          </span>
          <div className="mt-4">
            <h1 className="text-3xl font-semibold tracking-tight">History</h1>
            <p className="mt-2 text-xl max-w-3xl text-gray-600">
              Liveblocks provides a dedicated API for common "history"
              operations like undo, redo.
            </p>
          </div>
          <div className="mt-8">
            <div className="aspect-video relative border-2 border-gray-900">
              <HistoryCanvas />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
