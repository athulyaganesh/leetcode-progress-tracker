import React, { useState, useEffect } from "react";
import NavBar from "./Navbar";
import CustomPagination from "./Pagination";

const Solve = ({ username }) => {
    const [problems, setProblems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [problemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [paginatedProblems, setPaginatedProblems] = useState([]);

  

    useEffect(() => {
        const fetchProblems = async () => {
          try {
            const response = await fetch(
              `https://cors-anywhere.herokuapp.com/https://leetcode.com/api/problems/algorithms/`
            );
            const data = await response.json();
            let allProblems = data.stat_status_pairs;
            allProblems.sort(
              (a, b) => a.stat.frontend_question_id - b.stat.frontend_question_id
            );
            setProblems(allProblems);
            setFilteredProblems(allProblems); // Initialize filteredProblems with all problems initially
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchProblems();
      }, []);
      

      const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const searchValue = event.target.value.toLowerCase();
        const filteredData = problems.filter((problem) =>
          problem.stat.question__title.toLowerCase().includes(searchValue) ||
          problem.stat.frontend_question_id.toString().includes(searchValue) ||
          (problem.difficulty && problem.difficulty.level.toString() === searchValue) ||
          (problem.status === 'ac' && searchValue === 'solved') ||
          (problem.status !== 'ac' && searchValue === 'unsolved')
        );
        setFilteredProblems(filteredData);
      
        // Reset the current page to the first page after search
        setCurrentPage(0);
      };
      

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problems.slice(
    indexOfFirstProblem,
    indexOfLastProblem
  );

  const handlePageClick = (data) => {
    let selected = data.selected;
    setCurrentPage(selected);
  
    // Calculate the starting index for the current page
    let startingIndex = selected * problemsPerPage;
  
    // Retrieve the filtered data based on the current search term
    let searchData = searchTerm.toLowerCase();
  
    let filteredData = problems.filter(
      (problem) =>
        problem.stat.question__title.toLowerCase().includes(searchData) ||
        problem.stat.frontend_question_id.toString().includes(searchData) ||
        (problem.difficulty &&
          problem.difficulty.level.toString() === searchData) ||
        (problem.status === 'ac' && searchData === 'solved') ||
        (problem.status !== 'ac' && searchData === 'unsolved')
    );
  
    // Update the state with the new filtered data
    setFilteredProblems(filteredData);
  
    // Slice the filtered data based on the starting index and problemsPerPage
    let slicedData = filteredData.slice(startingIndex, startingIndex + problemsPerPage);
  
    // Update the state with the paginated data
    setPaginatedProblems(slicedData);
  };
  

  return (
    <>
      <h1><NavBar />
      <div className="solve">
        <h2>All LeetCode Problems</h2>
        <div className="in">
          <input
            className="input-box-search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <table className="problems-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Difficulty</th>
              <th>Free?</th>
              <th>Actions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentProblems
              .filter((problem) =>
                problem.stat.question__title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((problem, index) => (
                <tr
                  key={index}
                  className={problem.status === 'ac' ? 'solved-row' : ''}
                >
                  <td>{problem.stat.frontend_question_id}</td>
                  <td>{problem.stat.question__title}</td>
                  <td>
                    {problem.difficulty ? (
                      <span>
                        {(() => {
                          switch (problem.difficulty.level) {
                            case 1:
                              return "Easy";
                            case 2:
                              return "Medium";
                            case 3:
                              return "Hard";
                            default:
                              return "Unknown";
                          }
                        })()}
                      </span>
                    ) : (
                      <span>Unknown</span>
                    )}
                  </td>
                  <td>
                    {problem.paid_only ? <span>Premium</span> : <span>Free</span>}
                  </td>
                  <td>
                    <a href={`https://leetcode.com/problems/${problem.stat.question__title_slug}`} target="_blank" rel="noopener noreferrer">
                      <button className="solve-button">Solve Now</button>
                    </a>
                  </td>
                  <td>{problem.status === 'ac' ? 'Solved' : 'Unsolved'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> 
      
      <CustomPagination
          pageCount={Math.ceil(problems.length / problemsPerPage)}
          handlePageClick={handlePageClick}
        /> 
        
        </h1>
    </>
  );
};

export default Solve;
