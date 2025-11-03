import React from "react";
import PropertyCard from "@/components/molecules/PropertyCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onRetry,
  onWishlistToggle,
  onClearFilters 
}) => {
  if (loading) {
    return <Loading type="properties" />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty 
        title="No properties found"
        description="Try adjusting your search criteria or explore different locations."
        actionText="Clear filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.Id}
          property={property}
          onWishlistToggle={onWishlistToggle}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;