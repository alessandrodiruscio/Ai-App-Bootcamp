import express from "express";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Route for notifications
  app.post("/api/notify", async (req, res) => {
    const { message, userName, sessionId } = req.body;
    // Use environment variables if set, otherwise fallback to hardcoded values provided by user
    const botToken = process.env.TELEGRAM_BOT_TOKEN || "7869917519:AAFUlb6l906qyWnaIKoe-A4upoJcxGDs1io";
    const chatId = process.env.TELEGRAM_CHAT_ID || "277366383";
    const appUrl = process.env.APP_URL || "https://ais-dev-sa2ifsr5uzafedpqokav3l-360527981437.europe-west2.run.app";

    if (!botToken || !chatId) {
      console.log("Telegram credentials not set. Skipping notification.");
      return res.json({ success: true, skipped: true });
    }

    try {
      const text = `🔔 *New Message from ${userName}*\n\n"${message}"\n\n[Open Admin Dashboard](${appUrl}?admin=true)`;
      
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error("Failed to send Telegram notification:", error.response?.data || error.message);
      res.status(500).json({ success: false, error: "Failed to send notification" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
