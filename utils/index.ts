export function snapToGrid(
  grid: [number, number],
  pendingX: number,
  pendingY: number
): [number, number] {
  const x = Math.round(pendingX / grid[0]) * grid[0];
  const y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

// helper functions for seeding the magnet canvas.
const clean = (s: string) => s.replace(/[^a-z]/gi, "").toLowerCase();

let sentence =
  `We are a team of researchers and engineers, exploring things beyond the adjacent possible. We prototype tools and technologies that will change our craft. We identify new approaches to building healthy, productive software engineering teams.`.split(
    " "
  );

let words = sentence.map(clean).map((w) => {
  return {
    word: w,
    width: w.length * 0.5,
  };
});
