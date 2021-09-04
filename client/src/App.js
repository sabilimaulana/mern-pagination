import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import Pagination from "./components/Pagination";

const App = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/v1/posts?page=${page}`);

        const { data, pages: totalPages } = await res.json();

        setPages(totalPages);
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="app">
      <Pagination page={page} pages={pages} changePage={setPage} />
      <div className="app__posts">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
      <Pagination page={page} pages={pages} changePage={setPage} />
    </div>
  );
};

export default App;
