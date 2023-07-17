import fs from "fs";
import path from "path";

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

  if (req.method === "POST") {
    const { filePath } = req.body;

    if (!filePath) {
      return res.status(400).json({ error: "File path is required" });
    }

    // Resolve the file path relative to the project root
    const resolvedPath = path.resolve(process.cwd(), 'FILES', filePath);

    // Check if the file exists
    if (!fs.existsSync(resolvedPath)) {
      return res.status(400).json({
        error: "File not found. listFiles can be used to verify the file path."
      });
    }

    // Delete the file
    fs.unlink(resolvedPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete file" });
      }
      res.status(200).json({ message: "File deleted successfully" });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
