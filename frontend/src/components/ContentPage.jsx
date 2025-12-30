import React, { useState } from "react";

function ContentPage() {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/content/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            contentType,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to generate content");
      }

      // Extract text safely
      const generatedText =
        data?.content?.parts?.[0]?.text || "No content returned";

      setResult(generatedText);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        AI Content Generator
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Generate blogs, social posts, emails, and more using AI.
      </p>

      {/* Input Card */}
      <div className="bg-white dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium mb-2">
          Content Prompt
        </label>
        <textarea
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a 300-word blog about AI in marketing..."
          className="w-full rounded-md border border-gray-300 dark:border-slate-700 p-3 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center justify-between mt-4">
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="border border-gray-300 dark:border-slate-700 rounded-md px-3 py-2 bg-white dark:bg-slate-900"
          >
            <option value="blog">Blog</option>
            <option value="email">Email</option>
            <option value="social">Social Post</option>
            <option value="ad">Ad Copy</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Output Card */}
      {result && (
        <div className="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-3">
            Generated Content
          </h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ContentPage;
