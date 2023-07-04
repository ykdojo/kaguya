# Kaguya

Kaguya is a ChatGPT plugin that allows you to load and edit your local files in a controlled way, as well as run any Python, JavaScript, and bash script. This makes it a powerful tool for developers, enabling them to interact with their file system and run scripts directly from ChatGPT.

## More About Kaguya

Check out the first demo video of Kaguya: 

https://github.com/pushkaraj2007/kaguya/assets/107422421/3000d44a-9c89-4c0f-99bf-8df131aa71ee

Check out the second demo video of Kaguya:

https://github.com/pushkaraj2007/kaguya/assets/107422421/6b180222-6ac5-4d42-9b40-7d48fd37f961

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

After running the script, you can interact with Kaguya through ChatGPT using the localhost port 3000.

## Discord

Join our Discord server [here](https://discord.com/invite/nNtVfKddDD).

## License 

This project is licensed under the terms of the MIT license ©2023.

For the full license text, please see the [LICENSE](./LICENSE) file.
