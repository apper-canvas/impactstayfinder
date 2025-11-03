import { toast } from 'react-toastify';

// Mock review data - in production this would come from a database
const mockReviews = [
  {
    Id: 1,
    propertyId: 1,
    userId: 'u1',
    userName: "Sarah M.",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    title: "Amazing property with stunning views!",
    comment: "Amazing property with stunning views! The host was incredibly responsive and the location was perfect for exploring the city. Would definitely stay again.",
    date: "2024-12-15T10:30:00Z",
    verified: true,
    helpful: 8
  },
  {
    Id: 2,
    propertyId: 1,
    userId: 'u2',
    userName: "James L.",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    title: "Clean and comfortable",
    comment: "Clean, comfortable, and exactly as described. Great amenities and the neighborhood felt very safe. Easy check-in process too.",
    date: "2024-11-28T14:15:00Z",
    verified: true,
    helpful: 12
  },
  {
    Id: 3,
    propertyId: 1,
    userId: 'u3',
    userName: "Maria K.",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    title: "Lovely place with great attention to detail",
    comment: "Lovely place with great attention to detail. Minor issue with WiFi but host resolved it quickly. Overall excellent experience!",
    date: "2024-10-22T16:45:00Z",
    verified: true,
    helpful: 6
  },
  {
    Id: 4,
    propertyId: 1,
    userId: 'u4',
    userName: "David R.",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    title: "Exceeded expectations!",
    comment: "Exceeded expectations! Beautiful space, perfect location, and the host provided excellent local recommendations. Highly recommend.",
    date: "2024-10-18T09:20:00Z",
    verified: true,
    helpful: 15
  },
  {
    Id: 5,
    propertyId: 1,
    userId: 'u5',
    userName: "Emma T.",
    userAvatar: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face",
    rating: 4,
    title: "Great value for money",
    comment: "Great value for money. The apartment was spotless and had everything we needed. Would stay here again on our next visit.",
    date: "2024-09-30T11:10:00Z",
    verified: true,
    helpful: 9
  },
  {
    Id: 6,
    propertyId: 1,
    userId: 'u6',
    userName: "Alex P.",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    title: "Perfect for our weekend getaway",
    comment: "Perfect for our weekend getaway. The photos don't do it justice - it's even better in person! Great communication from the host.",
    date: "2024-09-15T13:30:00Z",
    verified: true,
    helpful: 11
  }
];

class ReviewService {
  constructor() {
    // Load existing reviews or initialize with mock data
    const savedReviews = localStorage.getItem('reviews');
    this.reviews = savedReviews ? JSON.parse(savedReviews) : [...mockReviews];
  }

  // Save reviews to localStorage (simulating database persistence)
  _saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  // Get all reviews for a specific property
  async getByPropertyId(propertyId, options = {}) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let propertyReviews = this.reviews
      .filter(review => review.propertyId === propertyId)
      .map(review => ({ ...review })); // Return copies

    // Sort by date (newest first) by default
    const sortBy = options.sortBy || 'date';
    const sortOrder = options.sortOrder || 'desc';
    
    propertyReviews.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      } else if (sortBy === 'rating') {
        return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
      } else if (sortBy === 'helpful') {
        return sortOrder === 'desc' ? b.helpful - a.helpful : a.helpful - b.helpful;
      }
      return 0;
    });

    return {
      reviews: propertyReviews,
      totalCount: propertyReviews.length,
      averageRating: this._calculateAverageRating(propertyReviews)
    };
  }

  // Create a new review
  async create(reviewData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Validate required fields
    if (!reviewData.propertyId || !reviewData.rating || !reviewData.comment) {
      throw new Error('Property ID, rating, and comment are required');
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5 stars');
    }

    if (reviewData.comment.length < 10) {
      throw new Error('Review comment must be at least 10 characters long');
    }

    if (reviewData.comment.length > 1000) {
      throw new Error('Review comment must be less than 1000 characters');
    }

    const newId = Math.max(...this.reviews.map(r => r.Id), 0) + 1;
    const newReview = {
      Id: newId,
      propertyId: reviewData.propertyId,
      userId: reviewData.userId || 'anonymous',
      userName: reviewData.userName || 'Anonymous User',
      userAvatar: reviewData.userAvatar || '',
      rating: reviewData.rating,
      title: reviewData.title || '',
      comment: reviewData.comment,
      date: new Date().toISOString(),
      verified: reviewData.verified || false,
      helpful: 0
    };

    this.reviews.push(newReview);
    this._saveReviews();
    return { ...newReview };
  }

  // Update an existing review
  async update(id, reviewData) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const reviewIndex = this.reviews.findIndex(r => r.Id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }

    // Validate fields if they're being updated
    if (reviewData.rating !== undefined && (reviewData.rating < 1 || reviewData.rating > 5)) {
      throw new Error('Rating must be between 1 and 5 stars');
    }

    if (reviewData.comment !== undefined) {
      if (reviewData.comment.length < 10) {
        throw new Error('Review comment must be at least 10 characters long');
      }
      if (reviewData.comment.length > 1000) {
        throw new Error('Review comment must be less than 1000 characters');
      }
    }

    const updatedReview = {
      ...this.reviews[reviewIndex],
      ...reviewData,
      Id: id // Ensure ID cannot be changed
    };

    this.reviews[reviewIndex] = updatedReview;
    this._saveReviews();
    return { ...updatedReview };
  }

  // Delete a review
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const reviewIndex = this.reviews.findIndex(r => r.Id === id);
    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }

    this.reviews.splice(reviewIndex, 1);
    this._saveReviews();
    return true;
  }

  // Calculate average rating for a set of reviews
  _calculateAverageRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal place
  }
}

export const reviewService = new ReviewService();