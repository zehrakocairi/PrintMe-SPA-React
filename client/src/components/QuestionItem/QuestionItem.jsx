import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import "./QuestionItem.css";

const QuestionItem = ({ question, setIsQuestionDeleted, isQuestionBelongsToUser = false }) => {
  const { user } = useAuth();
  const id = question._id;
  const [daysAgo, setDaysAgo] = useState("...");

  useEffect(() => {
    const newDate = !question.created_at
      ? "unknown date"
      : new Date(question.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

    setDaysAgo(newDate);
  }, [question.created_at]);

  const getDeleteUrl = (questionId) => `/questions/userQuestions/delete/${questionId}`;

  const { performFetch: deleteQuestion } = useFetch(
    "", // We don't need to specify a route here, we will do that in the handleDelete function
    (response) => {
      if (response.success) {
        setIsQuestionDeleted(true);
        alert("Question deleted succesfully");
      }
    }
  );

  const handleDelete = (questionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");

    if (confirmDelete) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      deleteQuestion(options, getDeleteUrl(questionId));
    }
  };

  return (
    <div className="question-wrapper">
      <Link to={`/questions/${id}`} className="">
        <h1>{question.question_title}</h1>
      </Link>

      <p>{question.question_content}</p>
      <div className="question-pins">
        {question.module_ids?.map((tag) => (
          <span key={tag} className="pin tag">
            {tag}
          </span>
        ))}
        <span className="flex-spanner"></span>
        <span className="pin">{question.like_counter} LIKES</span>
        <span className="pin">{question.visit_counter} VIEWS</span>
        <span className="pin">
          Asked by {question.user_name} at {daysAgo}
        </span>
      </div>
      <div className="button-group">
        <Button className="icon-button">
          <ThumbUpIcon style={{ fontSize: "18px" }} />
        </Button>
        <Button
          className={user && isQuestionBelongsToUser ? "icon-button delete" : "icon-button"}
          disabled={user && isQuestionBelongsToUser ? false : true}
          onClick={() => handleDelete(question._id)}
        >
          <DeleteIcon style={{ fontSize: "18px" }} />
        </Button>
      </div>
    </div>
  );
};

export default QuestionItem;
