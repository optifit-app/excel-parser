import { createInterface } from "readline";
import { promises as fs } from "fs";
import iconv from "iconv-lite";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getFileContent = async (): Promise<string> =>
  new Promise((resolve) => {
    rl.question("Chemin du fichier csv : ", async (filePath: string) => {
      rl.close();

      try {
        const cleanedPath = filePath.trim();
        const fileBuffer = await fs.readFile(cleanedPath);
        let data = fileBuffer.toString("utf-8");

        if (data.includes("�")) {
          data = iconv.decode(fileBuffer, "ISO-8859-1");
        }

        resolve(data);
      } catch (error) {
        console.error("Error reading file:", error);
        resolve("");
      }
    });
  });

export const getFileName = async (): Promise<string> =>
  new Promise((resolve) => {
    rl.question("Catégorie (p. ex 'Jun. E') : ", async (name: string) =>
      resolve(name),
    );
  });
