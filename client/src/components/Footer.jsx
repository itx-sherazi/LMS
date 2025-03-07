import { FacebookIcon, InstagramIcon, LinkedinIcon, MapPinIcon, PhoneIcon, TwitterIcon } from 'lucide-react';
import React from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaPinterest } from 'react-icons/fa';


function Footer() {
  return (
    <footer className="bg-[#333333] text-white ">
      {/* Newsletter Section */}
      <div className="bg-[#E87E04] py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <FaEnvelope className="h-6 w-6 mr-2" />
            <h2 className="text-lg font-semibold">Subscribe Our Newsletter</h2>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-auto">
            <input type="text" placeholder="Enter Your Name" className="bg-white text-gray-800 px-4 py-2 rounded-l-md md:rounded-r-none mb-2 md:mb-0 md:mr-2 w-full md:w-64" />
            <input type="email" placeholder="Enter Your Email" className="bg-white text-gray-800 px-4 py-2 rounded-md md:rounded-l-none mb-2 md:mb-0 md:mr-2 w-full md:w-64" />
            <button className="bg-gray-800 text-white px-4 py-2 font-bold  hover:bg-orange-500 rounded-md w-full md:w-auto">Submit</button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pl-3">
          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold  mb-4">Contact Us</h3>
            <div className="flex items-start mb-2">
              <MapPinIcon className="h-7 w-7 mr-2 text-orange-500" />
              <p>110 Lorence Road, Los Angeles County, CA, USA</p>
            </div>
            <div className="flex items-center mb-2">
              <PhoneIcon className="h-5 w-5 mr-2 text-orange-500" />
              <p>+1(902)-720-7016</p>
            </div>
            <div className="flex items-center">
              <FaEnvelopeOpen className="h-5 w-5 mr-2 text-orange-500" />
              <p>infomail@email.com</p>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="">
              <li>Home</li>
              <li>Blog</li>
              <li>Contact Us</li>
              <li>Gallery</li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <p>Mon-Tues 6.00 am-10.00 pm</p>
            <p>Wednes-Thurs 8.00 am-6.00 pm</p>
            <p>Fri 3.00 pm-8.00 pm</p>
            <p>Sun Closed</p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <FacebookIcon className="h-6 w-6 hover:text-orange-400" />
              <InstagramIcon className="h-6 w-6 hover:text-orange-400" />
              <FaPinterest className="h-6 w-6 hover:text-orange-400" />
              <LinkedinIcon className="h-6 w-6 hover:text-orange-400" />
              <TwitterIcon className="h-6 w-6 hover:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4 px-4">
        <div className="  flex items-center justify-center text-3xl">
          
          <p className="text-lg">Copyright © 2019 gurukul-education. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;