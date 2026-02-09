import React from 'react'
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    subject: '',
    message: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));

    if (errors[id]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Store the submitted data
    setSubmittedData({ ...formData });
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      mobileNumber: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className='min-h-screen pt-20 bg-gray-50'>
      <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Contact Form
          </h1>
          <p className='text-gray-600'>
            Fill out the form below and see your data displayed
          </p>
        </div>

        {/* Contact Form */}
        <div className='bg-white rounded-xl shadow-md p-6 mb-8'>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="fullName">
                Full Name <span className='text-red-500'>*</span>
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter Your Full Name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="email">
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Your Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="mobileNumber">
                Mobile Number <span className='text-red-500'>*</span>
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                type="tel"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter Your Mobile Number"
                maxLength="10"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
              )}
            </div>

            {/* Subject */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="subject">
                Subject <span className='text-red-500'>*</span>
              </label>
              <select
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select a Subject</option>
                <option value="product">Product Inquiry</option>
                <option value="quote">Request a Quote</option>
                <option value="technical">Technical Support</option>
                <option value="visit">Schedule a Visit</option>
                <option value="other">Other</option>
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="message">
                Message <span className='text-red-500'>*</span>
              </label>
              <textarea
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Enter your message here..."
                rows="4"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className='w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-300'
            >
              Submit Form
            </button>
          </form>
        </div>

        {/* Display Submitted Data */}
        {submittedData && (
          <div className='bg-white rounded-xl shadow-md p-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>Submitted Data</h2>
            <div className='space-y-3'>
              <div>
                <span className='font-semibold text-gray-700'>Full Name:</span>
                <span className='ml-2 text-gray-900'>{submittedData.fullName}</span>
              </div>
              <div>
                <span className='font-semibold text-gray-700'>Email:</span>
                <span className='ml-2 text-gray-900'>{submittedData.email}</span>
              </div>
              <div>
                <span className='font-semibold text-gray-700'>Mobile Number:</span>
                <span className='ml-2 text-gray-900'>{submittedData.mobileNumber}</span>
              </div>
              <div>
                <span className='font-semibold text-gray-700'>Subject:</span>
                <span className='ml-2 text-gray-900 capitalize'>
                  {submittedData.subject.replace(/_/g, ' ')}
                </span>
              </div>
              <div>
                <span className='font-semibold text-gray-700'>Message:</span>
                <p className='mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg'>
                  {submittedData.message}
                </p>
              </div>
              <div className='pt-4 border-t'>
                <p className='text-sm text-gray-500'>
                  Submitted on: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact;