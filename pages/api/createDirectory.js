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
    try {
      const { directoryPath } = req.body;
      if (!directoryPath) {
        return res.status(400).json({ message: 'Directory path is required.' });
      }
      const fullPath = path.resolve(directoryPath);
      if (fs.existsSync(fullPath)) {
        return res.status(400).json({ message: 'Directory already exists.' });
      }
      fs.mkdirSync(fullPath, { recursive: true });
      res.status(200).json({ message: 'Directory created successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create directory.', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}