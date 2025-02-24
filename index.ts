import { getFileContent } from "./services/cli";
import { parseTo } from "./services/parser";
import { Tournament } from "./types";

enum constants {
  TOURNAMENT_NAME_PARENT_COLUMN = "Lieu GDF",
  CSV_SEPARATOR = ";",
}

const main = async (): Promise<void> => {
  const csvContent = await getFileContent();
  const tournaments = parseTo<Tournament[]>(
    constants.TOURNAMENT_NAME_PARENT_COLUMN,
    csvContent,
    constants.CSV_SEPARATOR,
  );
};

void main();
