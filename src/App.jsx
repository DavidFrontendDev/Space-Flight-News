import { useEffect, useRef, useState } from "react";
import { News } from "./services/BringData.js";
import "./App.css";
import New from "./components/New.jsx";

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [error, setError] = useState(null);
  const [newPage, setNewPage] = useState(
    "https://api.spaceflightnewsapi.net/v4/articles/?format=json"
  );
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const inputValue = useRef(null);

  useEffect(() => {
    async function bringNews() {
      try {
        const data = await News(newPage);
        if (data && data.results) {
          setNews(data.results);
          setFilteredNews(data.results);
          setNextPage(data.next);
          setPreviousPage(data.previous);
          setError(null);
        } else {
          setError("We couldn't bring the news...");
        }
      } catch (error) {
        setError("An error occurred while fetching the news.");
        console.error(error);
      }
    }
    bringNews();
  }, [newPage]);

  const handlePrevious = () => {
    if (previousPage) {
      setNewPage(previousPage);
    }
  };

  const handleNext = () => {
    if (nextPage) {
      setNewPage(nextPage);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    const query = inputValue.current.value.toLowerCase();
    const filtered = news.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query)
    );
    setFilteredNews(filtered);
    inputValue.current.value = "";
  };

  return (
    <>
      <header className="sl-header">
        <nav className="sl-header-nav">
          <h1> 🚀 SPACE FLIGHT NEWS</h1>
          <form onSubmit={handleSearch}>
            <input
              ref={inputValue}
              className="sl-header-input"
              placeholder="Space X, Elon Musk..."
            />
            <button type="submit" className="sl-header-button">
              Search
            </button>
          </form>
        </nav>
      </header>
      <main className="sl-main">
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <New
              key={item.id}
              title={item.title}
              image={item.image_url}
              author={item.authors[0]?.name || "Unknown Author"}
              summary={item.summary}
              publishedAt={item.published_at}
              url={item.url}
            />
          ))
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>No news found.</p>
            <button
              onClick={() => setFilteredNews(news)}
              className="sl-header-button"
            >
              Reset News
            </button>
          </div>
        )}
      </main>

      <footer
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <button
          style={{ marginRight: "5px" }}
          className={!previousPage ? "" : "sl-header-button"}
          onClick={handlePrevious}
          disabled={!previousPage}
        >
          Previous
        </button>
        <button
          className={!nextPage ? "" : "sl-header-button"}
          onClick={handleNext}
          disabled={!nextPage}
        >
          Next
        </button>
      </footer>
    </>
  );
}

export default App;
