import React from "react";
import { FooterLink2 } from "../../../data/footer-links";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {FooterLink2.map((section, index) => (
          <div key={index}>
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.link}
                    className="text-gray-400 hover:text-white transition duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center border-t border-gray-700 pt-5">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
