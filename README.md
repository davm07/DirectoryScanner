# Overview

The DirectoryScanner application is a command-line interface (CLI) tool that scans a directory and its subdirectories for files with a specified extension. It displays the directory information in the console. If the user specifies an extension but no files with that extension are found, it will display a warning message. If the user does not specify an extension, it will display all files in the directory and its subdirectories. If the path to the directory specified by the user is invalid, the console will display an error message. The purpose of this project is to practice using the command line to interact with the file system and display some information about directories and files. I also create this project to understand the basics of Typescript and how powerful it is. This project can help the user to scan directories in order to find files with a specific extension and show the relation between them in a hierarchical structure.

[Software Demo Video](https://youtu.be/YnMdKpUXDco)

# Development Environment

The project was developed using:

1. Visual Studio Code as the main IDE
2. Node.js v20.17.0 as the runtime environment
3. TypeScript v5.8.2 as the programming language
4. @inquirer/prompts v7.3.3 as the package for command-line interface (CLI) interactions

# Useful Websites

Here are some useful websites that I used during the development of this project:

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js "fs/promises" Documentation](https://nodejs.org/api/fs.html#promise-example)
- [Node.js "fs/stat" Documentation](https://nodejs.org/es/learn/manipulating-files/nodejs-file-stats)
- [Package "@inquirer/prompts" Documentation](https://www.npmjs.com/package/@inquirer/prompts)
- [Read files in Node.js](https://dev.to/masanori_msl/typescriptexpress-search-and-load-local-files-4koa)

# Future Work

Some ideas for future work on this project:

- Allow the user to keep scanning directories until they want to stop
- Add a feature to allow the user select multiple extensions from the menu to filter by
- Add more filter options, such as date range, size range, and file name pattern
