import { useState } from "react";
import axios from "axios";

function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) {
      alert("Enter prompt");
      return;
    }

    const token = localStorage.getItem("token");

    // Token नाही तर Login करा
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      console.log("Token exists:", !!token);
      console.log("Calling Generate API...");

      const res = await axios.post(
        "https://genz-ai-img.onrender.com/api/generate",
        {
          prompt: prompt.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Generate API response:", res.data);

      if (res.data.image) {
        setImage(res.data.image);
        setHistory((prev) => [
          res.data.image,
          ...prev.slice(0, 5),
        ]);
      } else {
        alert("Image URL not received from server");
      }
    } catch (err) {
      console.error("Generate API Error:", err);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);

        alert(
          `Error ${err.response.status}: ${
            err.response.data?.error ||
            err.response.data?.msg ||
            "Image generation failed"
          }`
        );
      } else {
        alert("Cannot connect to backend");
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!image) return;

    const link = document.createElement("a");
    link.href = image;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      {/* Logout */}
      <button className="logout" onClick={logout}>
        Logout
      </button>

      {/* Main Container */}
      <div className="container">
        <h1>🚀 AI Image Generator</h1>

        {/* Input */}
        <div className="inputBox">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your imagination..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generate();
              }
            }}
          />

          <button onClick={generate} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Loader */}
        {loading && <div className="loader"></div>}

        {/* Image */}
        {image && !loading && (
          <div style={{ animation: "fadeIn 0.6s ease" }}>
            <img
              src={image}
              alt="generated"
            />

            <br />

            <button onClick={downloadImage}>
              ⬇️ Download
            </button>
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <>
            <h3>History</h3>

            <div className="history">
              {history.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`history-${i}`}
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