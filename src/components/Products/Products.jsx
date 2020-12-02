import React from "react";
import Gird from "@material-ui/core";
import Product from "./Product";

const products = [
  { id: 1, name: "Shoes", price: "$5", disc: "Running Shoes" },
  { id: 2, name: "Macbook", price: "$10", disc: "Apple macbook" },
];

function Products() {
  return (
    <main>
      <Gird container justify="center" spacing={4}>
        {products.map((product) => {
          <Gird key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Gird>;
        })}
      </Gird>
    </main>
  );
}

export default Products;
