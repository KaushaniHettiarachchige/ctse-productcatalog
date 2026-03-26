// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [search, setSearch] = useState('');
//     const [category, setCategory] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         axios
//             .get('http://localhost:5000/api/products')
//             .then((res) => {
//                 setProducts(res.data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 console.error(err);
//                 setError('Failed to load products');
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <div className="container"><p>Loading products...</p></div>;
//     if (error) return <div className="container"><p>{error}</p></div>;

//     return (
//         <div className="container">
//             <h1>Product Catalog</h1>

//             {products.length === 0 ? (
//                 <p>No products found </p>
//             ): (
//                 <div className="product-grid">
//                     {products.map((product) => (
//                         <div className="product-card" key={product._id}>
//                             {product.imageUrl ? (
//                                 <img src={product.imageUrl} alt={product.name} className="product-image" />
//                             ) : (
//                                 <div className="image-placeholder">No Image</div>
//                             )}

//                             <h2>{product.name}</h2>
//                             <p>{product.description}</p>
//                             <p><strong>Category:</strong> {product.category}</p>
//                             <p><strong>Price:</strong> ${product.price}</p>
//                             <p><strong>Stock:</strong> {product.stock}</p>

//                             <Link to={`/product/${product._id}`} className="view-btn">
//                                 View Details
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductList;

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      let url = 'http://localhost:5000/api/products?';

      if (search) {
        url += `search=${encodeURIComponent(search)}&`;
      }

      if (category) {
        url += `category=${encodeURIComponent(category)}&`;
      }

      const res = await axios.get(url);
      setProducts(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleClear = async () => {
    try {
      setLoading(true);
      setSearch('');
      setCategory('');
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Product Catalog</h1>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="search-btn">
            <FaSearch />
          </button>
        </form>

        <select
          className="category-dropdown"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>

        <button type="button" className="clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="image-placeholder">No Image</div>
              )}

              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>

              <Link to={`/product/${product._id}`} className="view-btn">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;