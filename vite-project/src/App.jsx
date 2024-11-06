import React, { useState, useEffect } from "react";

const App = () => {
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const fakeData = [
    {
      name: "repo1",
      description: "A JavaScript repo",
      language: "JavaScript",
      forks_count: 5,
    },
    {
      name: "repo2",
      description: "A Python repo",
      language: "Python",
      forks_count: 10,
    },
    {
      name: "repo3",
      description: "A JavaScript library",
      language: "JavaScript",
      forks_count: 15,
    },
    {
      name: "repo4",
      description: "A Python project",
      language: "Python",
      forks_count: 7,
    },
    {
      name: "repo5",
      description: "A C++ repo",
      language: "C++",
      forks_count: 12,
    },
    {
      name: "repo6",
      description: "A Ruby project",
      language: "Ruby",
      forks_count: 3,
    },
    {
      name: "repo7",
      description: "Another C++ repo",
      language: "C++",
      forks_count: 8,
    },
  ];
  // const fetchRepos = async () => {
  //   try {
  //     const url = selectedLanguage
  //       ? `http://localhost:3000/repos/list?language=${selectedLanguage}`
  //       : "http://localhost:3000/repos";
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setRepos(data);
  //     if (languages.length === 0) {
  //       const uniqueLanguages = [
  //         ...new Set(data.map((repo) => repo.language)),
  //       ].filter(Boolean);
  //       setLanguages(uniqueLanguages);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching repos:", error);
  //   }
  // };
  useEffect(() => {
    // fetchRepos();
    setRepos(fakeData);
    const filteredRepos = selectedLanguage
      ? fakeData.filter((repo) => repo.language === selectedLanguage)
      : fakeData;

    setRepos(filteredRepos);
    if (languages.length === 0) {
      const uniqueLanguages = [
        ...new Set(fakeData.map((repo) => repo.language)),
      ].filter(Boolean);
      setLanguages(uniqueLanguages);
    }
  }, [selectedLanguage]);
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">GitHub Repositories</h1>
        <select
          className="w-48 p-2 border border-gray-300 rounded"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo, index) => (
          <div key={index} className="p-4">
            <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
            <p className="text-gray-600 mb-2 line-clamp-2">
              {repo.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {repo.language || "No language"}
              </span>
              <span className="text-gray-600">Forks: {repo.forks_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
