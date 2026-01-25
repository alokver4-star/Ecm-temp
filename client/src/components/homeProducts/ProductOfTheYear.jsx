import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const ProductOfTheYear = ({ 
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", 
  title = "Product of The Year",
  description = "Discover our most innovative and popular product that has captured hearts worldwide. Experience excellence in every detail.",
  buttonText = "Shop Now",
  link = "/shop"
}) => {
  return (
    <Link to={link} className="group block">
      <div className="w-full h-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 flex">
        {/* Left side - Image (15% width) */}
        <div className="w-[35%] mr-16 h-full bg-gray-50 flex items-center justify-center p-4">
          <img
            src={image}
            alt="productImage"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Right side - Content (85% width) */}
        <div className="w-[65%] h-full flex flex-col items-start justify-center px-8 md:px-12 gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg font-medium text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
          <Button className="px-8 py-4 text-lg font-semibold bg-black hover:bg-gray-800 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
            {buttonText}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductOfTheYear;
