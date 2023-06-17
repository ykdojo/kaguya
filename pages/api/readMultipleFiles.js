import fs from "fs";
import path from "path";

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

  if (req.method === "POST") {
    const { filePaths } = req.body;

    if (!Array.isArray(filePaths)) {
      return res.status(400).json({ error: "filePaths must be an array" });
    }

    // Initialize an array to store the file contents
    const fileContents = [];

    // Loop through each file path and read its content
    let totalCharLength = 0;
    for (const filePath of filePaths) {
      // Resolve the file path relative to the project root
      const resolvedPath = path.resolve(process.cwd(), filePath);

      // Check if the resolved path is outside the project directory
      if (!resolvedPath.startsWith(process.cwd())) {
        return res.status(400).json({ error: "Invalid file path" });
      }

      // Check if the file exists
      try {
        fs.accessSync(resolvedPath, fs.constants.F_OK);
        // Read the content of the file
        const content = fs.readFileSync(resolvedPath, "utf8");
        totalCharLength += content.length;
        if (totalCharLength > 22000) {
          return res
            .status(200)
            .json({
              warning:
                "The total character length of the output exceeds 22,000 characters. Only some of the files are shown.",
              fileContents
            });
        }
        fileContents.push({ filePath, content });
      } catch (err) {
        return res.status(404).json({ error: `File not found: ${filePath}. listFiles can be used to locate it.` });
      }
    }

    // Return the array of file contents
    return res.status(200).json({ fileContents });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
