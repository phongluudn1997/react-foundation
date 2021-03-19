import * as React from "react";
import { useParams } from "react-router-dom";

function Book() {
  const { _id } = useParams();
  return <div>Book with id: {_id}</div>;
}

export { Book };
