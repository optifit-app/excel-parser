import {formatRawColor} from "./color";

export const parseTo = <T>(parentColumn: string, csv: string): T => {
  const [headerLine, ...rows] = csv.trim().split("\n");
  const columns = headerLine.split(";").map(col => col.trim());

  const parentColumnIndex = columns.indexOf(parentColumn);
  if (parentColumnIndex === -1) {
    throw new Error(`Column "${parentColumn}" not found in CSV`);
  }

  const nameIndex = columns.indexOf("Equipe");
  const colorIndex = columns.indexOf("Couleur");
  const groupIndex = columns.indexOf("Groupe");

  if (nameIndex === -1 || colorIndex === -1 || groupIndex === -1) {
    throw new Error(`One or more required columns not found in CSV`);
  }

  const result: Record<string, { name: string; color: string; group: string }[]> = {};

  for (const row of rows) {
    const values = row.split(";").map(val => val.trim());
    const parentValue = values[parentColumnIndex];

    if (!parentValue) continue;

    const item = {
      name: values[nameIndex],
      color: formatRawColor(values[colorIndex]),
      group: values[groupIndex],
    };

    if (!result[parentValue]) {
      result[parentValue] = [];
    }

    result[parentValue].push(item);
  }

  return result as T;
};
