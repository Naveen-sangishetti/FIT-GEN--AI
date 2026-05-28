import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Camera, Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { HyperSpeedLoader } from '@/components/HyperSpeedLoader';

interface PhotoUploadProps {
  onAnalysisComplete: (results: NutritionResults) => void;
}

interface FoodItem {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionResults {
  status: string;
  food: FoodItem[];
  total: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onAnalysisComplete }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Camera access error:', error);
      toast({
        title: "Camera Access Denied",
        description: "Unable to access camera. Please check permissions or use file upload.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
    setSelectedImage(imageDataUrl);
    stopCamera();
  };

  const handleImageSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    try {
      // Convert base64 to blob for API upload
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Create FormData to send image
      const formData = new FormData();
      formData.append('image', blob, 'meal.jpg');

      // Send via edge function to avoid CORS
      const { data, error } = await supabase.functions.invoke('analyze-meal', {
        body: formData,
      });

      if (error) {
        throw new Error(error.message || 'Analysis request failed');
      }

      // Extract results - handle both array and object formats
      const analysisResults = Array.isArray(data) ? data[0]?.output : data?.output;

      if (analysisResults && analysisResults.status === 'success') {
        setIsAnalyzing(false);
        onAnalysisComplete(analysisResults);

        toast({
          title: "Analysis Complete!",
          description: `Found ${analysisResults.food.length} food items in your meal.`,
        });
      } else {
        throw new Error('Invalid response from analysis service');
      }
    } catch (error) {
      setIsAnalyzing(false);
      console.error('Analysis error:', error);

      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!selectedImage ? (
        <Card
          className={`relative border-2 border-dashed transition-all duration-300 ${
            dragActive 
              ? 'border-primary bg-primary/5 scale-105' 
              : 'border-muted-foreground/25 hover:border-primary/50'
          } card-shadow bg-card`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Upload Your Meal Photo</h3>
              <p className="text-muted-foreground">
                Take a photo or upload an image to get instant nutrition analysis
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="default"
                size="lg"
                className="btn-primary h-12"
                onClick={startCamera}
              >
                <Camera className="mr-2 h-5 w-5" />
                Take Photo
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="btn-secondary h-12"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              or drag and drop your image here
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />
        </Card>
      ) : showCamera ? (
        <Card className="card-shadow bg-card overflow-hidden">
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-64 sm:h-80 object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-card/90 hover:bg-card"
              onClick={stopCamera}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Position Your Meal</h3>
              <p className="text-sm text-muted-foreground">
                Make sure your meal is well-lit and clearly visible
              </p>
            </div>
            
            <Button
              onClick={capturePhoto}
              className="w-full btn-primary h-12"
              size="lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Capture Photo
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="card-shadow bg-card overflow-hidden">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected meal"
              className="w-full h-64 sm:h-80 object-cover"
            />
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-card/90 hover:bg-card"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Ready to Analyze</h3>
              <p className="text-sm text-muted-foreground">
                Get detailed nutrition information for your meal
              </p>
            </div>
            
            <Button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full btn-primary h-12"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Nutrition...
                </>
              ) : (
                'Analyze Nutrition'
              )}
            </Button>
          </div>
        </Card>
      )}

      {isAnalyzing && (
        <HyperSpeedLoader
          fullscreen
          message="Analyzing Your Meal"
          subMessage="AI vision crunching macros at hyper-speed"
        />
      )}
    </div>
  );
};

export default PhotoUpload;