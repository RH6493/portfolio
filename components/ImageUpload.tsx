import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Check, RotateCw, ZoomIn, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (base64: string) => void;
  label?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange, label = "Upload Image", className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Adjustment states
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
        setIsEditing(true);
        setScale(1);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!canvasRef.current || !previewUrl) return;
    
    // Get the base64 string from canvas
    // Use JPEG with 0.8 quality to save space in localStorage
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8); 
    onImageChange(dataUrl);
    setIsEditing(false);
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreviewUrl(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Draw image on canvas when adjustments change
  useEffect(() => {
    if (!isEditing || !previewUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
        // limit max dimensions for performance/storage
        const maxDim = 800;
        let width = img.width;
        let height = img.height;
        
        // Resize logic to keep aspect ratio but limit max dimension
        if (width > maxDim || height > maxDim) {
            const ratio = width / height;
            if (ratio > 1) {
                width = maxDim;
                height = maxDim / ratio;
            } else {
                height = maxDim;
                width = maxDim * ratio;
            }
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        ctx?.clearRect(0, 0, width, height);
        ctx?.save();
        
        // Translate to center for transformations
        ctx?.translate(width / 2, height / 2);
        ctx?.rotate((rotation * Math.PI) / 180);
        ctx?.scale(scale, scale);
        
        // Draw centered
        ctx?.drawImage(img, -width / 2, -height / 2, width, height);
        
        ctx?.restore();
    };
    img.src = previewUrl;

  }, [previewUrl, scale, rotation, isEditing]);

  return (
    <div className={`space-y-4 ${className}`}>
      <label className="block text-sm font-medium text-text mb-2">{label}</label>
      
      {/* Display Current Image or Placeholder */}
      <div className="flex items-start gap-4">
        {currentImage ? (
           <div className="relative group w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-surface shrink-0">
             <img src={currentImage} alt="Current" className="w-full h-full object-cover" />
             <button 
                onClick={() => onImageChange('')}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                title="Remove Image"
             >
               <Trash2 size={12} />
             </button>
           </div>
        ) : (
          <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-text-muted bg-surface shrink-0">
            <ImageIcon size={24} />
          </div>
        )}

        <div className="flex-1">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-4 py-2 bg-surface border border-gray-300 dark:border-gray-600 rounded-lg text-text hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <Upload size={16} className="mr-2" />
                {currentImage ? 'Change Image' : 'Upload Image'}
            </button>
            <p className="mt-2 text-xs text-text-muted">
                Supported formats: JPG, PNG, GIF.<br/>
                Images are automatically optimized for web.
            </p>
        </div>
      </div>

      {/* Editing Modal/Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-background rounded-xl p-6 max-w-lg w-full shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-text">Adjust Image</h3>
                    <button onClick={handleCancel} className="text-text-muted hover:text-text">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="flex justify-center mb-6 bg-surface/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <canvas ref={canvasRef} className="max-w-full h-auto shadow-lg" />
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <div className="flex justify-between text-xs text-text-muted mb-1">
                            <span className="flex items-center"><ZoomIn size={12} className="mr-1"/> Scale ({Math.round(scale * 100)}%)</span>
                        </div>
                        <input 
                            type="range" 
                            min="0.5" 
                            max="2" 
                            step="0.1" 
                            value={scale} 
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between text-xs text-text-muted mb-1">
                             <span className="flex items-center"><RotateCw size={12} className="mr-1"/> Rotation ({rotation}°)</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="360" 
                            step="90" 
                            value={rotation} 
                            onChange={(e) => setRotation(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                    </div>
                </div>

                <div className="flex gap-3 justify-end">
                    <button 
                        onClick={handleCancel}
                        className="px-4 py-2 text-text border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                        <Check size={16} className="mr-2" /> Save & Use
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;