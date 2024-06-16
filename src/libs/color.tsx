export function GetColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 60 * Math.random()) +
    "%," +
    85 * Math.random() +
    "%)"
  );
}
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const darkenColor = (color: string, percent: number) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return `#${(
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  )
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

export const getColorPair = () => {
  const color = getRandomColor();
  const border = darkenColor(color, -20); // Darken the color by 20%
  return { color, border };
};
