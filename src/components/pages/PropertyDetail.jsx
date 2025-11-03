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

// Amenities Section Component
const AmenitiesSection = ({ amenities }) => {
  const [showAll, setShowAll] = useState(false);
  const displayAmenities = showAll ? amenities : amenities.slice(0, 10);

  return (
    <div className="pb-8 border-b border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">What this place offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {displayAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-3">
            <ApperIcon name="Check" size={16} className="text-secondary flex-shrink-0" />
            <span className="text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
      {amenities.length > 10 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          {showAll ? 'Show less' : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </div>
  );
};

// Location Section Component
const LocationSection = ({ location }) => (
  <div className="pb-8 border-b border-gray-200">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Where you'll be</h2>
    <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-4">
      <div className="text-center">
        <ApperIcon name="MapPin" size={48} className="text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 font-medium">{location.city}, {location.country}</p>
        <p className="text-gray-500 text-sm">Interactive map coming soon</p>
      </div>
    </div>
    <p className="text-gray-700">{location.neighborhood} • Great location with easy access to local attractions and amenities</p>
  </div>
);

// House Rules Section Component
const HouseRulesSection = () => (
  <div className="pb-8 border-b border-gray-200">
    <h2 className="text-2xl font-semibold text-gray-900 mb-6">House rules</h2>
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ApperIcon name="Clock" size={20} className="text-gray-600" />
        <span className="text-gray-700">Check-in: 3:00 PM - 10:00 PM</span>
      </div>
      <div className="flex items-center gap-3">
        <ApperIcon name="Clock" size={20} className="text-gray-600" />
        <span className="text-gray-700">Check-out: 11:00 AM</span>
      </div>
      <div className="flex items-center gap-3">
        <ApperIcon name="Users" size={20} className="text-gray-600" />
        <span className="text-gray-700">Maximum occupancy strictly enforced</span>
      </div>
      <div className="flex items-center gap-3">
        <ApperIcon name="Ban" size={20} className="text-gray-600" />
        <span className="text-gray-700">No smoking inside</span>
      </div>
      <div className="flex items-center gap-3">
        <ApperIcon name="Volume2" size={20} className="text-gray-600" />
        <span className="text-gray-700">Quiet hours: 10:00 PM - 8:00 AM</span>
      </div>
    </div>
  </div>
);

// Reviews Section Component
const ReviewsSection = ({ rating, reviewCount }) => {
  const [showAll, setShowAll] = useState(false);
  
  const mockReviews = [
    {
      id: 1,
      name: "Sarah M.",
      date: "December 2024",
      rating: 5,
      comment: "Amazing property with stunning views! The host was incredibly responsive and the location was perfect for exploring the city. Would definitely stay again."
    },
    {
      id: 2,
      name: "James L.",
      date: "November 2024",
      rating: 5,
      comment: "Clean, comfortable, and exactly as described. Great amenities and the neighborhood felt very safe. Easy check-in process too."
    },
    {
      id: 3,
      name: "Maria K.",
      date: "October 2024",
      rating: 4,
      comment: "Lovely place with great attention to detail. Minor issue with WiFi but host resolved it quickly. Overall excellent experience!"
    },
    {
      id: 4,
      name: "David R.",
      date: "October 2024",
      rating: 5,
      comment: "Exceeded expectations! Beautiful space, perfect location, and the host provided excellent local recommendations. Highly recommend."
    },
    {
      id: 5,
      name: "Emma T.",
      date: "September 2024",
      rating: 4,
      comment: "Great value for money. The apartment was spotless and had everything we needed. Would stay here again on our next visit."
    },
    {
      id: 6,
      name: "Alex P.",
      date: "September 2024",
      rating: 5,
      comment: "Perfect for our weekend getaway. The photos don't do it justice - it's even better in person! Great communication from the host."
    }
  ];

  const displayReviews = showAll ? mockReviews : mockReviews.slice(0, 3);

  return (
    <div className="pb-8 border-b border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <ApperIcon name="Star" size={24} className="text-accent fill-current" />
        <h2 className="text-2xl font-semibold text-gray-900">
          {rating} · {reviewCount} reviews
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {displayReviews.map((review) => (
          <div key={review.id} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {review.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.date}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <ApperIcon key={i} name="Star" size={12} className="text-accent fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
      
      {mockReviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          {showAll ? 'Show less' : `Show all ${reviewCount} reviews`}
        </button>
      )}
    </div>
  );
};
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
        
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden">
            <div className="aspect-[16/9] bg-gray-200">
              <img 
                src={property.images[currentImageIndex]} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? property.images.length - 1 : prev - 1
                  )}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ApperIcon name="ChevronLeft" size={20} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === property.images.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                >
                  <ApperIcon name="ChevronRight" size={20} className="text-gray-700" />
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Show All Photos Button */}
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ApperIcon name="Grid3X3" size={16} className="text-gray-700" />
              <span className="text-sm font-medium text-gray-700">
                Show all {property.images.length} photos
              </span>
            </button>
          </div>
        </div>

        {/* Photo Gallery Modal */}
        {showAllPhotos && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <div className="max-w-6xl w-full mx-4 relative">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <ApperIcon name="X" size={24} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[80vh] overflow-y-auto">
                {property.images.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img 
                      src={image} 
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
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
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>

              {/* Host Info */}
              <div className="flex items-center gap-4 py-6 border-y border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {property.host.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hosted by {property.host.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {property.host.yearsHosting} years hosting • {property.host.responseRate} response rate
                  </p>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <ApperIcon name="Users" size={20} className="text-gray-600" />
                  <span className="text-gray-700">{property.capacity.guests} guests</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="Bed" size={20} className="text-gray-600" />
                  <span className="text-gray-700">{property.capacity.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-3">
                  <ApperIcon name="Bath" size={20} className="text-gray-600" />
                  <span className="text-gray-700">{property.capacity.bathrooms} bathrooms</span>
                </div>
              </div>
            </div>

            {/* Amenities - Expandable */}
            <AmenitiesSection amenities={property.amenities} />

            {/* Location Map */}
            <LocationSection location={property.location} />

            {/* House Rules */}
            <HouseRulesSection />

            {/* Reviews Section */}
            <ReviewsSection rating={property.rating} reviewCount={property.reviewCount} />
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