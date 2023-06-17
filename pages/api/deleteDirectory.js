import fs from 'fs';
import path from 'path';

// Recursive function to delete a directory and its contents
function deleteDirectoryRecursively(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        deleteDirectoryRecursively(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
    fs.rmdirSync(directoryPath);
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
      deleteDirectoryRecursively(directoryPath);
      res.status(200).json({ message: 'Directory deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete directory', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
