import { Facebook, Linkedin, Phone, Search, Twitter, Youtube } from "lucide-react";

import axiosInstance from "@/api/axiosInstace";





function StudentViewCommonHeader() {



  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", {}, { withCredentials: true });

      if (response.status === 200) {
        // Local storage clear karo
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");

        // Page reload ya redirect
        window.location.href = "/auth";
      }
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };
  return (
    <div>
      <header className="">
        <div className="w-full h-10 bg-orange-400 lg:flex hidden">
          <div className="flex justify-between w-full">
            <div className="left flex">
              <ul className="flex gap-4 pt-2 pl-4 items-center justify-center text-white text-sm">
                <li>BUSSINESS |</li>
                <li>BOTANICAL |</li>
                <li>HOSPITALITY |</li>
                <li>SCIENCE |</li>
                <li>IDEA GENERATION</li>
              </ul>
            </div>
            <div className="right flex text-white pt-2 pr-4 gap-3 text-sm">
              <Facebook />
              <Twitter />
              <Linkedin />
              <Youtube />
            </div>
          </div>
        </div>
        <div className="h-20 w-full bg-white lg:flex hidden justify-between items-center px-6">
          {/* Logo + Name */}
          <div className="flex items-center gap-4">
            <img
              className="w-16 h-16 object-contain"
              src="https://cdn.vectorstock.com/i/500p/63/61/education-logo-vector-11136361.jpg"
              alt="Education Spark Logo"
            />
            <h1 className="text-2xl font-bold text-orange-500">EDUCATION SPARK</h1>
          </div>

          {/* Contact Info + Button */}
          <div className="flex items-center gap-6">
            <div className="text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="text-orange-500" />
                <p className="text-orange-500">0324-5637307</p>
              </div>
              <p className="text-orange-500">support@educationspark.com</p>
            </div>

            <button className="px-4 py-2 border border-orange-500 text-orange-500 font-semibold rounded-md hover:bg-orange-500 hover:text-white transition">
              APPLY NOW
            </button>
          </div>
        </div>
        <div className="flex w-full h-20 border-orange-500 bg-orange-500  justify-between">
          <div>
            <ul className="flex gap-7 text-lg pl-5 text-white font-semibold items-center pt-6">
              <li>Home</li>
              <li>About</li>
              <li>Page</li>
              <li>Style Guide</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className=" text-3xl text-white  pt-7 pr-7 font-bold">
            <Search className="text-2xl font-bold" />
          </div>
        </div>

      </header>








    </div>
  );
}

export default StudentViewCommonHeader;