import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";

export default function News(props) {

  const apiKey = "8f3c56e3568c48548cde786e0d687833";

  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalResults, setTotalResults] = useState(0);

  //   document.title =
  //     props.category === "general"
  //       ? "DailyNews - Stay Informed with the latest news"
  //       : `${this.capitalizeString(props.category)} - DailyNews`;
  // }

  const capitalizeString = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const fetchArticles = async() => {
    try {
      props.setProgress(25);
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=15`;
      setLoading(true);
      const response = await fetch(url);
      props.setProgress(50);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const parsedData = await response.json();
      props.setProgress(75);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      
    } catch (error) {
      console.error("Failed to fetch articles:", error);
      setLoading(false);
    }
    props.setProgress(100);
  }

  const fetchMoreData = async() => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${
        props.category
      }&apiKey=${apiKey}&page=${page + 1}&pageSize=15`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const parsedData = await response.json();
      setArticles([...articles, ...parsedData.articles]);
      setPage(page + 1);
      setTotalResults(parsedData.totalResults);
      
    } catch (error) {
      console.error("Failed to fetch more articles:", error);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

    return (
      <div className="container my-4" style={{ maxWidth: "95%" }}>
        <h3
          className="text-center mb-4"
          style={{ fontWeight: "bold", color: "#333" }}
        >
          {props.heading}
        </h3>
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Loading height="100px" width="110px" />
          </div>
        )}
        {!loading && (
          <InfiniteScroll
            dataLength={articles.length}
            next={() => fetchMoreData()}
            hasMore={articles.length < totalResults}
            loader={
              <div className="d-flex justify-content-center my-4">
                <Loading height="80px" width="80px" />
              </div>
            }
          >
            <div className="container row gx-4 gy-4" style={{margin: 'auto'}}>
              {articles.map((elem, index) => (
                <div className="col-12 col-sm-6 col-md-2 col-lg-3" key={index}>
                  <NewsItem
                    title={elem.title || "No Title Available"}
                    description={elem.description || "No Description Available"}
                    imageURL={
                      elem.urlToImage ||
                      "https://www.hwupgrade.it/i/n/MacBookProM4_720.jpg"
                    }
                    url={elem.url}
                    dated={new Date(elem.publishedAt).toLocaleDateString()}
                    source={elem.source.name}
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
