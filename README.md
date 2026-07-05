📝 AI Text Summarizer
An AI-powered web application that automatically generates concise summaries from lengthy text using OpenAI's GPT model. Built with React, Node.js, Express, and Tailwind CSS.

Features:

✅ Advanced NLP summarization

📝 Text input with character counter

📋 One-click copy to clipboard

📜 Searchable history with timestamps

🎨 Modern, responsive UI

⚡ Fast and lightweight

Tech Stack:

Frontend: React + Vite + Tailwind CSS

Backend: Node.js + Express

AI: OpenAI GPT API

Perfect for students, researchers, and professionals who need to quickly digest large amounts of text

## 🚀 Installation

### Step 1: Clone Repository
git clone https://github.com/Jinsiya/AI-Summarizer-.git
cd AI-Summarizer-

## Step 2: Create Virtual Environment
bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate

## Step 3: Install Dependencies
bash
pip install -r requirements.txt

## Step 4: Run Application
bash
python app.py

## Troubleshooting
Transformers Error
bash
pip install transformers --upgrade
PyTorch Error
bash
# CPU version
pip install torch --index-url https://download.pytorch.org/whl/cpu
Model Download Issues
bash
export HF_ENDPOINT=https://hf-mirror.com
