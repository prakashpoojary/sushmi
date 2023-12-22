// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayQuote, setDisplayQuote] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Image gallery logic
    switch (name.toLowerCase()) {
      case 'sushmi':
      case 'sushmitha':
        setImages(['image1.jpeg', 'image2.jpeg', 'image3.jpeg', 'image4.jpeg', 'image5.jpeg', 'image6.jpeg']);
        break;
      case 'prakash':
        setImages(['image7.jpeg', 'image8.jpeg', 'image9.jpeg', 'image10.jpeg', 'image11.jpeg', 'image12.jpeg']);
        break;
      case 'sushmi and prakash':
        setImages(['image13.jpeg']);
        break;
      default:
        setImages([]);
    }
  }, [name]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setSelectedImage(null); // Reset selected image when changing the name
  };

  const handleImageClick = (imageName) => {
    // Toggle display of quote only if a quote is available
    const isSushmi = name.toLowerCase() === 'sushmi' || name.toLowerCase() === 'sushmitha';
    const index = images.indexOf(imageName);
    const isQuoteAvailable = isSushmi && index !== -1;
  
    setSelectedImage(selectedImage === imageName ? null : imageName);
    setDisplayQuote(isQuoteAvailable);
  };
  

  const calculateGradientColor = () => {
    // Check if the entered name is either "sushmi," "sushmitha," or "prakash"
    const isSushmiOrSushmithaOrPrakash = ['sushmi', 'sushmitha', 'prakash'].includes(name.toLowerCase());
  
    if (isSushmiOrSushmithaOrPrakash) {
      // Adjust the colors based on your preference for dark blue and black
      const scrollPercentage = (scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100;
      const color1 = `hsl(210, 50%, ${10 + (scrollPercentage / 3)}%)`; // Ocean Blue
      const color4 = `hsl(270, 60%, ${25 + (scrollPercentage / 2)}%)`; // Purple Lake
      const color5 = `hsl(350, 60%, ${30 + (scrollPercentage / 2)}%)`; // Piglet
      const color6 = `hsl(40, 50%, ${35 + (scrollPercentage / 2)}%)`;  // Kashmir
      const color7 = `hsl(140, 60%, ${40 + (scrollPercentage / 2)}%)`; // Green Beach
      const color3 = `hsl(120, 70%, ${20 + (scrollPercentage / 2)}%)`; // Luscious Lime
  
      return `linear-gradient(${color1}, ${color4}, ${color5}, ${color6}, ${color7}, ${color3})`;
    } else {
      // Return a default background color for other names
      return 'linear-gradient(hsl(210, 50%, 10%), hsl(240, 10%, 5%))';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPosition]);

  const getQuote = () => {
  // Check if the entered name is either "sushmi" or "sushmitha"
  const isSushmi = name.toLowerCase() === 'sushmi' || name.toLowerCase() === 'sushmitha';

  // Retrieve the quote based on the selected image and the entered name
  const index = images.indexOf(selectedImage);

  if (isSushmi && index !== -1) {
    return [
      "You are more powerful than you know; you are beautiful just as you are.",
      "The question isn’t who’s going to let me, it’s who’s going to stop me.",
      "The woman who follows the crowd will usually go no further than the crowd. The woman who walks alone is likely to find herself in places no one has ever been before.",
      "Beauty begins the moment you decide to be yourself.",
      "She is water. Powerful enough to drown you, soft enough to cleanse you, and deep enough to save you.",
      "She is a girl with a mind, a woman with attitude, and a lady with class.",
    ][index];
  }

  return '';
};

  
return (
  <div className="App" style={{ background: calculateGradientColor() }}>
    <h1>Image Gallery</h1>
    <form onSubmit={(event) => event.preventDefault()} className="search-form">
      <label className="search-label">
        <div className="input-container">
          <input type="text" value={name} onChange={handleNameChange} placeholder="Enter your name" className="search-input" />
        </div>
      </label>
    </form>
    <div className="image-container">
      {name && images.length > 0 ? (
        <div className="image-wrapper">
          {images.map((imageName) => (
            <div
              key={imageName}
              className={`image-item ${selectedImage === imageName ? 'dim' : ''}`}
              onClick={() => handleImageClick(imageName)}
            >
              <img src={`/images/${imageName}`} alt={`Image for ${name}`} />
              {selectedImage === imageName && displayQuote && (
                <div className="quote-container">
                  <p>{getQuote()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : name ? (
        <p>No images found for {name}</p>
      ) : null}
    </div>
  </div>
);

};

export default App;






