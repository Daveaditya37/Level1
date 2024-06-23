import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFormValidation from './validation';
import './App.css'; // Import CSS for styling

const validate = (values, isAttendingWithGuest) => {
    let errors = {};

    if (!values.name) {
        errors.name = 'Name is required';
    }

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email is invalid';
    }

    if (!values.age) {
        errors.age = 'Age is required';
    } else if (isNaN(values.age) || values.age <= 0) {
        errors.age = 'Age must be a number greater than 0';
    }

    if (isAttendingWithGuest && !values.guestName) {
        errors.guestName = 'Guest Name is required';
    }

    return errors;
};

const Form = () => {
    const [isAttendingWithGuest, setIsAttendingWithGuest] = useState(false);
    const { values, errors, handleChange, handleBlur, handleSubmit } = useFormValidation(
        { name: '', email: '', age: '', guestName: '' },
        validate,
        submitForm
    );

    const navigate = useNavigate();

    function submitForm() {
        // Form submission logic can go here (e.g., send data to backend or display summary)
        // For now, navigate to the summary page with form data
        navigate('/summary', { state: { formData: { ...values, isAttendingWithGuest } } });
    }

    const handleGuestOptionChange = (e) => {
        setIsAttendingWithGuest(e.target.value === 'yes');
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Event Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="label-text">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="label-text">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="age" className="label-text">Age:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="input-field"
                    />
                    {errors.age && <span className="error-message">{errors.age}</span>}
                </div>
                <div className="form-group">
                    <label className="label-text">Are you attending with a guest?</label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="isAttendingWithGuest"
                                value="yes"
                                checked={isAttendingWithGuest}
                                onChange={handleGuestOptionChange}
                            />
                            Yes
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="isAttendingWithGuest"
                                value="no"
                                checked={!isAttendingWithGuest}
                                onChange={handleGuestOptionChange}
                            />
                            No
                        </label>
                    </div>
                </div>
                {isAttendingWithGuest && (
                    <div className="form-group">
                        <label htmlFor="guestName" className="label-text">Guest Name:</label>
                        <input
                            type="text"
                            id="guestName"
                            name="guestName"
                            value={values.guestName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="input-field"
                        />
                        {errors.guestName && <span className="error-message">{errors.guestName}</span>}
                    </div>
                )}
                <div className="form-group">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Form;
