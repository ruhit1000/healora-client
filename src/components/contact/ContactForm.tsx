"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted successfully:", formData);
    
    setIsSubmitted(true);
    
    setFormData({ name: "", email: "", topic: "General Inquiry", message: "" });
  };

  if (isSubmitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-emerald-50/50 border border-emerald-100 rounded-healora space-y-3 min-h-95">
        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-neutral-text">Message Sent Successfully!</h3>
        <p className="text-xs text-slate-500 font-medium max-w-xs leading-relaxed">
          Thank you for reaching out. A support specialist will review your inquiry and email you back within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-2 text-xs font-bold text-brand-primary hover:underline cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Your Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe" 
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com" 
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium"
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">Topic</label>
        <select 
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium text-slate-600"
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Patient Booking Support">Patient Booking Support</option>
          <option value="Doctor Verification Status">Doctor Verification Status</option>
          <option value="Report a Bug / Issue">Report a Bug / Issue</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700">How can we help you?</label>
        <textarea 
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Type your message details here..." 
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-healora text-xs focus:outline-none focus:border-brand-primary focus:bg-white transition-all font-medium resize-none"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-xs rounded-healora transition-all shadow-sm hover:shadow-md cursor-pointer text-center"
      >
        Send Message
      </button>
    </form>
  );
}