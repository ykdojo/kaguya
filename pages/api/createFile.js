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
  
  if (req.method === 'POST') {
    const { filePath, content } = req.body;

    if (!filePath || !content) {
      return res
        .status(400)
        .json({ error: 'File path and content are required' });
    }

    // Resolve the file path relative to the project root
    const resolvedPath = path.resolve(process.cwd(), 'FILES', filePath);

    // Check if the file exists
    if (fs.existsSync(resolvedPath)) {
      return res.status(409).json({
        error: 'File already exists'
      });
    }

    // Check if the resolved path is outside the project directory
    if (!resolvedPath.startsWith(process.cwd())) {
      return res.status(400).json({ error: 'Invalid file path' });
    }

    // Extract the directory path from the resolved file path
    const dirPath = path.dirname(resolvedPath);

    // Create the directory path if it doesn't exist
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to create directory' });
      }

      // Write the content to the file
      fs.writeFile(resolvedPath, content, (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to write to file' });
        }
        res.status(200).json({ message: 'File created successfully' });
      });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
