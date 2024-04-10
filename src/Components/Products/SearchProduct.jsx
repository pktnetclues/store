import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchProduct = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/api/profile/user`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status == 200) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-form">
      <Form onSubmit={handleSearch} className="d-flex search-form">
        <Form.Control
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search Books"
          className="me-2"
          aria-label="Search"
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      {/* {books.length > 0 ? (
        <div className="listdata mt-5">
          <h3>Books List</h3>
          <div className="main table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Launched</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => {
                  return (
                    <tr key={book.book_id}>
                      <td>{book.title}</td>
                      <td>{book.description}</td>
                      <td>{book.published_year}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default SearchProduct;
