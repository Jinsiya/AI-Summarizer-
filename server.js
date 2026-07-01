import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use('/summarize', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Smart Summarizer (No API Key Required!)
app.post("/summarize", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ 
      error: "Text must be at least 10 characters long" 
    });
  }

  try {
    // Advanced mock summarizer - extracts key sentences
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    // Remove very short sentences
    const filteredSentences = sentences.filter(s => s.trim().split(/\s+/).length > 3);
    
    // Take first 2-3 sentences for summary
    const summarySentences = filteredSentences.slice(0, Math.min(3, filteredSentences.length));
    
    // If no good sentences, take first 2 sentences
    const finalSummary = summarySentences.length > 0 
      ? summarySentences.join(' ').trim()
      : sentences.slice(0, 2).join(' ').trim();
    
    // If summary is too long, truncate
    const summary = finalSummary.length > 500 
      ? finalSummary.slice(0, 500) + '...' 
      : finalSummary;

    res.json({ 
      summary: summary || "Text is too short to summarize.",
      wordCount: {
        original: text.split(/\s+/).length,
        summarized: summary.split(/\s+/).length
      }
    });

  } catch (error) {
    console.error("Summarization error:", error);
    res.status(500).json({ 
      error: "Error summarizing text. Please try again." 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 Using Smart Mock Summarizer (No API Key Needed!)`);
});