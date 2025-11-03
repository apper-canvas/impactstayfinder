import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <ApperIcon name="MapPin" size={64} className="mx-auto text-primary mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. 
            The property you're searching for might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              <ApperIcon name="Home" size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/search">
            <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-6 rounded-lg transition-colors">
              <ApperIcon name="Search" size={20} className="mr-2" />
              Search Properties
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? <Link to="/help" className="text-primary hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;