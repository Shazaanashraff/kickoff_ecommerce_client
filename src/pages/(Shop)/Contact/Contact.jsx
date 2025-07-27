import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section className="bg-white min-h-screen pt-28 pb-24">
      {/* Constrain & center horizontally */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Contact Card */}
        <div className="grid md:grid-cols-2 gap-12 rounded-2xl border border-gray-200 shadow-sm bg-white p-8 md:p-12">
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-4xl font-serif font-semibold mb-6">
              GET IN TOUCH WITH US
            </h2>

            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-5 h-5" />
                <span className="uppercase tracking-wide">
                  support@jimthompson.com
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-5 h-5" />
                <span>+66 (0) 2 700 2801</span>
              </div>
            </div>

            <hr className="my-8 border-gray-300" />

            <div>
              <h3 className="text-xl font-serif font-semibold mb-2">
                Speak to Our CEO
              </h3>
              <p className="italic text-gray-600 mb-2">
                Every Jim Thompson experience tells a story, and yours is important to us.
              </p>
              <p className="text-gray-700 mb-2">
                Share your thoughts with our Group CEO, Frank Cancelloni, at <br />
                <a
                  href="mailto:frank.cancelloni@jimthompson.com"
                  className="underline"
                >
                  frank.cancelloni@jimthompson.com
                </a>
              </p>
              <p className="text-gray-500 text-sm">
                You’ll receive a personal response within 48 hours.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Name*"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
            <input
              type="email"
              placeholder="Email address*"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded px-3 py-3 bg-white text-gray-700"
                defaultValue="+66"
              >
                <option value="+66">+66</option>
                <option value="+94">+94</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              />
            </div>
            <textarea
              rows={5}
              placeholder="Message*"
              className="w-full border border-gray-300 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-500 hover:bg-gray-700 text-white py-3 rounded font-medium transition-colors"
            >
              SEND
            </button>
          </form>
        </div>

        {/* Shop Opening Soon Section */}
        <div className="mt-20 border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12 text-center bg-gray-50">
          <h3 className="text-3xl font-bold mb-4">Shop Opening Soon</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            We’re working hard behind the scenes to launch our physical and online store.
            Expect high-quality products and a world-class shopping experience.
          </p>
          {/* Placeholder image area */}
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg">[ Shop ]</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
