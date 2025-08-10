"use client";
import axios from "axios";
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
  const [subjects, setSubjects] = useState<{ id: number, name: string }[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get("http://localhost:3000/api/subject", {
          headers: {
            Authorization: "4000" // Capitalized for convention
          }
        });


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
          { "id": 1, "name": "MATHS" },
          { "id": 2, "name": "ENG" },
          { "id": 3, "name": "CHM" },
          { "id": 4, "name": "PHY" },
          { "id": 5, "name": "BIOLOGY" },
          { "id": 6, "name": "AGR" },
          { "id": 7, "name": "FMT" },
          { "id": 8, "name": "BST" },
          { "id": 9, "name": "ICT" },
          { "id": 10, "name": "FRE" },
          { "id": 11, "name": "IGB" },
          { "id": 12, "name": "YOR" },
          { "id": 13, "name": "CCA" }
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
    <div className="flex flex-col w-full h-full py-8 px-4 text-[10px] border-t border-gray-400/20">
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


      </div>


    </div>
  );
}