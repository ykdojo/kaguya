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
    const { filePath, contentToAppend } = req.body;
    if (!filePath || !contentToAppend) {
      return res.status(400).json({ error: 'File path and content to append are required.' });
    }
    try {
      const fullPath = path.resolve(process.cwd(), filePath);
      if (!fs.existsSync(fullPath)) {
        return res.status(400).json({ error: 'File not found. listFiles can be used to verify the file path.' });
      }
      if (!fullPath.startsWith(process.cwd())) {
        return res.status(400).json({ error: 'Invalid file path' });
      }
      fs.appendFileSync(fullPath, contentToAppend);
      res.status(200).json({ message: 'Content appended successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }
}