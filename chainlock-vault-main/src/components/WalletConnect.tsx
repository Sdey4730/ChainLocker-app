import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, Shield, Zap } from 'lucide-react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useToast } from '@/hooks/use-toast';

const WalletConnect: React.FC = () => {
  const { connectWallet, isLoading, error } = useWeb3();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask",
      });
    } catch (err) {
      toast({
        title: "Connection Failed",
        description: error || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-8 bg-gradient-vault border border-primary/20 glow-vault">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
            <Wallet className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gradient-primary">
            Connect Your Wallet
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Connect your MetaMask wallet to access your decentralized digital vault and manage your secure documents.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                Connect MetaMask
              </>
            )}
          </Button>

          {error && (
            <p className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/20">
              {error}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">Secure</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border">
            <Zap className="h-5 w-5 text-accent" />
            <span className="text-sm text-muted-foreground">Fast</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border">
            <Wallet className="h-5 w-5 text-primary-glow" />
            <span className="text-sm text-muted-foreground">Decentralized</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletConnect;