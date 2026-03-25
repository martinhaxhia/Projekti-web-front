import { useState, useEffect } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const GetProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get('/auth/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProducts();
    }, []);
    console.log(products);

    return (
        <div>
            <h2>Products List</h2>

            <Link to="/addProduct">Add New Product</Link>

            <ul>
                {products.map((product) => (
                    <li key={product.id} style={{marginBottom:"20px"}}>
                        
                        <h4>{product.name}</h4>

                        <p>${product.price}</p>

                        <img src={`http://localhost:5000/uploads/${product.media[0].image_path}`} alt='image'/>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetProduct;