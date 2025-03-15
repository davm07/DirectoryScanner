"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const DirectoryScanner_1 = require("./DirectoryScanner");
const cli_1 = require("./cli");
/**
 * The main function is the entry point of the application. It prompts the user to enter the path to the directory to scan
 * and the extension to filter by. It then creates a DirectoryScanner object with the directory path and extension option.
 * It reads the directory, displays the directory information, and logs any errors that occur.
 */
async function main() {
    const { directoryPath, extensionOption } = await (0, cli_1.executeCLI)();
    const fileExtension = extensionOption;
    const rootDirectory = path_1.default.resolve(directoryPath);
    const directoryScanner = new DirectoryScanner_1.DirectoryScanner(rootDirectory, 0, fileExtension);
    await directoryScanner.readDirectory();
    directoryScanner.displayDirectoryInfo();
}
main();
