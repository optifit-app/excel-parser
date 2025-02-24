const rawColors: Record<string, string> = {
  "bleu roi": "#0053A1",
  rose: "#FFC0CB",
  violet: "#8A2BE2",
  blanc: "#FFFFFF",
  "bleu clair": "#ADD8E6",
  vert: "#008000",
  "vert fluo": "#00FF00",
  orange: "#FFA500",
};

export const formatRawColor = (color: string): string => {
  const normalizedColor = color.trim().toLowerCase();
  return rawColors[normalizedColor] || color;
};
