# Kaguya

Kaguya is a ChatGPT plugin that allows you to load and edit your local files in a controlled way, as well as run any Python, JavaScript, and bash script. This makes it a powerful tool for developers, enabling them to interact with their file system and run scripts directly from ChatGPT.

## API Endpoints

The project provides several API endpoints that allow you to interact with the file system. The API is described in the `openapi.yaml` file. Here is a brief overview:

- `POST /api/executeCommand`: Execute a shell command.
- `GET /api/listFilesInDirectory`: List files and directories in the specified directory.
- `GET /api/readFile`: Read the content of a file in the user's directory.
- `POST /api/update`: Update a file in the user's directory by performing a search-and-replace operation.
- `POST /api/updateWholeFile`: Replace the entire content of a file in the user's directory.
- `POST /api/createFile`: Create a new file.
- `POST /api/deleteFile`: Delete a file in the user's directory.
- `POST /api/renameFile`: Rename a file in the user's directory.
- `POST /api/appendToFile`: Append content to the end of an existing file.
- `POST /api/createDirectory`: Create a new directory.
- `POST /api/deleteDirectory`: Delete a directory and its contents.
- `POST /api/readMultipleFiles`: Read the content of multiple files.

## Running the Project

You can run the project using Docker. Simply execute the `docker.sh` script:

```bash
docker.sh
```

After running the script, you can interact with Kaguya through ChatGPT using the localhost port.

## More About Kaguya

You can check out a demo of Kaguya in action on Twitter: [Demo Video](https://twitter.com/ykdojo/status/1645846044843077635)

You can check out a second demo of Kaguya in action on Twitter: [Second Demo Video](https://twitter.com/ykdojo/status/1670848611532562433)

## Discord

Join our Discord server [here](https://discord.com/invite/nNtVfKddDD).
