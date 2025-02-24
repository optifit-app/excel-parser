import { createInterface } from 'readline';
import { promises as fs } from 'fs';
import iconv from 'iconv-lite';

export const getFileContent = async (): Promise<string> => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question('Enter file path: ', async (filePath: string) => {
      rl.close();

      try {
        const cleanedPath = filePath.trim();
        const fileBuffer = await fs.readFile(cleanedPath);
        let data = fileBuffer.toString('utf-8');

        if (data.includes('�')) {
          data = iconv.decode(fileBuffer, 'ISO-8859-1');
        }

        resolve(data);
      } catch (error) {
        console.error('Error reading file:', error);
        resolve('');
      }
    });
  });
};
