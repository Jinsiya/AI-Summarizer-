import { useState } from "react";
import { FiCopy, FiCheckCircle, FiDownload } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function SummaryBox({ summary, loading, isDark }) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `summary-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 min-h-[200px] ${
      isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
    }`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
          ✨ Summary
        </h2>
        {summary && (
          <div className="flex gap-2">
            <button
              onClick={copyText}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title="Copy summary"
            >
              {copied ? <FiCheckCircle className="text-green-500" size={18} /> : <FiCopy size={18} />}
            </button>
            <button
              onClick={downloadSummary}
              className={`p-2 rounded-lg transition-all duration-200 ${
                isDark 
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title="Download summary"
            >
              <FiDownload size={18} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className={`mt-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Generating summary...
            </p>
          </motion.div>
        ) : summary ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-xl ${
              isDark ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <p className={`leading-relaxed ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              {summary}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className={`h-1 flex-1 rounded-full ${
                isDark ? "bg-gray-600" : "bg-gray-200"
              }`}>
                <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
              </div>
              <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                AI Generated
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-8 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="text-5xl mb-4">📄</div>
            <p>Your summary will appear here</p>
            <p className="text-sm mt-2">Enter text and click Summarize</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SummaryBox;