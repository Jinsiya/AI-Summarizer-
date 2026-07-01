# setup-tailwind.ps1
Write-Host "🔧 Setting up Tailwind CSS..." -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Run this script in the Client folder where package.json exists" -ForegroundColor Red
    exit
}

# Install Tailwind
Write-Host "📦 Installing Tailwind CSS..." -ForegroundColor Yellow
npm install -D tailwindcss postcss autoprefixer

# Create tailwind.config.js
Write-Host "📝 Creating tailwind.config.js..." -ForegroundColor Yellow
@"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@ | Out-File -FilePath tailwind.config.js -Encoding utf8

# Create postcss.config.js
Write-Host "📝 Creating postcss.config.js..." -ForegroundColor Yellow
@"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@ | Out-File -FilePath postcss.config.js -Encoding utf8

# Create CSS folder and file
Write-Host "📝 Creating CSS file..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "src\styles" | Out-Null
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .scrollbar-thin::-webkit-scrollbar {
    width: 6px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    @apply bg-purple-500 rounded-full;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    @apply bg-purple-600;
  }
}

* {
  scroll-behavior: smooth;
}

input, textarea, button {
  @apply outline-none;
}

::selection {
  @apply bg-purple-500 text-white;
}
"@ | Out-File -FilePath "src\styles\index.css" -Encoding utf8

Write-Host "✅ Tailwind CSS setup complete!" -ForegroundColor Green
Write-Host "🚀 Run 'npm run dev' to start your app" -ForegroundColor Cyan
