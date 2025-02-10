import { useEffect, useState } from "react";
import { News } from "./services/BringData.js";
import "./App.css";
import New from "./components/New.jsx";

function App() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function bringNews() {
      const data = await News();
      if (data) {
        setNews(data.results);
      } else {
        setError("We couldn't bring the news...");
      }
    }
    bringNews();
  }, []);

  return (
    <>
      <header className="sl-header">
        <nav className="sl-header-nav">
          <h1> 🚀 SPACE FLIGHT NEWS</h1>
          <form>
            <input
              className="sl-header-input"
              placeholder="Space X, Elon Musk..."
            ></input>
            <button className="sl-header-button">Search</button>
          </form>
        </nav>
      </header>
      <main className="sl-main">
        {news.map((item) => (
          <New
            key={item.id}
            title={item.title}
            image={item.image_url}
            author={item.authors[0].name}
            summary={item.summary}
            publishedAt={item.published_at}
            url={item.url}
          ></New>
        ))}
      </main>
    </>
  );
}

export default App;
