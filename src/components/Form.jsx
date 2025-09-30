import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    country: "India",
    termsAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [showpassword, setshowpassword]= useState({
    password: false,
    confirmPassword: false
  })

  function togglePasswordVisibility(field) {
    setshowpassword(prevState => ({
      ...prevState,
      [field]: !prevState[field] 
    }))  
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  }

  function validate() {
    const newError = {};
    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (formData.username.length < 3) {
      newError.username = "Username must be at least 3 characters long";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newError.email = "Invalid email format";
    }

    if (!strongPassword.test(formData.password)) {
      newError.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newError.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.termsAccepted) {
      newError.termsAccepted = "You must accept the terms and conditions";
    }

    return newError;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
      // Proceed with form submission (e.g., send data to server)
    } else {
      setIsSubmit(false);
    }
  }

  if (isSubmit) {
    return (
      <div className="form-success">
        <h3>Thank you, {formData.username}!</h3>
        <p>Your registration was successful.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="username">
        Username
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {formErrors.username && (
          <p className="error">{formErrors.username}</p>
        )}
      </label>

      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p className="error">{formErrors.email}</p>}
      </label>

      <label htmlFor="password">
        Password
        <div className="password-wrapper">
          <input
            type={showpassword.password ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button 
            type="button" 
            className="password-toggle-btn" 
            onClick={() => togglePasswordVisibility('password')}
          >
            {showpassword.password ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {formErrors.password && (
          <p className="error">{formErrors.password}</p>
        )}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password
        <div className="password-wrapper">
          <input
            type={showpassword.confirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button 
            type="button" 
            className="password-toggle-btn" 
            onClick={() => togglePasswordVisibility('confirmPassword')}
          >
            {showpassword.confirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {formErrors.confirmPassword && (
          <p className="error">{formErrors.confirmPassword}</p>
        )}
      </label>

      <label htmlFor="phoneNumber">
        Phone Number
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {formErrors.phoneNumber && (
          <p className="error">{formErrors.phoneNumber}</p>
        )}
      </label>

      <label htmlFor="country">
        Country
        <select
          name="country"
          id="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>
      </label>

      <label className="checkbox-label" htmlFor="termsAccepted">
        <input
          type="checkbox"
          id="termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />
        <span>
          I agree to the{" "}
          <a href="link-to-terms" target="_blank" rel="noopener noreferrer">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <a
            href="link-to-privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {formErrors.termsAccepted && (
        <p className="error">{formErrors.termsAccepted}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}