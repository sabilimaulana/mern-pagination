import { useEffect, useState } from "react";
import "./App.css";

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

  console.log(posts);
  console.log(pages);

  return (
    <div className="App">
      {/* Pagination Component */}
      {/* Posts listing */}
      {/* Pagination Component */}
    </div>
  );
};

export default App;
