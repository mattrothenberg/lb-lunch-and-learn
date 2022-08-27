import type { NextPage } from "next";
import { CursorCanvas } from "../components/cursor-canvas";
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
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 border-2 border-gray-900">
                <ObjectExplorer />
              </div>
              <div className="col-span-6 border-2 border-gray-900"></div>
              <div className="col-span-6 border-2 border-gray-900"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
