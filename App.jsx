import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import TextInput from "./components/TextInput";
import SummaryBox from "./components/SummaryBox";
import History from "./components/History";

function App() {
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("summaryHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("summaryHistory", JSON.stringify(history));
  }, [history]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark ? "bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" 
             : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h1 className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-800"
              }`}>
                AI Summarizer
              </h1>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                Transform long text into concise summaries
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-3 rounded-full transition-all duration-300 ${
              isDark 
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" 
                : "bg-white text-gray-800 hover:bg-gray-100"
            } shadow-lg`}
          >
            {isDark ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TextInput 
              setSummary={setSummary} 
              setHistory={setHistory}
              loading={loading}
              setLoading={setLoading}
              isDark={isDark}
            />
            <SummaryBox 
              summary={summary} 
              loading={loading}
              isDark={isDark}
            />
          </div>
          <div className="lg:col-span-1">
            <History 
              history={history} 
              isDark={isDark}
              setHistory={setHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;