import React, { useState, useEffect } from "react";
import "../css/sort.css"; 

export const Sort = () => {
    const [items, setItems] = useState([]);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
            setItems(JSON.parse(storedData));
        }
    }, []);

    const handleSortFieldChange = (e) => {
        setSortField(e.target.value);
        setError(''); 
    };

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
        setError(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!sortField || !sortOrder) {
            setError("Please select both a field and an order.");
            return;
        }

        const sortedItems = [...items].sort((a, b) => {
            if (sortOrder === "asc") {
                return parseInt(a[sortField]) - parseInt(b[sortField]);
            } else {
                return parseInt(b[sortField]) - parseInt(a[sortField]);
            }
        });

        setItems(sortedItems);
        setError(""); 
    };

    return (
        <div className="sort-container">
            <h2>Sort Items</h2>
            <form onSubmit={handleSubmit} className="sort-form">
                <div className="form-group">
                    <label htmlFor="sortField">Sort By:</label>
                    <select
                        id="sortField"
                        name="sortField"
                        value={sortField}
                        onChange={handleSortFieldChange}
                    >
                        <option value="" disabled>Select Field...</option>
                        <option value="quantity">Quantity</option>
                        <option value="price">Price</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="sortOrder">Order:</label>
                    <select
                        id="sortOrder"
                        name="sortOrder"
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                    >
                        <option value="" disabled>Select Order...</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Sort</button>
                <br />
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

            {items.length > 0 ? (
                <table className="sorted-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.uid}>
                                <td>{item.uid}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-items">No items to display</p>
            )}
        </div>
    );
};
