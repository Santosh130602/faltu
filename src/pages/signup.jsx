// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaGoogle } from "react-icons/fa";
// import { FaFacebook } from "react-icons/fa";
// import logsig from "../assets/siglogin.png"

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     setSuccess('');

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }

//     // Simulate signup process
//     await new Promise(resolve => setTimeout(resolve, 2000));

//     console.log('Form Data:', formData);
//     setIsLoading(false);
//   };
//   const handleFacebookLogin = () => {
//     // Implement Facebook login logic here
//     console.log('Facebook login clicked');
//   };

//   const handleGoogleLogin = () => {
//     // Implement Google login logic here
//     console.log('Google login clicked');
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 gap-16">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
//         <h2 className="text-2xl font-bold text-center">Sign Up</h2>
//         {error && <div className="text-red-500 text-center">{error}</div>}
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//               required
//             />
//           </div>
//           <div className='flex justify-between gap-6'>
//             <input
//               type="text"
//               name="firstName"
//               placeholder="First Name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//               required
//             />
          
//             <input
//               type="text"
//               name="lastName"
//               placeholder="Last Name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//               required
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               name="confirmPassword"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
//               required
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Signing Up...' : 'Sign Up'}
//             </button>
//           </div>
//         </form>
//         <div className="flex items-center justify-around gap-8">
//           <button
//             onClick={handleFacebookLogin}
//             className="w-full flex gap-4 items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
//           >
//            <FaFacebook/> Facebook
//           </button>
//           <button
//             onClick={handleGoogleLogin}
//             className="w-full flex gap-4 items-center px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800 focus:outline-none focus:bg-red-800"
//           >
//            <FaGoogle/> Google
//           </button>
//         </div>
//         <div className="mt-4 text-center">
//           <p className="text-gray-700">
//             Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
//           </p>
//         </div> 
        
//       </div>
//       <div className='w-60% ml-8'>
//          <img src={logsig} alt='logsig' ></img>
//         </div>
//     </div>
//   );
// };

// export default Signup;









import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import logsig from "../assets/siglogin.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(`Signup successful `);
      } else {
        setError(result.message || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
    console.log('Facebook login clicked');
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 gap-16">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-500 text-center">{success}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className='flex justify-between gap-6'>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-around gap-8">
          <button
            onClick={handleFacebookLogin}
            className="w-full flex gap-4 items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
          >
           <FaFacebook/> Facebook
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex gap-4 items-center px-4 py-2 text-white bg-red-600 rounded hover:bg-red-800 focus:outline-none focus:bg-red-800"
          >
           <FaGoogle/> Google
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-700">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div> 
        
      </div>
      <div className='w-60% ml-8'>
         <img src={logsig} alt='logsig' ></img>
        </div>
    </div>
  );
};

export default Signup;
