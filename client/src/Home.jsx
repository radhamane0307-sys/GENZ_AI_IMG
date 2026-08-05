import { useState } from "react";
import axios from "axios";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const generate = async () => {
    if (!prompt) return alert("Enter prompt");

    try {
      setLoading(true);

      const res = await axios.post(
  "http://localhost:5000/api/generate",
  { prompt },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      setImage(res.data.image);
      setHistory((prev) => [res.data.image, ...prev.slice(0, 5)]);
    } catch (err) {
      alert("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "ai-image.jpg";
    link.click();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {/* 🎆 Animated Background Elements */}
      <div className="wave-bg"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
      <div className="shooting-star star-1"></div>
      <div className="shooting-star star-2"></div>
      <div className="shooting-star star-3"></div>
      <div className="pulse-ring ring-1"></div>
      <div className="pulse-ring ring-2"></div>
      <div className="pulse-ring ring-3"></div>
      <div className="noise-overlay"></div>

      {/* 🔴 Logout Button */}
      <button className="logout" onClick={logout}>
        Logout
      </button>

      {/* 🏠 Main Container */}
      <div className="container">
        <h1>🚀 AI Image Generator</h1>

        {/* 🔤 Input Section */}
        <div className="inputBox">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your imagination..."
            onKeyPress={(e) => e.key === "Enter" && generate()}
          />
          <button onClick={generate}>Generate</button>
        </div>

        {/* 🔄 Loader */}
        {loading && <div className="loader"></div>}

        {/* 🖼 Image Section */}
        {image && !loading && (
          <div style={{ animation: "fadeIn 0.6s ease" }}>
            <img src={image} alt="generated" />
            <br />
            <button onClick={downloadImage}>⬇️ Download</button>
          </div>
        )}

        {/* 📜 History */}
        {history.length > 0 && (
          <>
            <h3>History</h3>
            <div className="history">
              {history.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="history"
                  onClick={() => setImage(img)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
