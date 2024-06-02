import React, { useState, useEffect, useCallback } from "react";
import useFetch from "../../hooks/useFetch";
import QuestionSorting from "../QuestionSorting/QuestionSorting";
import QuestionItem from "../QuestionItem/QuestionItem";
import { useAuth } from "../../contexts/AuthContext";
import SearchBarComponent from "../SearchBar/SearchBar.jsx";
import "./QuestionList.css";

const QuestionList = () => {
  const { isLoading, error, performFetch, cancelFetch } = useFetch("/questions", fetchQuestions);
  const [questions, setQuestions] = useState([]);
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [isSortedByPopularity, setIsSortedByPopularity] = useState(false);
  const [isSortedByTime, setIsSortedByTime] = useState(false);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    performFetch();
    return () => {
      cancelFetch();
    };
  }, [isQuestionDeleted]);

  useEffect(() => {
    setSortedQuestions(questions);
  }, [questions]);

  function fetchQuestions(res) {
    setQuestions(res.questions);
  }

  const runSearch = useCallback(async (term) => {
    await performFetch(null, "/questions?searchTerm=" + term);
  }, []);

  function handleSortByPopularity() {
    const sortedQuestions = [...questions].sort((a, b) => {
      return b.like_counter - a.like_counter;
    });

    const valueToBe = !isSortedByPopularity;
    setIsSortedByPopularity(valueToBe);
    setIsSortedByTime(false);

    if (valueToBe) {
      setSortedQuestions(sortedQuestions);
    } else {
      setSortedQuestions(questions);
    }
  }

  function handleSortByTime() {
    const sortedQuestions = [...questions].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB - dateA;
    });

    const valueToBe = !isSortedByTime;
    setIsSortedByTime(valueToBe);
    setIsSortedByPopularity(false);

    if (valueToBe) {
      setSortedQuestions(sortedQuestions);
    } else {
      setSortedQuestions(questions);
    }
  }

  function isQuestionBelongsToUser(question) {
    return user?.id && user?.id === question.user_id;
  }

  if (error) return <h1>{error}</h1>;

  return (
    <div className="question-list">
      <div className="over-question-table">
        <SearchBarComponent runSearch={runSearch} />
        <QuestionSorting
          handleSortByPopularity={handleSortByPopularity}
          handleSortByTime={handleSortByTime}
          isSortedByPopularity={isSortedByPopularity}
          isSortedByTime={isSortedByTime}
        />
      </div>
      <div>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          sortedQuestions.map((question) => (
            <QuestionItem
              key={question._id}
              question={question}
              isDeleted={isQuestionDeleted}
              setIsQuestionDeleted={setIsQuestionDeleted}
              isQuestionBelongsToUser={isQuestionBelongsToUser(question)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionList;
