import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] =  useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load product details');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container"><p>Loading...</p></div>;
    if (error) return <div className="container"><p>{error}</p></div>;
    if (!product) return <div className="container"><p>Product not found</p></div>;

    return (
        <div className="container">
            <div className="detail-card">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="detail-image" />
                ) :( 
                    <div className="image-placeholder detail-placeholder">No Image</div>
                )}
                
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>

                <Link to="/" className='back-btn'>Back to Products</Link>
            </div>
        </div>
    );
};

export default ProductDetail;