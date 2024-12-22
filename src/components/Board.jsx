import React from "react";
import { useParams } from "react-router";

const Board = () => {
  const { boardId } = useParams();
  return <p>{boardId}</p>;
};

export default Board;
