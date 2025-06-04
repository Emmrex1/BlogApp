import React from "react";
import Helmet from '../../../assets/logo/premium_photo.jpeg'
import { Link } from "react-router-dom";
const About = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 px-6 py-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-indigo-700">
          About Us
        </h1>

        <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          We're passionate about building meaningful digital experiences.
          Whether it’s developing scalable applications or designing delightful
          interfaces, our mission is to deliver excellence with every line of
          code.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Who We Are</h2>
            <p className="text-gray-600">
              We’re a team of full-stack developers, designers, and strategists
              with a shared vision of creating high-impact software solutions.
              Our approach is rooted in clean design, efficient code, and
              user-focused thinking.
            </p>
            <p className="text-gray-600">
              With experience in React, Node.js, Laravel, and cloud
              technologies, we help businesses scale and innovate faster. We
              believe in continuous learning and evolving with emerging tech
              trends.
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img
              src={Helmet}
              alt="Team working"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "Custom Web Development",
              "Mobile App Development",
              "UI/UX Design",
              "API Integration",
              "SEO Optimization",
              "Cloud Deployment",
            ].map((item, idx) => (
              <li
                key={idx}
                className="bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-3 rounded-lg shadow-sm text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Want to collaborate?
          </h3>
          <p className="text-gray-600 mb-4">
            Let’s build something great together. Contact us to get started.
          </p>
          <Link to="/contact-us"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition"
          >
            Contact Us
          
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
