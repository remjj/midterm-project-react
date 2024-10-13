import React, { useState } from "react";
import "../css/additem.css";

export const AddItem = () => {
    const [formData, setFormData] = useState({
        uid: '',
        name: '',
        quantity: '',
        price: '',
        category: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        const existingItems = JSON.parse(localStorage.getItem("formData")) || [];

        if (!formData.uid.trim()) {
            newErrors.uid = "ID is required";
        } else if (existingItems.some(item => item.uid === formData.uid)) {
            newErrors.uid = "ID already exists";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.quantity.trim()) {
            newErrors.quantity = "Quantity is required";
        }

        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        }

        if (!formData.category) {
            newErrors.category = "Category is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSuccessMessage('');
        } else {
            const updatedItems = [...existingItems, formData];
            localStorage.setItem("formData", JSON.stringify(updatedItems));

            setErrors({});
            setSuccessMessage('Item added successfully!');

            setFormData({
                uid: '',
                name: '',
                quantity: '',
                price: '',
                category: '',
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    return (
        <div className="add-item">
            <h2>Add Item</h2>
            <div className="form-handle">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="uid">Item ID:</label>
                        <input
                            type="text"
                            id="uid"
                            name="uid"
                            onChange={handleInputChange}
                            value={formData.uid}
                            placeholder="Enter Item ID"
                            className='form-control'
                        />
                        {errors.uid && <p style={{ color: 'red' }}>{errors.uid}</p>}
                        <br />
                    </div>

                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            value={formData.name}
                            placeholder="Enter Item Name"
                            className='form-control'
                        />
                        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                        <br />
                    </div>

                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            onChange={handleInputChange}
                            value={formData.quantity}
                            placeholder="Enter Item Quantity"
                            className='form-control'
                        />
                        {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
                        <br />
                    </div>

                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleInputChange}
                            value={formData.price}
                            placeholder="Enter Price"
                            className='form-control'
                        />
                        {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}
                        <br />
                    </div>

                    <div>
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            name="category"
                            onChange={handleInputChange}
                            value={formData.category}
                        >
                            <option value="" disabled>Select Category...</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                        {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
                        <br />
                    </div>

                    <button className='btn btn-primary' type="submit">Submit</button>
                    {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
                </form>
            </div>
        </div>
    );
};
