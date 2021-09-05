import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import Card from "./components/Card";
import Pagination from "./components/Pagination";

const App = ({ match }) => {
  const history = useHistory();

  const pageNumber = match.params.pageNumber || 1;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(+pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/v1/posts?page=${page}`);
        history.push(`/page/${page}`);
        const { data, pages: totalPages } = await res.json();

        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Some error occured");
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, history]);

  return (
    <div className="app">
      {loading ? (
        <h3 className="loading-text">Loading...</h3>
      ) : error ? (
        <h3 className="error-text">{error}</h3>
      ) : (
        <>
          <Pagination page={page} pages={pages} changePage={setPage} />
          <div className="app__posts">
            {posts?.map((post, index) => (
              <Card key={post.id + `${index}`} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={pages} changePage={setPage} />
        </>
      )}
    </div>
  );
};

export default App;
