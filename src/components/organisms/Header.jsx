import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import AuthModal from "@/components/organisms/AuthModal";

const Header = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <ApperIcon name="Home" size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                StayFinder
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/explore" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Explore
              </Link>
              <button
                onClick={handleWishlistClick}
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors font-medium"
              >
                <ApperIcon name="Heart" size={16} />
                Saved
              </button>
              <Link 
                to="/help" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Help
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAuthModal(true)}
                className="hidden sm:flex"
              >
                Host your home
              </Button>
              
              <button
                onClick={handleWishlistClick}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="Heart" size={20} className="text-gray-600" />
              </button>

              <button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 p-2 border border-gray-300 rounded-full hover:shadow-md transition-all"
              >
                <ApperIcon name="Menu" size={16} className="text-gray-600" />
                <ApperIcon name="User" size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <nav className="flex justify-around py-2">
            <Link 
              to="/explore" 
              className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-primary transition-colors"
            >
              <ApperIcon name="Search" size={20} />
              <span className="text-xs">Explore</span>
            </Link>
            <button
              onClick={handleWishlistClick}
              className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-primary transition-colors"
            >
              <ApperIcon name="Heart" size={20} />
              <span className="text-xs">Saved</span>
            </button>
            <Link 
              to="/help" 
              className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-primary transition-colors"
            >
              <ApperIcon name="HelpCircle" size={20} />
              <span className="text-xs">Help</span>
            </Link>
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex flex-col items-center gap-1 py-2 px-4 text-gray-600 hover:text-primary transition-colors"
            >
              <ApperIcon name="User" size={20} />
              <span className="text-xs">Log in</span>
            </button>
          </nav>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;