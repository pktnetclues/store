import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    productDesc: "",
    productPrice: "",
    category: "",
    productImages: [],
  });

  const authToken = localStorage.getItem("token");

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  const formsendData = {
    title: formData.title,
    description: formData.description,
    published_year: formData.published_year,
    author_name: formData.author_name,
    genre_name: formData.genre_name,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:4000/api/addBook`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send(JSON.stringify(formsendData));
    xhr.onload = function () {
      if (xhr.readyState === 4) {
        console.log(xhr);
        if (xhr.status === 200) {
          var json_obj = JSON.parse(xhr.responseText);
          if (json_obj.message === "success") {
            setFormData({
              book_id: "",
              title: "",
              description: "",
              published_year: "",
              author_name: "",
              genre_name: "",
            });
            toast.success("Book Added");
            navigate("/listdata");
          } else {
            toast.error("There is something wrong");
          }
        } else {
          toast.error("There is something wrong");
          console.error(xhr.statusText);
        }
      }
    };
    xhr.onerror = function () {
      toast.error("There is something wrong");
      console.error(xhr.statusText);
    };
  };

  return (
    <div className="sign-in__wrapper">
      <h3>Add Book</h3>
      <form className="shadow p-4 bg-white rounded" onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Book Name
          </label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            type="text"
            className="form-control"
            name="book_name"
            placeholder="Book Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Description
          </label>
          <textarea
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            type="text"
            className="form-control"
            name="description"
            placeholder="description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            published year
          </label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                published_year: e.target.value,
              })
            }
            type="number"
            className="form-control"
            name="year"
            placeholder="2002"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Author Name
          </label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                author_name: e.target.value,
              })
            }
            type="text"
            className="form-control"
            name="year"
            placeholder="Author Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Genre Name
          </label>
          <input
            onChange={(e) =>
              setFormData({
                ...formData,
                genre_name: e.target.value,
              })
            }
            type="text"
            className="form-control"
            name="year"
            placeholder="Novel"
          />
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Add Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
