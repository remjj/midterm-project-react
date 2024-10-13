import React, { useState } from 'react';
import "../css/displayc.css";

export const DisplayC = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setItems([]); 
        setError(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            setError("Please select a category.");
            return;
        }

        const existingItems = JSON.parse(localStorage.getItem("formData")) || [];
        const filteredItems = existingItems.filter(item => item.category === selectedCategory);

        if (filteredItems.length === 0) {
            setError("No items found for this category.");
            setItems([]); 
        } else {
            setItems(filteredItems);
            setError(''); 
        }
    };

    return (
        <div className="display-category">
            <h2>Display Items by Category</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Input Category:</label>
                <select
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <option value="" disabled>Select Category...</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                
                <button type="submit">Display Items</button>
                <br/>
                <br/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {items.length > 0 && (
                <div className="category-table-container">
                    <h3>Items in {selectedCategory}</h3>
                    <table className="category-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.uid}>
                                    <td>{item.uid}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
