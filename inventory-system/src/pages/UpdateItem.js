import React, { useState } from "react";
import "../css/update.css"; 

export const UpdateItem = () => {
    const [formData, setFormData] = useState({
        uid: '',
        fieldToUpdate: '', 
        newValue: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(''); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); 
        setSuccessMessage(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        const { uid, fieldToUpdate, newValue } = formData;

        if (!uid.trim()) {
            newErrors.uid = "Item ID is required!";
        }
        if (!fieldToUpdate) {
            newErrors.fieldToUpdate = "Field to update is required!";
        }
        if (!newValue.trim()) {
            newErrors.newValue = "New value is required!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setSuccessMessage(''); 
            return; 
        }

        const existingItems = JSON.parse(localStorage.getItem("formData")) || [];
        const item = existingItems.find((item) => item.uid === uid);

        if (item) {
            const oldValue = item[fieldToUpdate];
            item[fieldToUpdate] = newValue; 

    
            localStorage.setItem("formData", JSON.stringify(existingItems));

    
            setSuccessMessage(
                `${fieldToUpdate.charAt(0).toUpperCase() + fieldToUpdate.slice(1)} of item ${item.name} updated from ${oldValue} to ${newValue}`
            );
            setErrors({}); 
        } else {
            setErrors({ uid: 'Item not found!' }); 
            setSuccessMessage(''); 
        }
    };

    return (
        <div className="update-item">
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="uid">Item ID:</label>
                    <input
                        type="text"
                        id="uid"
                        name="uid"
                        value={formData.uid}
                        onChange={handleInputChange}
                        placeholder="Enter Item ID"
                        className='form-control'
                    />
                    {errors.uid && <p style={{ color: 'red' }}>{errors.uid}</p>}
                    <br/>
                </div>

                <div>
                    <label htmlFor="fieldToUpdate">Field to Update:</label>
                    <select
                        id="fieldToUpdate"
                        name="fieldToUpdate"
                        value={formData.fieldToUpdate}
                        onChange={handleInputChange}
                        className='form-control'
                    >
                        <option value="" disabled>Select Field to Update...</option>
                        <option value="quantity">Quantity</option>
                        <option value="price">Price</option>
                    </select>
                    {errors.fieldToUpdate && <p style={{ color: 'red' }}>{errors.fieldToUpdate}</p>}
                    <br/>
                </div>

                <div>
                    <label htmlFor="newValue">New Value:</label>
                    <input
                        type="number"
                        id="newValue"
                        name="newValue"
                        value={formData.newValue}
                        onChange={handleInputChange}
                        placeholder="Enter New Value"
                        className='form-control'
                    />
                    {errors.newValue && <p style={{ color: 'red' }}>{errors.newValue}</p>}
                    <br/>
                </div>

                <button className="btn btn-primary" type="submit">Update Item</button>
                {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
            </form>
        </div>
    );
};
