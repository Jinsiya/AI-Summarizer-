import { useState } from "react";
import axios from "axios";
import { FiSend, FiTrash2, FiUpload } from "react-icons/fi";

function TextInput({ setSummary, setHistory, loading, setLoading, isDark }) {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleSummarize = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/summarize", {
        text,
      });
      
      setSummary(res.data.summary);
      setHistory(prev => {
        const newHistory = [{
          id: Date.now(),
          text: text,
          summary: res.data.summary,
          date: new Date().toLocaleString(),
        }, ...prev];
        return newHistory.slice(0, 20); // Keep only last 20 items
      });
      
    } catch (error) {
      alert("Error summarizing text. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setCharCount(0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
        setCharCount(e.target.result.length);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 ${
      isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
          📝 Input Text
        </h2>
        <div className="flex items-center gap-3">
          <label className={`cursor-pointer transition-colors duration-200 ${
            isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-800"
          }`}>
            <FiUpload size={20} />
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {charCount} chars
          </span>
        </div>
      </div>
      
      <textarea
        className={`w-full border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 ${
          isDark 
            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" 
            : "bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-400"
        }`}
        rows="6"
        placeholder="Paste your text here or upload a file..."
        value={text}
        onChange={handleTextChange}
      />
      
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            loading || !text.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FiSend size={20} />
              Summarize
            </>
          )}
        </button>
        
        {text && (
          <button
            onClick={handleClear}
            className={`px-4 rounded-xl transition-all duration-300 ${
              isDark 
                ? "bg-gray-700 text-gray-400 hover:bg-gray-600" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <FiTrash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TextInput;