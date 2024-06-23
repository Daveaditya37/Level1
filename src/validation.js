import { useState } from 'react';

const useFormValidation = (initialState, validate, onSubmit) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const validationErrors = validate(values, isAttendingWithGuest(values));
        setErrors({
            ...errors,
            [name]: validationErrors[name]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(values, isAttendingWithGuest(values));
        setErrors(validationErrors);
        setSubmitting(true);
        onSubmit();
    };

    const isAttendingWithGuest = (values) => {
        return values.isAttendingWithGuest === 'yes';
    };

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    };
};

export default useFormValidation;
