"use client"
import React, { useState, useRef } from 'react'

export default function ImageUploader() {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="image-uploader">
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />
            <button onClick={handleButtonClick} className="upload-button">
                Seleccionar Imagen
            </button>
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="Vista previa" />
                </div>
            )}
            <style jsx>{`
        .image-uploader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border: 2px solid #ccc;
          border-radius: 8px;
        }
        .upload-button {
          padding: 10px 20px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .upload-button:hover {
          background-color: #45a049;
        }
        .image-preview {
          max-width: 300px;
          max-height: 300px;
          overflow: hidden;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
        </div>
    );
}
