import React, { useState, useRef } from 'react';

const UploadArea = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setImage(droppedFile);
      const imageUrl = URL.createObjectURL(droppedFile);
      setPreviewUrl(imageUrl);
      setAnalysisResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;
    setIsLoading(true);
    
    try {
      // Create form data to send the image
      const formData = new FormData();
      formData.append('image', image);
      
      // Replace with your actual backend API endpoint
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }
      
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult({ error: 'Failed to analyze image. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (event) => {
    // Stop propagation to prevent the click from triggering the file input
    event.stopPropagation();
    
    // Clean up the object URL to avoid memory leaks
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    
    // Reset state
    setImage(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    
    // Also reset the file input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4 ${
          isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        {previewUrl ? (
          <div className="mb-4 relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="max-h-64 mx-auto"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none"
              title="Remove image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        ) : (
          <div className="py-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="mt-1 text-sm text-gray-500">
              Click to upload or drag and drop an image
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!image || isLoading}
        className={`w-full py-2 px-4 rounded-md ${
          !image || isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? 'Analyzing...' : 'Submit for Analysis'}
      </button>
      
      {analysisResult && (
        <div className="mt-4 p-4 border rounded-md">
          <h3 className="font-medium mb-2">Analysis Results:</h3>
          {analysisResult.error ? (
            <p className="text-red-500">{analysisResult.error}</p>
          ) : (
            <pre className="bg-gray-100 p-2 rounded overflow-auto text-sm">
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};


export default UploadArea;