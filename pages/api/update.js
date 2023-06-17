import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
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

    // Extract the parameters from the request body
    const { filePath, searchString, replacementString } = req.body;

    // Ensure all required parameters are provided
    if (!filePath || searchString === undefined || replacementString === undefined) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
      // Resolve the file path relative to the project root
      const fileAbsolutePath = path.resolve(process.cwd(), filePath);

      // Check if the resolved path is outside the project directory
      if (!fileAbsolutePath.startsWith(process.cwd())) {
        return res.status(400).json({
          message: "Invalid file path. File path must be within the project directory."
        });
      }

      // Check if the file exists
      if (!fs.existsSync(fileAbsolutePath)) {
        return res.status(400).json({
          message: "File not found. listFiles can be used to verify the file path."
        });
      }

      // Read the file content
      const fileContent = fs.readFileSync(fileAbsolutePath, 'utf-8');

      // Check if the searchString exists in the file content
      if (!fileContent.includes(searchString)) {
        return res.status(400).json({ message: 'Search string not found in file' });
      }

      // Perform the search and replace operation
      const updatedContent = fileContent.replace(searchString, replacementString);

      // Write the updated content back to the file
      fs.writeFileSync(fileAbsolutePath, updatedContent);

      // Respond with a success message
      res.status(200).json({ message: 'File updated successfully' });
    } catch (error) {
      // Respond with an error message
      res.status(500).json({ message: 'An error occurred while updating the file', error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
