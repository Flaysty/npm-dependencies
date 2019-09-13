import React from 'react';

export const InputField = ({ field, form: { errors, touched }, ...props }) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return (
        <>
            <input className="input" {...field} {...props} error={errorMessage} />
            {errorMessage && <div className="error">{errorMessage}</div>}
        </>
    );
}