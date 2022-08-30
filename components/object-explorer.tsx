import { BaseUserMeta, User } from "@liveblocks/client";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { AsciiEffect } from "three-stdlib";
import {
  Presence,
  useMyPresence,
  useObject,
  useOthers,
} from "../liveblocks.config";

const AnimatedUserLabel = ({
  user,
}: {
  user?: User<Presence, BaseUserMeta>;
}) => {
  return (
    <AnimatePresence>
      {user && (
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: -20 }}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-red-800 z-0"
        >
          {user.presence?.username ?? "Unknown User"}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export function ObjectExplorer() {
  const torus = useObject("asciiTorus");
  const [_, updatePresence] = useMyPresence();
  const others = useOthers();
  const othersArray = others.toArray();

  const otherCharactersFocus = othersArray.find(
    (o) => o.presence?.focusedInput === "characters"
  );

  const otherRotationFocus = othersArray.find(
    (o) => o.presence?.focusedInput === "rotation"
  );

  const otherColorFocus = othersArray.find(
    (o) => o.presence?.focusedInput === "color"
  );

  return (
    <div className="lg:flex divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black border-2 border-black">
      <div className="aspect-[16/9] flex-1 z-10 relative min-w-0">
        <Canvas>
          <color attach="background" args={["black"]} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Torusknot rotation={torus?.get("rotation")} />
          {/* @ts-ignore */}
          <PerspectiveCamera
            makeDefault
            position={[2, 0, 1]}
            zoom={0.25}
            fov={45}
          />
          <OrbitControls enableZoom={false} />
          <AsciiRenderer
            characters={torus?.get("characters")}
            color={torus?.get("color")}
            renderIndex={1}
            invert={true}
          />
        </Canvas>
      </div>
      <div className="w-full lg:w-72 flex-shrink-0 min-w-0 p-4 space-y-4 bg-black/5 z-0 relative">
        <div className="relative">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold" htmlFor="characters">
              Characters
            </label>
            <AnimatedUserLabel user={otherCharactersFocus} />
          </div>
          <div className="mt-2 z-0">
            <input
              placeholder="Enter ascii characters"
              id="characters"
              name="characters"
              disabled={!torus || Boolean(otherCharactersFocus)}
              value={torus?.get("characters") ?? ""}
              onFocus={() =>
                updatePresence(
                  { focusedInput: "characters" },
                  { addToHistory: false }
                )
              }
              onBlur={() =>
                updatePresence({ focusedInput: null }, { addToHistory: false })
              }
              onChange={(e) => torus?.update({ characters: e.target.value })}
              maxLength={12}
              className="w-full p-1 bg-transparent border-gray-900 border-2 focus:ring-black/20 focus:outline-none focus:ring focus:border-black disabled:opacity-50"
              type="text"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold" htmlFor="rotation">
              Rotation Speed
            </label>
            <AnimatedUserLabel user={otherRotationFocus} />
          </div>
          <div className="mt-2 flex items-center space-x-3">
            <input
              disabled={!torus || Boolean(otherRotationFocus)}
              placeholder="Enter ascii characters"
              id="rotation"
              name="rotation"
              className="w-full disabled:opacity-50"
              onFocus={() =>
                updatePresence(
                  { focusedInput: "rotation" },
                  { addToHistory: false }
                )
              }
              onBlur={() =>
                updatePresence({ focusedInput: null }, { addToHistory: false })
              }
              type="range"
              step={0.1}
              min={0.1}
              value={torus?.get("rotation") ?? 0}
              onChange={(e) =>
                torus?.update({ rotation: Number(e.target.value) })
              }
              max={2}
            />
            <span className="font-mono text-sm">
              {torus?.get("rotation").toFixed(1)}
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold" htmlFor="color">
              Color
            </label>
            <AnimatedUserLabel user={otherColorFocus} />
          </div>
          <div className="mt-2">
            <input
              placeholder="Select a color"
              id="color"
              name="color"
              disabled={!torus}
              value={torus?.get("color") ?? ""}
              onChange={(e) => torus?.update({ color: e.target.value })}
              onFocus={() =>
                updatePresence(
                  { focusedInput: "color" },
                  { addToHistory: false }
                )
              }
              onBlur={() =>
                updatePresence({ focusedInput: null }, { addToHistory: false })
              }
              maxLength={12}
              className="w-full p-1 bg-transparent border-gray-900 border-2 focus:ring-black/20 focus:outline-none focus:ring focus:border-black disabled:opacity-50"
              type="color"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Torusknot({ rotation = 2 }: { rotation?: number }) {
  const ref = useRef();
  useFrame(
    (_, delta) =>
      // @ts-ignore
      (ref.current.rotation.x = ref.current.rotation.y += delta / rotation)
  );
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function AsciiRenderer({
  renderIndex = 1,
  characters = ".:-+*=%@#",
  invert,
  color = "white",
}: {
  characters?: string;
  renderIndex: number;
  invert: boolean;
  color?: string;
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
    });
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.color = color;
    effect.domElement.style.backgroundColor = "black";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, invert, color]);

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => gl.domElement.parentNode.removeChild(effect.domElement);
  }, [effect]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);

  return null;
}
