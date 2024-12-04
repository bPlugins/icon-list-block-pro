import React, { useState } from 'react';
import './gallery.scss';

const images = [
    {
        id: 1,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-1.png",
        title: "Theme 1"
    },
    {
        id: 2,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-21.png",
        title: "Theme 2"
    },
    {
        id: 3,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-21-1.png",
        title: "Theme 2 more"
    },
    {
        id: 4,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-3.png",
        title: "Theme 3"
    },
    {
        id: 5,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-4.png",
        title: "Theme 4"
    },
    {
        id: 6,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-5.png",
        title: "Theme 5"
    },
    {
        id: 7,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-6.png",
        title: "Theme 6"
    },
    {
        id: 8,
        url: "http://localhost/wordpress1/wp-content/uploads/2024/12/theme-7.png",
        title: "Theme 7"
    }
];

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="gallery-container">
            <div className="gallery-content">
                <div className="main-image-container">
                    <img
                        src={selectedImage.url}
                        alt={selectedImage.title}
                        className="main-image"
                    />
                </div>
                <div className="thumbnails-container">
                    <h2>Themes Gallery</h2>
                    <p>Click on any image to view it larger</p>
                    <div className="thumbnails-grid">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className={`thumbnail ${selectedImage.id === image.id ? 'active' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.url}
                                    alt={image.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}