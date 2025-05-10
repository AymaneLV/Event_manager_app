// src/pages/FAQ.jsx
import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an event?",
      answer: "To create an event, go to the 'Create Event' page and fill out the form with details like title, description, date, location, and price. You’ll need to be logged in as an organizer."
    },
    {
      question: "Can I change my account type after registering?",
      answer: "Yes, you can change your role from the account settings. However, switching from organizer to attendee will hide your events until you switch back."
    },
    {
      question: "What are the fees for hosting an event?",
      answer: "Eventify charges a 5% service fee on ticket sales. Free events have no fees, but we recommend setting a minimum donation if applicable."
    },
    {
      question: "How do refunds work?",
      answer: "Refunds are handled through our payment gateway. As an organizer, you can issue refunds directly from the 'Your Events' dashboard."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via the 'Help Center' link in the navbar or by emailing support@eventify.com"
    }
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="faq-container">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button 
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => toggleAnswer(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              
              <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;