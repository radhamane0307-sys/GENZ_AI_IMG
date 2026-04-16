import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateImage = async () => {
    if (!prompt) return alert("Enter prompt");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/generate",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setImage(res.data.image);

      // 🧠 save history
      setHistory((prev) => [res.data.image, ...prev.slice(0, 4)]);

    } catch (err) {
      alert("Image generation failed");
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

  return (
    <div style={styles.container}>
      <h1>AI Image Generator 🚀</h1>

      <div style={styles.inputBox}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt..."
        />
        <button onClick={generateImage}>Generate</button>
      </div>

      {/* 🔄 Loader */}
      {loading && <div style={styles.loader}></div>}

      {/* 🖼 Image */}
      {image && !loading && (
        <>
          <img src={image} alt="generated" style={styles.image} />
          <button onClick={downloadImage}>Download Image</button>
        </>
      )}

      {/* 📜 History */}
      <h3>History</h3>
      <div style={styles.history}>
        {history.map((img, i) => (
          <img key={i} src={img} style={styles.historyImg} />
        ))}
      </div>
    </div>
  );
}

export default App;

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    color: "white",
  },
  inputBox: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  image: {
    width: "300px",
    borderRadius: "10px",
    marginTop: "20px",
  },
  history: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  historyImg: {
    width: "80px",
    borderRadius: "5px",
  },
  loader: {
    margin: "20px auto",
    border: "5px solid #ccc",
    borderTop: "5px solid orange",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    animation: "spin 1s linear infinite",
  },
};