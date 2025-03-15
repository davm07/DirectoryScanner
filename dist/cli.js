"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCLI = executeCLI;
const prompts_1 = require("@inquirer/prompts");
/**
 * The executeCLI function is used to execute the command-line interface (CLI) for the DirectoryScanner application.
 * It prompts the user to enter the path to the directory to scan and the extension to filter by. It returns an object
 * with the directory path and the extension option.
 * If the user enters an empty string for the directory path, it will throw an error message.
 * @returns An object with the directory path and the extension option.
 */
async function executeCLI() {
    const directoryPath = await (0, prompts_1.input)({
        message: "Enter the path to the directory you want to scan: (e.g. C:\\Users\\myUser\\Documents)",
        validate: (value) => {
            if (value.length === 0) {
                return "Please enter a valid directory path";
            }
            return true;
        },
    });
    const extensionOption = await (0, prompts_1.select)({
        message: "Select an extension to filter by:",
        choices: ["all", ".doc", ".docx", ".pdf", ".ppt", ".pptx", ".xls", ".xlsx", ".zip", ".txt", ".ts", ".tsx", ".js", ".html", ".jsx"],
    });
    return {
        directoryPath,
        extensionOption,
    };
}
