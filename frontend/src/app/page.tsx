// pages/index.tsx
"use client";
import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";
import NavigationMenuDemo from "../components/navbar";
import { classifyImage } from "../api/api";

const Home: React.FC = () => {
  const [classification, setClassification] = useState<string>("");

  const handleImageUpload = async (image: File) => {
    try {
      const response = await classifyImage(image);
      setClassification(response.label);
    } catch (error) {
      console.error("Error classifying image:", error);
    }
  };

  return (
    <div>
      <NavigationMenuDemo />
      <h1>Image Classifier</h1>
      <ImageUpload onImageUpload={handleImageUpload} />
      {classification && <p>Classification: {classification}</p>}
    </div>
  );
};

export default Home;
