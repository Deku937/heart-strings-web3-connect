
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface WalletConnectProps {
  onConnect: (address: string) => void;
  variant?: 'default' | 'secondary' | 'outline';
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect, variant = 'default' }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection (in real app, use Web3 provider like MetaMask)
      setTimeout(() => {
        const mockAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
        onConnect(mockAddress);
        setIsConnecting(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please try again or install a Web3 wallet.",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
  };

  return (
    <Button 
      onClick={handleConnect} 
      disabled={isConnecting}
      variant={variant}
      size="lg"
      className="min-w-[200px]"
    >
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connexion...
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connecter Wallet
        </>
      )}
    </Button>
  );
};

export default WalletConnect;
