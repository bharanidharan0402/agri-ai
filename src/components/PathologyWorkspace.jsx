import { useState, useRef } from 'react';
import { Upload, Camera, Loader2, AlertTriangle } from 'lucide-react';

const DISEASES = {
  "Tomato___Bacterial_spot": { name: "Bacterial Spot", treatment: "Apply copper-based fungicides. Remove infected leaves. Avoid overhead watering." },
  "Tomato___Early_blight": { name: "Early Blight", treatment: "Apply chlorothalonil or mancozeb fungicide. Mulch around plants. Rotate crops annually." },
  "Tomato___Late_blight": { name: "Late Blight", treatment: "Apply metalaxyl-based fungicide immediately. Remove all infected plant material. Improve air circulation." },
  "Tomato___Leaf_Mold": { name: "Leaf Mold", treatment: "Reduce humidity, improve ventilation. Apply chlorothalonil. Remove infected leaves promptly." },
  "Tomato___Septoria_leaf_spot": { name: "Septoria Leaf Spot", treatment: "Apply fungicide (chlorothalonil/mancozeb). Remove lower infected leaves. Avoid wetting foliage." },
  "Tomato___healthy": { name: "Healthy", treatment: "No treatment needed! Your plant looks healthy. Continue regular maintenance." },
  "Potato___Early_blight": { name: "Early Blight (Potato)", treatment: "Apply mancozeb or chlorothalonil. Maintain adequate spacing. Hill potatoes regularly." },
  "Potato___Late_blight": { name: "Late Blight (Potato)", treatment: "Apply metalaxyl immediately. Destroy infected tubers. Do not compost infected material." },
  "Potato___healthy": { name: "Healthy Potato", treatment: "Plant is in good health! Continue regular watering and nutrient management." },
};

export default function PathologyWorkspace() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPreview(ev.target.result);
      setImage(file);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);

    // Simulate AI analysis (since Teachable Machine needs a model URL)
    await new Promise((r) => setTimeout(r, 2000));

    // Generate a demo result
    const keys = Object.keys(DISEASES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const confidence = 75 + Math.random() * 20;

    setResult({
      disease: DISEASES[randomKey],
      confidence: Math.round(confidence),
      className: randomKey,
    });
    setLoading(false);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <h3 className="font-display font-bold text-slate-800 text-lg">Plant Pathology Lab</h3>
        <p className="text-xs text-slate-500 font-medium">Upload a leaf image to detect diseases using AI</p>
      </div>

      {/* Upload Area */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/30 transition"
      >
        {preview ? (
          <img src={preview} alt="Uploaded leaf" className="max-h-48 mx-auto rounded-xl object-contain" />
        ) : (
          <>
            <Upload className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-600 font-medium">Click to upload a leaf image</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">JPG, PNG, WebP — max 5MB</p>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>

      {/* Analyze Button */}
      {preview && !result && (
        <button
          onClick={analyzeImage}
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold py-3 rounded-xl transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing with AI model...
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" />
              Run Disease Detection
            </>
          )}
        </button>
      )}

      {/* Results */}
      {result && (
        <div className={`border rounded-2xl p-5 space-y-3 ${
          result.disease.name === "Healthy" || result.disease.name.includes("Healthy")
            ? "bg-emerald-50 border-emerald-200"
            : "bg-rose-50 border-rose-200"
        }`}>
          <div className="flex items-start gap-3">
            {result.disease.name.includes("Healthy") ? null : (
              <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
            )}
            <div>
              <h4 className="font-display font-bold text-slate-800 text-lg">{result.disease.name}</h4>
              <p className="text-xs font-mono text-slate-500 mt-0.5">
                Confidence: <span className="font-bold">{result.confidence}%</span> • Class: {result.className}
              </p>
            </div>
          </div>

          <div className="bg-white/60 rounded-xl p-3 border border-slate-200/50">
            <span className="text-[10px] text-slate-500 font-bold font-mono uppercase block mb-1">Recommended Treatment</span>
            <p className="text-xs text-slate-700 leading-relaxed">{result.disease.treatment}</p>
          </div>

          <button
            onClick={() => { setResult(null); setPreview(null); setImage(null); }}
            className="text-xs text-slate-500 hover:text-slate-700 font-mono cursor-pointer underline"
          >
            Analyze another image →
          </button>
        </div>
      )}

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[10px] text-slate-500 font-mono">
        <strong>Note:</strong> This demo uses simulated classification. For production, connect your Teachable Machine model URL
        to get real TensorFlow.js inference results.
      </div>
    </div>
  );
}
