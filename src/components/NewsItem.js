import React from "react";

export default function NewsItem(props) {

  const getFormattedText = (string, isDesc) => {
    if (!string) return "Not Found";
    return isDesc
      ? getStringByLength(string, 50)
      : getStringByLength(string, 40);
  };

  const getStringByLength = (string, length) => {
    return string.length >= length ? string.slice(0, length) + "...." : string;
  };
  
  return (
    <div className="card my-3" style={{ position: "relative" }}>
      <span
        className="position-absolute badge rounded-pill bg-danger"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          right: 0,
        }}
      >
        {props.source}
      </span>
      <img
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "0.25rem",
        }}
        src={
          props.imageURL
            ? props.imageURL
            : "https://ichef.bbci.co.uk/news/1024/branded_news/a5cc/live/e05ff1d0-c5c8-11ef-a0f2-fd81ae5962f4.jpg"
        }
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{getFormattedText(props.title, false)}</h5>
        <p className="card-text">{getFormattedText(props.description, true)}</p>
        <p className="card-text">{props.dated}</p>
        <a rel="noreferer" href={props.url} className="btn btn-dark" target="_blank">
          Read More
        </a>
      </div>
    </div>
  );
}
