import {getFileContent} from "./services/cli";
import {parseTo} from "./services/parser";
import {Tournament} from "./types";

const main = async (): Promise<void> => {
  const csvContent = await getFileContent();
  const tournaments = parseTo<Tournament>('Lieu GDF', csvContent);

  console.log(tournaments);
};

void main();
