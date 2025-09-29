import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AIAdvisor from '@/components/AIAdvisor';
import { 
  Upload as UploadIcon,
  ArrowLeft,
  FileText,
  Shield,
  Database,
  Coins,
  CheckCircle,
  AlertCircle,
  Clock,
  Lock
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';
import chainlockerLogo from '@/assets/chainlocker-logo.png';

interface UploadStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

const Upload: React.FC = () => {
  const { account, isConnected } = useWeb3();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [steps, setSteps] = useState<UploadStep[]>([
    {
      id: 1,
      title: 'Upload Document',
      description: 'Select and upload your document file',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Encrypt Document',
      description: 'Apply AES-256 encryption for security',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Store on IPFS',
      description: 'Upload encrypted file to decentralized storage',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Create NFT',
      description: 'Mint NFT for blockchain ownership proof',
      status: 'pending'
    }
  ]);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!documentTitle) {
        setDocumentTitle(file.name.split('.')[0]);
      }
    }
  }, [documentTitle]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      if (!documentTitle) {
        setDocumentTitle(file.name.split('.')[0]);
      }
    }
  }, [documentTitle]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const updateStepStatus = (stepIndex: number, status: UploadStep['status']) => {
    setSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, status } : step
    ));
  };

  const simulateUploadProcess = async () => {
    setIsUploading(true);
    
    try {
      // Step 1: Upload Document
      setCurrentStep(0);
      updateStepStatus(0, 'processing');
      await new Promise(resolve => setTimeout(resolve, 1500));
      updateStepStatus(0, 'completed');

      // Step 2: Encrypt Document
      setCurrentStep(1);
      updateStepStatus(1, 'processing');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStepStatus(1, 'completed');

      // Step 3: Store on IPFS
      setCurrentStep(2);
      updateStepStatus(2, 'processing');
      await new Promise(resolve => setTimeout(resolve, 2500));
      updateStepStatus(2, 'completed');

      // Step 4: Create NFT
      setCurrentStep(3);
      updateStepStatus(3, 'processing');
      await new Promise(resolve => setTimeout(resolve, 3000));
      updateStepStatus(3, 'completed');

      toast({
        title: "Document Uploaded Successfully!",
        description: "Your document is now secured and immutable on the blockchain.",
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      updateStepStatus(currentStep, 'error');
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !documentTitle) {
      toast({
        title: "Missing Information",
        description: "Please select a file and provide a document title.",
        variant: "destructive",
      });
      return;
    }
    simulateUploadProcess();
  };

  const getStepIcon = (status: UploadStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-success" />;
      case 'processing': return <Clock className="h-5 w-5 text-warning animate-spin" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <div className="h-5 w-5 rounded-full border-2 border-muted" />;
    }
  };

  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.status === 'completed').length;
    return (completedSteps / steps.length) * 100;
  };

  if (!isConnected) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <img src={chainlockerLogo} alt="ChainLocker" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gradient-primary">Upload Document</h1>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border">
              <span className="text-sm font-mono text-muted-foreground">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Progress Header */}
          {isUploading && (
            <Card className="p-6 bg-gradient-vault border border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Upload Progress</h3>
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/40">
                    {Math.round(calculateProgress())}% Complete
                  </Badge>
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-gradient-vault border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Document Upload</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload Area */}
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Select Document</Label>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        selectedFile ? 'border-success bg-success/5' : 'border-border hover:border-primary/40 bg-card/30'
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    >
                      {selectedFile ? (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="p-3 rounded-full bg-success/20 border border-success/40">
                              <FileText className="h-8 w-8 text-success" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedFile(null)}
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                              <UploadIcon className="h-8 w-8 text-primary" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">Drop your file here, or click to browse</p>
                            <p className="text-sm text-muted-foreground">PDF, Images, and Text files supported</p>
                          </div>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileSelect}
                            accept=".pdf,.jpg,.jpeg,.png,.txt,.doc,.docx"
                          />
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => document.getElementById('file-upload')?.click()}
                          >
                            Browse Files
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Details */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Document Title</Label>
                      <Input
                        id="title"
                        value={documentTitle}
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        placeholder="Enter document title"
                        className="bg-card/50 border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={documentDescription}
                        onChange={(e) => setDocumentDescription(e.target.value)}
                        placeholder="Describe this document..."
                        className="bg-card/50 border-border"
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full"
                    disabled={!selectedFile || !documentTitle || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Secure & Upload Document
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              <Card className="p-6 bg-gradient-vault border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Upload Process</h3>
                
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3">
                      <div className="mt-1">
                        {getStepIcon(step.status)}
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className={`font-medium ${
                          step.status === 'completed' ? 'text-success' :
                          step.status === 'processing' ? 'text-warning' :
                          step.status === 'error' ? 'text-destructive' :
                          'text-muted-foreground'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Security Features */}
              <Card className="p-6 bg-card/30 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Security Features</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">AES-256 Encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">IPFS Decentralized Storage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Coins className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">NFT Ownership Proof</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">Immutable Blockchain Record</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AIAdvisor />
    </div>
  );
};

export default Upload;