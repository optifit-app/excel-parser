import { getFileContent, getFileName } from "./services/cli";
import { parseTo } from "./services/parser";
import { Team } from "./types";
import { generateExcel } from "./services/excel";

enum constants {
  TOURNAMENT_NAME_PARENT_COLUMN = "Lieu GDF",
  CSV_SEPARATOR = ";",
}

const main = async (): Promise<void> => {
  const fileName = await getFileName();
  const csvContent = await getFileContent();

  const tournaments = parseTo<Team[]>(
    constants.TOURNAMENT_NAME_PARENT_COLUMN,
    csvContent,
    constants.CSV_SEPARATOR,
  );

  await generateExcel(tournaments, fileName);
};

void main();
