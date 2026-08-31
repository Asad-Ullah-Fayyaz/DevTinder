const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full text-gray-300 align-bottom" >
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-white">YourBrand</h2>
            <p className="mt-3 text-sm text-gray-400">
              Building modern web experiences with clean and scalable solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-medium text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-medium text-white">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 mt-3">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">LinkedIn</a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;