import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import WalletConnect from '@/components/WalletConnect';
import AIAdvisor from '@/components/AIAdvisor';
import { 
  Shield, 
  Database, 
  Users, 
  Zap, 
  Globe, 
  Lock,
  FileCheck,
  Coins,
  Clock,
  Eye
} from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import chainlockerLogo from '@/assets/chainlocker-logo.png';
import heroBg from '@/assets/hero-bg.jpg';

const Landing: React.FC = () => {
  const { isConnected } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  const benefits = [
    { 
      icon: <Shield className="h-6 w-6" />, 
      title: 'Social Impact', 
      desc: 'Secure identity and document management for all citizens' 
    },
    { 
      icon: <Coins className="h-6 w-6" />, 
      title: 'Economic Efficiency', 
      desc: 'Reduce verification costs and eliminate paperwork' 
    },
    { 
      icon: <Globe className="h-6 w-6" />, 
      title: 'Environmental Benefits', 
      desc: 'Paperless document storage and verification' 
    },
    { 
      icon: <Clock className="h-6 w-6" />, 
      title: 'Time Saving', 
      desc: 'Instant verification without physical document checks' 
    },
    { 
      icon: <Eye className="h-6 w-6" />, 
      title: 'Transparency', 
      desc: 'Immutable audit trail and public verification' 
    }
  ];

  const features = [
    { 
      icon: <Database className="h-8 w-8" />, 
      title: 'IPFS Storage', 
      desc: 'Decentralized, secure document storage' 
    },
    { 
      icon: <Lock className="h-8 w-8" />, 
      title: 'AES-256 Encryption', 
      desc: 'Military-grade end-to-end encryption' 
    },
    { 
      icon: <FileCheck className="h-8 w-8" />, 
      title: 'NFT Ownership', 
      desc: 'Blockchain-verified document ownership' 
    },
    { 
      icon: <Users className="h-8 w-8" />, 
      title: 'Access Control', 
      desc: 'Granular permission management' 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center space-y-8 mb-12">
            <div className="flex justify-center">
              <img 
                src={chainlockerLogo} 
                alt="ChainLocker" 
                className="h-24 w-24 animate-float" 
              />
            </div>
            
            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary">
                Smart India Hackathon 2025 • Problem ID 25127
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-gradient-primary">ChainLocker</span>
                <br />
                <span className="text-foreground">Universal Digital Vault</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                Decentralized document storage and verification platform. 
                <span className="text-gradient-cyber font-semibold"> DigiLocker 2.0, but smarter.</span>
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-success/20 border-success/40 text-success">
                <Zap className="h-4 w-4 mr-1" />
                Google Pay Simple
              </Badge>
              <Badge variant="outline" className="bg-primary/20 border-primary/40 text-primary">
                <Shield className="h-4 w-4 mr-1" />
                End-to-End Encrypted
              </Badge>
              <Badge variant="outline" className="bg-accent/20 border-accent/40 text-accent">
                <Database className="h-4 w-4 mr-1" />
                IPFS Powered
              </Badge>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <WalletConnect />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-4">
              Impact & Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ChainLocker delivers comprehensive benefits across social, economic, and environmental dimensions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 bg-gradient-vault border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-card-glow">
                <div className="space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/20 w-fit">
                    {React.cloneElement(benefit.icon, { className: "h-6 w-6 text-primary" })}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-cyber mb-4">
              Core Technologies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on cutting-edge blockchain and cryptographic technologies for maximum security and decentralization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 bg-card/50 border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-card-glow group">
                <div className="text-center space-y-4">
                  <div className="p-4 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto group-hover:bg-primary/20 transition-colors">
                    {React.cloneElement(feature.icon, { className: "h-8 w-8 text-primary" })}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload, encrypt, and share documents with blockchain-powered security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="p-6 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold">Upload & Encrypt</h3>
              <p className="text-muted-foreground">Securely upload documents with AES-256 encryption</p>
            </div>

            <div className="text-center space-y-4">
              <div className="p-6 rounded-full bg-accent/10 border border-accent/20 w-fit mx-auto">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-semibold">Mint NFT</h3>
              <p className="text-muted-foreground">Create blockchain proof of ownership</p>
            </div>

            <div className="text-center space-y-4">
              <div className="p-6 rounded-full bg-success/10 border border-success/20 w-fit mx-auto">
                <span className="text-2xl font-bold text-success">3</span>
              </div>
              <h3 className="text-xl font-semibold">Share & Verify</h3>
              <p className="text-muted-foreground">Grant access and enable instant verification</p>
            </div>
          </div>
        </div>
      </section>

      <AIAdvisor />
    </div>
  );
};

export default Landing;