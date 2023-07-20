import fs from 'fs';
import path from 'path';

// Recursive function to delete a directory and its contents
function deleteDirectoryRecursively(directoryPath, isInitialCall = true) {
  const fullPath = isInitialCall ? path.join(process.cwd(), 'FILES', directoryPath) : directoryPath;
  if (fs.existsSync(fullPath)) {
    console.log(`Deleting contents of directory: ${fullPath}`);
    fs.readdirSync(fullPath).forEach((file) => {
      const currentPath = path.join(fullPath, file);
      const isDirectory = fs.lstatSync(currentPath).isDirectory();
      console.log(`Is ${currentPath} a directory? ${isDirectory}`);
      if (isDirectory) {
        console.log(`Deleting directory: ${currentPath}`);
        deleteDirectoryRecursively(currentPath, false);
      } else {
        console.log(`Deleting file: ${currentPath}`);
        fs.unlinkSync(currentPath);
      }
    });
    console.log(`Deleting directory: ${fullPath}`);
    fs.rmdirSync(fullPath);
  }
}

export default function handler(req, res) {
  // Set response headers
  res.setHeader('Access-Control-Allow-Origin', 'https://chat.openai.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, openai-conversation-id, openai-ephemeral-user-id');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight request (OPTIONS method)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { directoryPath } = req.body;
    try {
      deleteDirectoryRecursively(directoryPath, true);
      res.status(200).json({ message: 'Directory deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete directory', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
