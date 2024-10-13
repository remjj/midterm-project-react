import React, { useState } from "react";
import "../css/remove.css"; 

export const RemoveItem = () => {
    const [uid, setUid] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRemove = (e) => {
        e.preventDefault();
        const storedData = localStorage.getItem("formData"); 

        if (storedData) {
            const items = JSON.parse(storedData);
            const filteredItems = items.filter(item => item.uid !== uid);

            if (items.length === filteredItems.length) {
                setErrorMessage("No ID Found");
                setSuccessMessage('');
            } else {
                localStorage.setItem("formData", JSON.stringify(filteredItems));
                setSuccessMessage("Item removed successfully!");
                setErrorMessage('');
                setUid('');
            }
        } else {
            setErrorMessage("No items found");
        }
    };

    return (
        <div className="remove-item-container">
            <h2>Remove Item</h2>
            <div className="form-handle-remove">
                <form onSubmit={handleRemove}>
                    <div>
                        <label htmlFor="uid">Item ID:</label>
                        <input
                            type="text"
                            id="uid"
                            value={uid}
                            onChange={(e) => setUid(e.target.value)}
                            placeholder="Enter Item ID"
                            className='form-control'
                        />
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                        <br />
                    </div>
                    <button className='btn btn-primary' type="submit">Remove</button>
                </form>
            </div>
        </div>
    );
};
