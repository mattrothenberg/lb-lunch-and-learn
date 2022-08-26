import type { NextPage } from "next";
import { CursorCanvas } from "../components/cursor-canvas";

const Home: NextPage = () => {
  return (
    <div>
      <section>
        <div className="py-8">
          <div className="container">
            <span className="uppercase tracking-wider font-bold text-xs bg-gray-800 text-offWhite rounded-full inline-flex items-center px-3 py-1">
              Step 1
            </span>
            <div className="mt-4">
              <h1 className="text-3xl font-semibold tracking-tight">
                Presence
              </h1>
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
        </div>
      </section>
    </div>
  );
};

export default Home;
