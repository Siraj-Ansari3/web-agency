import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-centered-container">
      <div className="skeleton-main-box shimmer" />
      <div className="skeleton-sub-box shimmer" />
      <div className="skeleton-sub-box shimmer" />
      <div className="skeleton-sub-box short shimmer" />
    </div>
  );
};

export default SkeletonLoader; 