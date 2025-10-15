import React, { useState } from 'react';
export 

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isTeacher: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User signed up with:', formData);

    if (formData.isTeacher) {
      alert('Teacher account made!');
    } else {
      alert('Student account made!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Sign Up</h2>
      
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </label>
      
      <label>
        <input
          type="checkbox"
          name="isTeacher"
          checked={formData.isTeacher}
          onChange={handleChange}
        />
        Are you a teacher check?
      </label>
      
      <button type="submit">Sign Up</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '50px auto',
    gap: '10px',
  }
};

export default SignUp;
