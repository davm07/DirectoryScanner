import { DirectoryInfo } from "./DirectoryInfo"; // Import the DirectoryInfo interface
import fs from "fs/promises";
import path from "path";
import { FileInfo } from "./FileInfo"; // Import the FileInfo interface

/**
 * DirectoryScanner class that reads and displays information about directories and files.
 * It can be used to scan a directory and its subdirectories for files with a specified extension.
 * @property _directoryPath The path to the directory to scan.
 * @property _depthLevel The depth level of the directory to scan.
 * @property _fileExtension The file extension to filter by.
 * @property _directoryInfo The DirectoryInfo object that contains information about the
 * directory and its subdirectories.
 */
export class DirectoryScanner {
    private _directoryPath: string;
    private _depthLevel: number;
    private _fileExtension: string | null;
    private _directoryInfo: DirectoryInfo | null = null;

    /**
     * The constructor initializes the DirectoryScanner class with the specified directory
     * path, depth level, and file extension.
     * @param directoryPath  The path to the directory to scan.
     * @param depthLevel  The depth level of the directory to scan.
     * @param fileExtension  The file extension to filter by. Default is "all".
     */
    constructor(directoryPath: string, depthLevel: number = 0, fileExtension: string = "all") {
        this._directoryPath = directoryPath;
        this._depthLevel = depthLevel;
        this._fileExtension = fileExtension;
    }

    /**
     * Validates the directory path and returns true if it is a valid directory, false otherwise.
     * This method checks if the directory exists and if it is a directory using fs.stat. It also
     * checks if the directory is readable. If the directory is not valid, it logs an error message.
     * @param directoryPath  The path to be validated.
     * @returns True if the directory is valid, false otherwise.
     */
    private async validateDirectoryPath(directoryPath: string): Promise<boolean> {
        try {
            const stats = await fs.stat(directoryPath);
            // If the directory does not exist, log an error message and return false
            if (!stats.isDirectory()) {
                console.error(`❌ Error: ${directoryPath} is not a directory`);
                return false;
            }
            return true;
        } catch (error) {
            // If the directory is not readable, log an error message and return false
            console.error(`❌ Error accessing directory: ${directoryPath}`);
            return false;
        }
    }

    /**
     * The readDirectory method inspects the specified directory, verifies if is valid,
     * and then recursively reads the files and subdirectories within it. The informatio about the files
     * and subdirectories is stored in an object of type DirectoryInfo. Also, if the file extension is
     * specified, it filters the files by extension and will add them to the DirectoryInfo object.
     * @param directoryPath
     * @param depthLevel
     * @param currentDirectoryInfo The current DirectoryInfo object that will be updated with the information
     * about the directory and its subdirectories.
     * @returns there is no return value, the DirectoryInfo object is updated with the information about
     * the directory and its subdirectories.
     */
    public async readDirectory(
        directoryPath: string = this._directoryPath,
        depthLevel: number = this._depthLevel,
        currentDirectoryInfo: DirectoryInfo | null = null
    ): Promise<void> {
        // Validate the directory path, if it is valid, read the files and subdirectories
        const isValidDirectory = await this.validateDirectoryPath(directoryPath);
        if (!isValidDirectory) return;

        try {
            const files = await fs.readdir(directoryPath);

            // If depthLevel is 0, create a new DirectoryInfo object and set it as the currentDirectoryInfo
            if (depthLevel === 0) {
                this._directoryInfo = {
                    name: path.basename(directoryPath),
                    Files: [],
                    Directories: [],
                    hasFilesWithExtension: false,
                }
                currentDirectoryInfo = this._directoryInfo;
            }

            // Iterate over the files in the directory
            for (const file of files) {
                const newPath = path.join(directoryPath, file);
                const stats = await fs.stat(newPath);
                // If the file is a directory, create a new DirectoryInfo object and add it to the currentDirectoryInfo
                // Also, recursively read the files and subdirectories within the directory
                if (stats.isDirectory()) {
                    const newDirectory: DirectoryInfo = {
                        name: file,
                        Files: [],
                        Directories: [],
                        hasFilesWithExtension: false,
                    }
                    currentDirectoryInfo?.Directories?.push(newDirectory);
                    await this.readDirectory(newPath, depthLevel + 1, newDirectory);
                } else {
                    // Get the file extension of the current file
                    const fileExtension = path.extname(file);

                    // If the file extension is not specified or is "all", or if the file extension matches the specified extension,
                    // add the file to the currentDirectoryInfo
                    if (this._fileExtension && this._fileExtension !== "all" && fileExtension !== this._fileExtension) {
                        continue;
                    };

                    const newFile: FileInfo = {
                        name: file,
                        path: newPath,
                        size: stats.size,
                    }
                    currentDirectoryInfo?.Files?.push(newFile)
                    if (currentDirectoryInfo){
                        currentDirectoryInfo.hasFilesWithExtension = true;
                    }
                }
            }
        } catch (error) {
            console.error(`❌ Error reading directory: ${directoryPath}`);
        }

    }

    /**
     * Displays the file information in the console.
     * @param fileInfo The FileInfo object to display.
     * @param depthLevel The depth level of the directory being displayed. It is used to show the indentation before each file.
     */
    private displayFileInfo(fileInfo: FileInfo, depthLevel: number): void
    {
        const indent = " ".repeat(depthLevel * 2);
        console.log(`${indent}📄 ${fileInfo.name} ~ ${fileInfo.size} bytes`);
    }

    /**
     * Displays the directory information in the console. It recursively calls itself to display the subdirectories.
     * @param depthLevel The depth level of the directory being displayed. It is used to show the indentation before each directory.
     * @param currentDirectoryInfo The current DirectoryInfo object to display. It is used to determine if there are no
     * files with the specified extension.
     * @returns There is no return value, the directory information is displayed in the console.
     */
    public displayDirectoryInfo(depthLevel: number = 0, currentDirectoryInfo: DirectoryInfo | null = this._directoryInfo): void {
        if (!currentDirectoryInfo) return;

        // The indentation is determined by the depth level, it's being multiplied by 2 to increase the spacing
        const indent = " ".repeat(depthLevel * 2);

        console.log(`${indent}📁 ${currentDirectoryInfo.name}`);

        // If there are no files with the specified extension, display a warning message
        if (!currentDirectoryInfo.hasFilesWithExtension && currentDirectoryInfo.Files?.length === 0) {
            console.log(`${indent}⚠️ No files with the specified extension`);
        }

        // Display the files in the current directory
        currentDirectoryInfo.Files?.forEach((fileInfo) => this.displayFileInfo(fileInfo, depthLevel + 1));

        // Display the subdirectories in the current directory. It recursively calls itself to display the subdirectories.
        currentDirectoryInfo.Directories?.forEach((directoryInfo) => this.displayDirectoryInfo(depthLevel + 1, directoryInfo));
    }
}