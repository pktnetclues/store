import React, { useEffect, useState } from "react";

import axios from "axios";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  //   const pImages = JSON.parse(products);
  //   const getProcutImages = pImages.procutImages;
  //   const procutImages = JSON.parse(getProcutImages);

  //   console.log(pImages);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/get/products",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status == 200) {
        setProducts(response.data.products);
      }
    } catch (error) {}
  };
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        // width: "100vw",
        marginTop: "100px",
      }}
    >
      <h3>Products</h3>

      <div
        className="d-flex flex-wrap justify-content-center align-items-center"
        // style={{
        //   width: "90%",
        // }}
      >
        {products.map((product) => {
          var productImagesArray = JSON.parse(product.productImages);
          return (
            <div className="m-4" key={product.productId}>
              <div
                className="card border-0 rounded-0 shadow"
                style={{
                  width: "300px",
                }}
              >
                {productImagesArray.map((image) => {
                  <img
                    src={image}
                    className="card-img-top rounded-0"
                    alt="..."
                  />;
                })}
                <div className="card-body mt-3 mb-3">
                  <div className="row">
                    <div className="col-10">
                      <h4 className="card-title">{product.productName}</h4>
                      {/* <p className="card-text">{product.productDesc}</p> */}
                    </div>
                    <div className="col-2">
                      <i className="bi bi-bookmark-plus fs-2"></i>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center text-center g-0">
                  <div className="col-4">
                    <h5>₹ {product.productPrice}</h5>
                  </div>
                  <div className="col-8">
                    <a
                      href="#"
                      className="btn btn-dark w-100 p-3 rounded-0 text-warning"
                    >
                      ADD TO CART
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProducts;
