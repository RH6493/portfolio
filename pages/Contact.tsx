import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const { data } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate backend API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="py-20 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-4"></div>
          <p className="text-text-muted">Feel free to reach out for collaborations or just a friendly hello.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="space-y-8">
             <div className="prose prose-lg dark:prose-invert text-text-muted">
                <p>
                    I'm currently looking for new opportunities, my inbox is always open. 
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
             </div>

             <div className="grid gap-6">
                <div className="flex items-center p-6 bg-surface rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text">Email</h4>
                        <p className="text-text-muted">{data.profile.email}</p>
                    </div>
                </div>
                
                <div className="flex items-center p-6 bg-surface rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text">Location</h4>
                        <p className="text-text-muted">{data.profile.location}</p>
                    </div>
                </div>

                 <div className="flex items-center p-6 bg-surface rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-primary/10 p-3 rounded-full text-primary mr-4">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-text">Phone</h4>
                        <p className="text-text-muted">{data.profile.phone}</p>
                    </div>
                </div>
             </div>
          </div>

          {/* Contact Form */}
          <div className="bg-surface p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold text-text mb-6">Send Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-text resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full py-4 rounded-lg font-bold text-white flex items-center justify-center transition-all ${
                  status === 'success' 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-primary hover:bg-blue-700'
                }`}
              >
                {status === 'sending' ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : status === 'success' ? (
                  'Message Sent Successfully!'
                ) : (
                  <>Send Message <Send size={18} className="ml-2" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;