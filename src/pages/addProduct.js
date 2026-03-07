import { useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const AddProductForm = () => {

    const [form, setForm] = useState({
        name: '',
        price: '',
        description: ''
    });

    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("image", image);

    await API.post("/auth/addProduct", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

    return (
        <div>
            <h3>Add New Product</h3>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    onChange={handleChange}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit">Add Product</button>

            </form>

            <Link to="/getProduct">Back to Products List</Link>
        </div>
    );
};

export default AddProductForm;