'use client';

import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // You can send data to an API endpoint here
  };

  return (
    <div id="contact" className='bg-gradient-to-br from-blue-50
     via-white to-blue-100 p-6 sm:p-10'>

 <section
  className="w-full px-4 sm:px-6 py-16 rounded-2xl"
>
  <div className="max-w-3xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-700 mb-6 text-center">
      Contact Us
    </h2>
    <p className="text-gray-700 text-center mb-10 text-base sm:text-lg max-w-xl mx-auto">
      Have a question, suggestion, or issue? <p>We&apos;re here to help you!</p>

    </p>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-800 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-gray-800 font-medium mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl hover:cursor-pointer transition"
        >
          Send Message
        </button>
      </div>
    </form>
  </div>
</section>
    </div>


  );
};

export default Contact;
