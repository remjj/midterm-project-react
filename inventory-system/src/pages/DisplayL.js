import React, { useState, useEffect } from "react";
import "../css/displayA.css"; 

export const DisplayL = () => {
    const [lowStockItems, setLowStockItems] = useState([]);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("formData")) || [];
        const filteredItems = storedItems
            .filter(item => parseInt(item.quantity) <= 5)
            .sort((a, b) => a.uid.localeCompare(b.uid)); 
        setLowStockItems(filteredItems);
    }, []);

    return (
        <div className="table-container">
            <h2>Low Stock Items</h2>
            {lowStockItems.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockItems.map((item) => (
                            <tr key={item.uid}>
                                <td>{item.uid}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-items">No items with low stock.</p>
            )}
        </div>
    );
};
