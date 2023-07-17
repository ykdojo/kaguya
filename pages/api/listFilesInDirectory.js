const fs = require("fs");
const path = require("path");
const ignore = require("ignore");

// Helper function to read .gitmodules file and return a set of submodule paths
function getSubmodulePaths(targetDir) {
  const submodulePaths = new Set();
  const gitmodulesPath = path.join(targetDir, ".gitmodules");
  const kaguyaGitmodulesPath = path.join("/kaguya", ".gitmodules"); // Path to .gitmodules in /kaguya

  // Function to read a .gitmodules file and add paths to submodulePaths
  function readGitmodules(filePath, prependPath) {
    if (fs.existsSync(filePath)) {
      const gitmodulesContent = fs.readFileSync(filePath, "utf8");
      const submoduleLines = gitmodulesContent.split("\n");
      submoduleLines.forEach((line) => {
        const match = line.match(/^[\s]*path[\s]*=[\s]*(.+)$/);
        if (match) {
          // Prepend the path with prependPath
          submodulePaths.add(path.join(prependPath, match[1]));
        }
      });
    }
  }

  // Read .gitmodules in targetDir and /kaguya
  readGitmodules(gitmodulesPath, targetDir);
  readGitmodules(kaguyaGitmodulesPath, "/kaguya");

  return submodulePaths;
}

function listFilesInDirectory(
  directoryPath,
  fileList = [],
  rootIg,
  submodulePaths,
  isSubmodule = false
) {
  const files = fs.readdirSync(directoryPath);

  // Create an ignore filter
  const ig = isSubmodule ? ignore() : rootIg || ignore();

  // Add rule to ignore .git folder
  ig.add(".git");

  // Load the .gitignore rules from the current directory
  const gitignorePath = path.join(directoryPath, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    const gitignoreRules = gitignoreContent.split("\n").map((rule) => {
      // if the rule is not empty
      if (rule) {
        return path.join(directoryPath, rule);
      }
    });
    ig.add(gitignoreRules);
  }

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const relativePath = path.relative(process.cwd(), filePath);
    const fileOrFolderName = path.basename(filePath);

    // Check if the file or directory should be ignored
    const isDirectory = fs.statSync(filePath).isDirectory();
    if (ig.ignores(isDirectory ? 'kaguya/' + relativePath + "/" : 'kaguya/' + relativePath)) {
      return;
    }

    if (
      (isDirectory && submodulePaths.has(filePath)) ||
      submodulePaths.has(fileOrFolderName)
    ) {
      fileList.push(filePath + " (Git submodule - content skipped. This inside parenthesis is not part of the directory path)");
      console.log("ignoring this directory", filePath);
      // Do not list the contents of submodule directories
      return;
    }

    if (isDirectory) {
      // Include the directory path in the output
      fileList.push(filePath);
      // Call the function recursively for the subdirectory
      listFilesInDirectory(filePath, fileList, ig, submodulePaths, false);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://chat.openai.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, openai-conversation-id, openai-ephemeral-user-id"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Handle preflight request (OPTIONS method)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    // Get the directory path from the query parameters (default to current directory)
    const directoryPath = path.join(process.cwd(), 'FILES', req.query.directoryPath);
    if (directoryPath === "/") {
      res.status(400).json({
        error:
          "The input '/' is not allowed. Please use '.' to specify the current directory.",
      });
      return;
    }
    if (!fs.existsSync(directoryPath)) {
      res.status(400).json({
        error: `The specified directory '${directoryPath}' does not exist. You can run this in the root directory (with '.') to verify the directory location.`,
      });
      return;
    }
    if (!directoryPath) {
      res.status(400).json({
        error:
          'The directoryPath parameter must be specified. To specify the current directory, use ".".',
      });
      return;
    }
    // Call the listFilesInDirectory function with submodule paths
    const submodulePaths = getSubmodulePaths(directoryPath);
    const fileList = listFilesInDirectory(
      directoryPath,
      [],
      null,
      submodulePaths
    );
    // Respond with the list of files
    res.status(200).json({ files: fileList });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
