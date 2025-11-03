import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import BookingPanel from "@/components/organisms/BookingPanel";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { propertyService } from "@/services/api/propertyService";
import { wishlistService } from "@/services/api/wishlistService";
import { toast } from "react-toastify";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const loadProperty = async () => {
    try {
      setLoading(true);
      setError("");
      await new Promise(resolve => setTimeout(resolve, 300));
      const propertyData = await propertyService.getById(parseInt(id));
      
      if (!propertyData) {
        setError("Property not found");
        return;
      }

      setProperty(propertyData);

      // Load similar properties
      const allProperties = await propertyService.getAll();
      const similar = allProperties
        .filter(p => p.Id !== propertyData.Id && p.location.city === propertyData.location.city)
        .slice(0, 4);
      setSimilarProperties(similar);
    } catch (err) {
      setError("Failed to load property details. Please try again.");
      console.error("Error loading property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProperty();
    }
  }, [id]);

  const handleWishlistToggle = async () => {
    try {
      if (isWishlisted) {
        await wishlistService.removeItem(property.Id);
        toast.info("Removed from wishlist");
      } else {
        await wishlistService.addItem(property.Id);
        toast.success("Added to wishlist");
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  const handleSimilarPropertyWishlist = async (propertyId, isAdded) => {
    try {
      if (isAdded) {
        await wishlistService.addItem(propertyId);
      } else {
        await wishlistService.removeItem(propertyId);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Loading type="detail" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadProperty} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ApperIcon name="ArrowLeft" size={20} />
          <span>Back to search</span>
        </button>

        {/* Property Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <ApperIcon name="Star" size={16} className="text-accent fill-current" />
                <span className="font-semibold">{property.rating}</span>
                <span>({property.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <ApperIcon name="MapPin" size={16} />
                <span>{property.location.address}, {property.location.city}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button
              onClick={handleWishlistToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                isWishlisted 
                  ? "border-primary bg-primary/5 text-primary" 
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              <ApperIcon 
                name="Heart" 
                size={16} 
                className={isWishlisted ? "fill-current" : ""} 
              />
              <span>{isWishlisted ? "Saved" : "Save"}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              <ApperIcon name="Share" size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-xl overflow-hidden">
            <div className="md:col-span-2 aspect-[4/3] md:aspect-[2/1] relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowAllPhotos(true)}
              />
            </div>
            <div className="hidden md:grid grid-cols-1 gap-2">
              {property.images.slice(1, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full aspect-[4/3] object-cover cursor-pointer hover:brightness-75 transition-all"
                  onClick={() => setShowAllPhotos(true)}
                />
              ))}
            </div>
            <div className="hidden md:grid grid-cols-1 gap-2">
              {property.images.slice(3, 5).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`${property.title} ${index + 4}`}
                    className="w-full aspect-[4/3] object-cover cursor-pointer hover:brightness-75 transition-all"
                    onClick={() => setShowAllPhotos(true)}
                  />
                  {index === 1 && property.images.length > 5 && (
                    <button
                      onClick={() => setShowAllPhotos(true)}
                      className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold hover:bg-black/60 transition-colors"
                    >
                      +{property.images.length - 5} more
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="mt-4 md:hidden w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name="Grid3X3" size={16} />
            View all {property.images.length} photos
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Host Info */}
            <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
              <img
                src={property.host.avatar}
                alt={property.host.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  Hosted by {property.host.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  Joined {property.host.joinDate}
                  {property.host.verified && (
                    <span className="inline-flex items-center gap-1 ml-2">
                      <ApperIcon name="BadgeCheck" size={14} className="text-secondary" />
                      <span className="text-secondary text-xs">Verified</span>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Property Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border">
                  <ApperIcon name="Users" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.capacity.guests}</div>
                  <div className="text-sm text-gray-600">guests</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <ApperIcon name="Bed" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.capacity.bedrooms}</div>
                  <div className="text-sm text-gray-600">bedrooms</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <ApperIcon name="Bed" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.capacity.beds}</div>
                  <div className="text-sm text-gray-600">beds</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border">
                  <ApperIcon name="Bath" size={24} className="text-primary mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{property.capacity.bathrooms}</div>
                  <div className="text-sm text-gray-600">baths</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ApperIcon name="Check" size={16} className="text-secondary flex-shrink-0" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div>
            <BookingPanel property={property} />
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">
              Similar places in {property.location.city}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProperties.map((similarProperty) => (
                <PropertyCard
                  key={similarProperty.Id}
                  property={similarProperty}
                  onWishlistToggle={handleSimilarPropertyWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 text-white">
            <h2 className="text-lg font-semibold">
              {currentImageIndex + 1} / {property.images.length}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>
          <div className="flex-1 relative">
            <img
              src={property.images[currentImageIndex]}
              alt={`${property.title} ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setCurrentImageIndex(prev => 
                prev === 0 ? property.images.length - 1 : prev - 1
              )}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            >
              <ApperIcon name="ChevronLeft" size={24} />
            </button>
            <button
              onClick={() => setCurrentImageIndex(prev => 
                prev === property.images.length - 1 ? 0 : prev + 1
              )}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            >
              <ApperIcon name="ChevronRight" size={24} />
            </button>
          </div>
          <div className="p-4 flex gap-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex ? "border-white" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;