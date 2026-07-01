import { useState } from "react";
import { FiTrash2, FiClock, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function History({ history, isDark, setHistory }) {
  const [isOpen, setIsOpen] = useState(true);

  const clearHistory = () => {
    if (confirm("Clear all history?")) {
      setHistory([]);
      localStorage.removeItem("summaryHistory");
    }
  };

  const deleteItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  if (history.length === 0) {
    return (
      <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 ${
        isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
      }`}>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📜</div>
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            No history yet
          </p>
          <p className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Summaries will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-xl p-6 transition-all duration-300 ${
      isDark ? "bg-gray-800 border border-gray-700" : "bg-white"
    }`}>
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className={`font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
          📜 History ({history.length})
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearHistory();
            }}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isDark 
                ? "bg-gray-700 text-gray-400 hover:bg-red-600 hover:text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
            }`}
            title="Clear history"
          >
            <FiTrash2 size={16} />
          </button>
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin"
          >
            {history.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl transition-all duration-200 group ${
                  isDark 
                    ? "bg-gray-700 hover:bg-gray-600" 
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      isDark ? "text-white" : "text-gray-800"
                    }`}>
                      {item.summary}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <FiClock className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`} />
                      <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {item.date}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-600"
                      }`}>
                        {item.summary.length} chars
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded ${
                      isDark 
                        ? "hover:bg-gray-500 text-gray-400 hover:text-red-400" 
                        : "hover:bg-gray-200 text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default History;