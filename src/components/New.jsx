import React from "react";
import "./New.css";

function New({ title, image, author, summary, publishedAt, url }) {
  // Parsear la fecha y formatearla
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="sf-new">
      <h2>{title}</h2>
      <img src={image} alt={title} />
      <h5>{author}</h5>
      <p>{summary}</p>
      <h5>{formattedDate}</h5>
      <a href={url}>Read More</a>
    </div>
  );
}

export default New;
