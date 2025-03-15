import { FileInfo } from "./FileInfo";

/**
 * The DirectoryInfo interface represents information about a directory and its subdirectories.
 * It contains the name of the directory, an array of FileInfo objects, an array of DirectoryInfo objects,
 * and a boolean indicating if there are files with the specified extension.
 */
export interface DirectoryInfo {
    name: string;
    Files: FileInfo[] | null;
    Directories: DirectoryInfo[] | null;
    hasFilesWithExtension: boolean;
}