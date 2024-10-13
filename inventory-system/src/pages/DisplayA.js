import React, { useEffect, useState } from "react";
import "../css/displayA.css";

export const DisplayA = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const sortedData = parsedData.sort((a, b) => Number(a.uid) - Number(b.uid)); 
            setItems(sortedData);
        }
    }, []);

    return (
        <div className="table-container">
            <h2>All Items</h2>
            {items.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>UID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
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
                <p className="no-items">No items to display</p>
            )}
        </div>
    );
};
