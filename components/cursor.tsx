import { motion } from "framer-motion";

type CursorProps = {
  color: string;
  x: number;
  y: number;
  username?: string;
};

export default function Cursor({ color, x, y, username }: CursorProps) {
  return (
    <motion.div
      className="flex absolute top-0 left-0 items-center"
      initial={{ x, y }}
      animate={{ x, y }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.8,
        stiffness: 350,
      }}
    >
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={color}
        />
      </svg>
      {username && (
        <div className="w-6 h-6 rounded-full bg-gray-50 flex-shrink-0 relative bottom-2">
          <img
            className="w-6 h-6 rounded-full"
            src={`https://github.com/${username}.png`}
            alt={username}
          />
        </div>
      )}
    </motion.div>
  );
}
