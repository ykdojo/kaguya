import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat.openai.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, openai-conversation-id, openai-ephemeral-user-id');
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Handle preflight request (OPTIONS method)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    const { filePath } = req.query;

    if (!filePath) {
      return res
        .status(400)
        .json({ error: 'File path is required' });
    }

    // Resolve the file path relative to the project root
    const resolvedPath = path.resolve(process.cwd(), filePath);

    // Check if the resolved path is outside the project directory
    if (!resolvedPath.startsWith(process.cwd())) {
      return res.status(400).json({ error: 'Invalid file path' });
    }

    // Check if the file exists
    fs.access(resolvedPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'File not found. listFiles can be used to verify the file path.' });
      }

      // Read the content of the file
      fs.readFile(resolvedPath, 'utf8', (err, data) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to read file' });
        }
        res.status(200).json({ content: data });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
