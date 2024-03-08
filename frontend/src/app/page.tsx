"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bars } from "react-loader-spinner";
import { classifyImage, DetectionResult } from "../api/api";
import { Progress } from "@/components/ui/progress";
import "../components/style.css";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>(
    []
  );
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);

  const handleImageChange = (image: File) => {
    setSelectedImage(image);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedImage) {
      setButtonClicked(true); // Show loader button

      try {
        // console.log("Hello");
        const response = await classifyImage(selectedImage);
        // console.log(response);
        setDetectionResults([response]); // Set detection results
      } catch (error) {
        console.error("Error classifying image:", error);
      }
      setButtonClicked(false); // Hide loader button
    }
  };
  console.log(detectionResults);

  return (
    <>
      <h1 className="text-[50px] text-center font-bold">Image Classifier</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-[50%] mt-[2%] text-center px-4 rounded-md flex flex-col items-center justify-center cursor-pointer border-4 border-gray-500 border-dashed mx-auto">
          <div className="py-6 relative">
            {selectedImage == null ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 mb-2 fill-gray-600 inline-block"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                <h4 className="text-base font-semibold text-gray-600">
                  Choose your Image
                </h4>
              </>
            ) : (
              <>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  className="w-[300px] mx-auto h-[250px] mb-2"
                />
                <button
                  className="absolute top-3 right-[-10px] font-semibold text-white px-3 py-2 bg-black rounded-full text-md"
                  onClick={handleRemoveImage}
                >
                  X
                </button>
              </>
            )}
            <div className="py-6">
              <input
                type="file"
                id="uploadFile1"
                onChange={(e) => handleImageChange(e.target.files?.[0] as File)}
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="uploadFile1"
                className="block px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-black hover:bg-gray-900 cursor-pointer"
              >
                Browse Images
              </label>
              <p className="text-xs text-white mt-4">
                PNG, JPG SVG, WEBP, and GIF are Allowed.
              </p>
            </div>
          </div>
          <hr className="w-full border-black my-2" />
          {buttonClicked ? (
            <div className="flex justify-center my-5">
              <Button type="button" disabled>
                <Bars height={25} width={25} color="#ffffff" />
              </Button>
            </div>
          ) : (
            <Button type="submit" className="my-5">
              Generate Tags
            </Button>
          )}
        </div>
      </form>
      <div className="data w-[50%] mx-auto">
        {Array.isArray(detectionResults[0]) &&
        detectionResults[0].length > 0 ? (
          <>
            {detectionResults[0].map((result, index) => (
              <div key={index} className="my-4">
                <div className="flex flex-row justify-between">
                  <p>{String(result.label).toLocaleUpperCase()}</p>
                  <p className="right-0">{result.score * 100}%</p>
                </div>
                <Progress value={result.score * 100} />
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Home;
