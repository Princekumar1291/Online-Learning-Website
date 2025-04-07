import React, { useState } from 'react';
import countryCode from "../data/countrycode.json"
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message Sent Successfully");
    console.log(formData);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Get in Touch</h2>
        <p className="text-gray-400 mb-6 text-center">We'd love to hear from you. Please fill out this form.</p>

        <form method='post' onSubmit={handleSubmit}> 
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter first name" required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter last name" required />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email address" required />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone Number</label>
            <div className="flex ">
              <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="mt-1 p-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[130px]">
                {
                  countryCode.map((country, index) => (
                    <option key={index} value={country.code}>{country.country}</option>
                  ))
                }
              </select>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-r-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="12345 67890" required />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="4" className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your message here" required></textarea>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-yellow-500 text-gray-900 font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
