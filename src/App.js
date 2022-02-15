import './App.css';
import React, { useState, createContext, useContext, useEffect } from 'react';


const SearchBar = () => {

  const { text, setText, stock, setStock } = useContext(SearchContext);

  useEffect(() => {
    console.log("Text is " + text)
  }, [text]);

  useEffect(() => {
    console.log("Stock is " + stock)
  }, [stock]);

  return (
    <form>
      <label>{" "}
        Search Products:
        {" "}
        <input
          type="text"
          name="text"
          placeholder="Search..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label><br />
      <label>
        <input
          type="checkbox"
          name="stock"
          value={stock}
          onChange={() => setStock(!stock)}
        />
        {" "}
        Only show products in stock
      </label>
    </form>
  )
}

const ProductTable = () => {
  return (
    <table>
      <TableHead />
      <Tables />
    </table>
  )
}

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
  )
}

const Tables = () => {
  const { text, stock, products } = useContext(SearchContext);
  const rows = [];
  let lastCategory = null;

  products.map((product, id) => {

    if (product.name.indexOf(text) === -1) {
      return;
    }

    if (stock && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <thead key={product.category}>
          <tr>
            <th colSpan="2" >
              {product.category}
            </th>
          </tr>
        </thead>
      );
    }
    rows.push(
      <tr key={id}>
        <td>{product.stocked ?
          product.name :
          <span style={{ color: "red" }}>
            {product.name}
          </span>}
        </td>
        <td>{product.price}</td>
      </tr>
    );

    lastCategory = product.category;
  });

  return (
    <tbody>
      {rows}
    </tbody>
  );
}

const ProductSearcher = () => {

  return (
    <>
      <SearchBar />
      <ProductTable />
    </>
  );
}

const SearchContext = createContext();

const PRODUCTS = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

const SearchProvider = ({ children }) => {

  const [text, setText] = useState("");
  const [stock, setStock] = useState(false);
  const [products, setProducts] = useState(PRODUCTS);

  return (
    <SearchContext.Provider value={{ text, setText, stock, setStock, products }}>
      {children}
    </SearchContext.Provider>
  );
}

const App = () => {
  return (
    <SearchProvider>
      <ProductSearcher />
    </SearchProvider>
  )
}

export default App;