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
    const { oldFilePath, newFilePath } = req.body;

    if (!oldFilePath || !newFilePath) {
      return res.status(400).json({ error: "Both old and new file paths are required" });
    }

    // Resolve the file paths relative to the project root
    const resolvedOldPath = path.resolve(process.cwd(), oldFilePath);
    const resolvedNewPath = path.resolve(process.cwd(), newFilePath);

    // Check if the old file exists
    if (!fs.existsSync(resolvedOldPath)) {
      return res.status(400).json({
        error: "Old file not found. listFiles can be used to verify the file path."
      });
    }

    // Rename the file
    fs.rename(resolvedOldPath, resolvedNewPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to rename file" });
      }
      res.status(200).json({ message: "File renamed successfully" });
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
