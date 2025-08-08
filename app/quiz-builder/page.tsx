"use client";
import { useState, useEffect } from "react";

export default function QuizBuilder() {
  type Question = {
    text: string;
    options: string[];
    correct: number;
    subject: string;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [subjects, setSubjects] = useState<{id:number, name:string}[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await fetch("http://localhost/api/subject");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched subjects:", data); // Debug log
        
        if (Array.isArray(data)) {
          setSubjects(data);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch subjects");
        
        // Fallback with mock data for testing
        setSubjects([
          {"id":1,"name":"MATHS"},
          {"id":2,"name":"ENG"},
          {"id":3,"name":"CHM"},
          {"id":4,"name":"PHY"},
          {"id":5,"name":"BIOLOGY"},
          {"id":6,"name":"AGR"},
          {"id":7,"name":"FMT"},
          {"id":8,"name":"BST"},
          {"id":9,"name":"ICT"},
          {"id":10,"name":"FRE"},
          {"id":11,"name":"IGB"},
          {"id":12,"name":"YOR"},
          {"id":13,"name":"CCA"}
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleOptionChange = (idx: number, value: string) => {
    setOptions((opts) => opts.map((opt, i) => (i === idx ? value : opt)));
  };

  const handleAddQuestion = () => {
    if (!questionText.trim() || options.some((o) => !o.trim()) || !selectedSubject) return;
    setQuestions([
      ...questions,
      {
        text: questionText,
        options: [...options],
        correct,
        subject: selectedSubject,
      },
    ]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrect(0);
    setSelectedSubject("");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-[10px]">
      <div className="mb-8">
        <h1 className=" font-bold text-gray-900 dark:text-white mb-2">Quiz Builder</h1>
        <p className=" text-gray-600 dark:text-gray-400">Create your own quiz by adding questions and options.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
        <div className="mb-6">
          <label className="block  font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject ({subjects.length} available)
          </label>
          
          {error && (
            <div className="mb-2 p-2 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded  text-yellow-800 dark:text-yellow-200">
              Network error: Using fallback data. {error}
            </div>
          )}
          
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2  bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            required
            disabled={loading}
          >
            <option value="" disabled>
              {loading ? "Loading subjects..." : "Select subject"}
            </option>
            {subjects.map((subj) => (
              <option key={subj.id} value={subj.name}>
                {subj.name}
              </option>
            ))}
          </select>
          
          {/* Debug info */}
          <div className="mt-2  text-gray-500">
            Debug: {subjects.length} subjects loaded, Loading: {loading ? "Yes" : "No"}
          </div>
        </div>

        <div className="mb-6">
          <label className="block  font-medium text-gray-700 dark:text-gray-300 mb-2">Question</label>
          <input
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2  bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block  font-medium text-gray-700 dark:text-gray-300 mb-2">Options</label>
          <div className="space-y-3">
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2  bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  required
                />
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correct"
                    checked={correct === idx}
                    onChange={() => setCorrect(idx)}
                    aria-label="Set as correct answer"
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className=" text-gray-600 dark:text-gray-400">Correct</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-600 hover:bg-blue-700 text-white  font-medium px-4 py-2 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Question
        </button>
      </div>

      <div>
        <h2 className=" font-semibold text-gray-900 dark:text-white mb-4">Questions ({questions.length})</h2>
        {questions.length === 0 ? (
          <div className="text-center py-8">
            <p className=" text-gray-500 dark:text-gray-400">No questions added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className=" font-medium text-gray-900 dark:text-white mb-2">
                  {i + 1}. {q.text}
                </div>
                <div className=" text-blue-600 dark:text-blue-400 mb-3">
                  Subject: {q.subject}
                </div>
                <ul className="space-y-1">
                  {q.options.map((opt: string, j: number) => (
                    <li key={j} className={` flex items-center gap-2 ${j === q.correct ? "font-medium text-green-600 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                      <span className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center  font-medium">
                        {String.fromCharCode(65 + j)}
                      </span>
                      {opt}
                      {j === q.correct && <span className=" bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">Correct</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}