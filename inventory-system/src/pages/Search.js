import React, { useState } from 'react';
import "../css/search.css"; 

export const Search = () => {
    const [searchID, setSearchID] = useState('');
    const [foundItem, setFoundItem] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const existingItems = JSON.parse(localStorage.getItem("formData")) || [];
        const item = existingItems.find(i => i.uid === searchID);

        if (item) {
            setFoundItem(item);
            setErrorMessage('');
        } else {
            setFoundItem(null);
            setErrorMessage('Item not found!');
        }
    };

    return (
        <div className="search-item">
            <h2>Search Item</h2>
            <form onSubmit={handleSearch}>
                <div>
                    <label htmlFor="searchID">Enter Item ID:</label>
                    <input
                        type="text"
                        id="searchID"
                        value={searchID}
                        onChange={(e) => setSearchID(e.target.value)}
                        placeholder="Search by Item ID"
                        className='form-control'
                    />
                </div>
                <button className='btn btn-primary' type="submit">Search</button>
                <br/>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>

            {foundItem && (
            <div className="search-table-container">
                <h3>Item Details</h3>
                <table className="search-table">
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
                        <tr>
                            <td>{foundItem.uid}</td>
                            <td>{foundItem.name}</td>
                            <td>{foundItem.quantity}</td>
                            <td>{foundItem.price}</td>
                            <td>{foundItem.category}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
        </div>
    );
};
