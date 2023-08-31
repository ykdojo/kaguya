# API Endpoints

The project provides several API endpoints that allow you to interact with the file system within the Kaguya directory. The API is described in the `openapi.yaml` file. Here is a brief overview:

- `GET /api/listFilesInDirectory`: List files and directories in the specified directory. Defaults to FILES.
- `GET /api/readFile`: Read the content of a file in the user's directory.
- `GET /api/readMultipleFiles`: Read the content of multiple files.
- `POST /api/update`: Update a file in the user's directory by performing a search-and-replace operation.
- `POST /api/updateAll`: Update a file in the user's directory by performing a search-and-replace operation (all occurrences).
- `POST /api/updateWholeFile`: Replace the entire content of a file in the user's directory.
- `POST /api/appendToFile`: Append content to the end of an existing file.
- `POST /api/createFile`: Create a new file.
- `POST /api/deleteFile`: Delete a file in the user's directory.
- `POST /api/renameFile`: Rename a file in the user's directory.
- `POST /api/createDirectory`: Create a new directory.
- `POST /api/deleteDirectory`: Delete a directory and its contents.
- `POST /api/executeCommand`: Execute a shell command.
