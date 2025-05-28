export const calculateReadingTime = (text) => {
    if (typeof text !== "string") {
      text = String(text || ""); 
    }
  
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };
  