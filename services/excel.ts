import * as XLSX from "xlsx";
import { promises as fs } from "fs";
import { Team } from "../types";

type Tournaments = {
  [key: string]: Team[];
};

export const generateExcel = async (
  tournaments: Tournaments,
  filename: string,
): Promise<void> => {
  const workbook = XLSX.utils.book_new();

  Object.entries(tournaments).forEach(([tournamentName, teams]) => {
    const sheetData = [
      ["Equipe", "Groupe", "Couleur"],
      ...teams.map((team) => [team.name, team.group, team.color]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, tournamentName);
  });

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });

  await fs.writeFile(`./results/${filename}.xlsx`, excelBuffer);
  console.log("✅ Fichier Excel généré : ./results/", filename, '.xlsx');
};
