import path from "path";
import { DirectoryScanner } from "./DirectoryScanner";
import { executeCLI } from "./cli";

/**
 * The main function is the entry point of the application. It prompts the user to enter the path to the directory to scan
 * and the extension to filter by. It then creates a DirectoryScanner object with the directory path and extension option.
 * It reads the directory, displays the directory information, and logs any errors that occur.
 */
async function main() {
    const { directoryPath, extensionOption} = await executeCLI();
    const fileExtension = extensionOption as string;
    const rootDirectory = path.resolve(directoryPath);
    const directoryScanner = new DirectoryScanner(rootDirectory, 0, fileExtension);
    await directoryScanner.readDirectory();
    directoryScanner.displayDirectoryInfo();
}

main();
