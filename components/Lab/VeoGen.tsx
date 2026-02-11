import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const VeoGen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedVideoUrl(null); // Reset previous video
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;

    try {
      // 1. API Key Selection
      // Accessing aistudio via explicit any cast to avoid TS conflicts with global types
      const win = window as any;
      if (win.aistudio) {
        const hasKey = await win.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await win.aistudio.openSelectKey();
          // Assuming successful selection, proceed.
        }
      }

      setIsGenerating(true);
      setProgress('Initializing Veo-3.1 model...');

      // 2. Initialize AI Client
      // Create a new instance right before the call to ensure fresh key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.substring(selectedImage.indexOf(':') + 1, selectedImage.indexOf(';'));

      setProgress('Uploading visual cortex data...');

      // 3. Start Generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        image: {
            imageBytes: base64Data,
            mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // 4. Poll for Completion
      setProgress('Rendering neural pathways (this may take a minute)...');
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        setProgress('Processing frames... ' + new Date().toLocaleTimeString());
      }

      // 5. Fetch Result
      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        setProgress('Downloading stream...');
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await videoResponse.blob();
        const videoUrl = URL.createObjectURL(videoBlob);
        
        setGeneratedVideoUrl(videoUrl);
        setProgress('');
      } else {
        throw new Error("No video URI returned");
      }

    } catch (error: any) {
      console.error('Veo generation failed:', error);
      setProgress(`Error: ${error.message || 'Unknown error'}`);
      
      // Handle missing entity / key reset
      const win = window as any;
      if (error.message?.includes('Requested entity was not found') && win.aistudio) {
          await win.aistudio.openSelectKey();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="relative z-10 py-16 bg-[#080808] border-t border-white/5" id="veo-lab">
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
      }}></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
           <span className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-mono font-bold rounded mb-4 uppercase tracking-widest animate-pulse">
             Generative Lab
           </span>
           <h2 className="font-display text-3xl md:text-5xl text-white uppercase font-bold tracking-tight mb-4">
             Veo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Motion</span> Engine
           </h2>
           <p className="text-gray-400 font-mono text-sm max-w-md">
             Upload a static blueprint or photo to initialize the Veo-3.1 neural renderer. Creates 720p 16:9 motion synthesis.
           </p>
        </div>

        {/* Main Interface */}
        <div className="bg-[#0f0f11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:divide-x divide-white/10">
            
            {/* Input Section */}
            <div className="p-8 flex flex-col items-center justify-center min-h-[400px] relative bg-grain">
              {!selectedImage ? (
                <div 
                  className="w-full h-full border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center p-8 transition-all hover:border-purple-500/50 hover:bg-white/5 cursor-interactive group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-purple-400">add_photo_alternate</span>
                  </div>
                  <span className="text-gray-300 font-mono text-xs uppercase font-bold tracking-wider">Upload Source Image</span>
                  <span className="text-gray-600 font-mono text-[10px] mt-2">JPG / PNG Supported</span>
                </div>
              ) : (
                <div className="relative w-full h-full rounded-xl overflow-hidden group">
                  <img src={selectedImage} alt="Source" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-white/10 backdrop-blur border border-white/20 rounded-full text-white text-xs font-mono uppercase font-bold hover:bg-white/20 cursor-interactive"
                    >
                      Change
                    </button>
                    {!isGenerating && (
                      <button 
                        onClick={handleGenerate}
                        className="px-6 py-2 bg-purple-600 border border-purple-500 rounded-full text-white text-xs font-mono uppercase font-bold hover:bg-purple-500 cursor-interactive shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                      >
                        Generate Video
                      </button>
                    )}
                  </div>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            {/* Output Section */}
            <div className="p-8 flex flex-col items-center justify-center bg-[#050505] min-h-[400px] relative">
               {isGenerating ? (
                 <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-6">
                       <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
                       <div className="absolute inset-0 flex items-center justify-center">
                         <span className="material-symbols-outlined text-purple-500 animate-pulse">neurology</span>
                       </div>
                    </div>
                    <div className="font-mono text-xs text-purple-400 font-bold uppercase tracking-widest animate-pulse mb-2">Processing</div>
                    <div className="font-mono text-[10px] text-gray-500">{progress}</div>
                 </div>
               ) : generatedVideoUrl ? (
                 <div className="w-full relative group">
                    <video 
                      src={generatedVideoUrl} 
                      controls 
                      autoPlay 
                      loop 
                      className="w-full rounded-lg border border-white/10 shadow-2xl"
                    />
                    <div className="absolute -bottom-10 left-0 w-full text-center">
                      <a 
                        href={generatedVideoUrl} 
                        download="veo-generation.mp4"
                        className="text-[10px] font-mono text-gray-500 hover:text-white uppercase tracking-widest cursor-interactive border-b border-transparent hover:border-white transition-all pb-0.5"
                      >
                        Download MP4
                      </a>
                    </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center text-center opacity-30">
                    <span className="material-symbols-outlined text-6xl mb-4">movie</span>
                    <span className="font-mono text-xs uppercase font-bold tracking-widest">Output Monitor Standby</span>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
           <p className="text-[10px] text-gray-600 font-mono max-w-2xl mx-auto">
             * Requires a Google Cloud Project with billing enabled. Veo-3.1 generates high-fidelity video content. 
             Generation times vary based on server load.
           </p>
        </div>
      </div>
    </section>
  );
};

export default VeoGen;