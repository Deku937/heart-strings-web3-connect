
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Coins, Users, Calendar, Trophy, Wallet, Plus } from 'lucide-react';
import WalletConnect from '@/components/WalletConnect';
import Dashboard from '@/components/Dashboard';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  // Simulate wallet connection status
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setIsConnected(true);
      setWalletAddress(storedAddress);
    }
  }, []);

  const handleWalletConnect = (address: string) => {
    setIsConnected(true);
    setWalletAddress(address);
    localStorage.setItem('walletAddress', address);
    toast({
      title: "Wallet Connected!",
      description: "Welcome to MindChain - Your mental health journey starts now.",
    });
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWalletAddress('');
    localStorage.removeItem('walletAddress');
    toast({
      title: "Wallet Disconnected",
      description: "See you soon on MindChain!",
    });
  };

  if (isConnected) {
    return <Dashboard walletAddress={walletAddress} onDisconnect={handleDisconnect} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            MindChain
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Votre compagnon de santé mentale décentralisé. Suivez vos progrès, gagnez des récompenses, 
            et gardez le contrôle total de vos données personnelles.
          </p>
          
          <WalletConnect onConnect={handleWalletConnect} />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-900">100% Privé & Sécurisé</CardTitle>
              <CardDescription>
                Vos données sont cryptées et stockées de manière décentralisée. 
                Vous seul avez accès à votre journal intime.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-900">Récompenses Automatiques</CardTitle>
              <CardDescription>
                Gagnez des MIND tokens pour votre régularité et vos progrès. 
                Smart contracts garantissent des récompenses équitables.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-indigo-900">Accès aux Professionnels</CardTitle>
              <CardDescription>
                Consultez des psychologues directement via la plateforme. 
                Paiements sécurisés par smart contracts.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-green-900">Suivi Personnalisé</CardTitle>
              <CardDescription>
                Journaling quotidien, suivi d'humeur, objectifs personnels. 
                Preuves horodatées de vos progrès sur blockchain.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-orange-900">Communauté Bienveillante</CardTitle>
              <CardDescription>
                Rejoignez une communauté anonyme et soutenante. 
                Partagez vos victoires, trouvez du soutien.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-pink-900">Contrôle Total</CardTitle>
              <CardDescription>
                Vos données vous appartiennent. Exportez, supprimez, 
                ou transférez vos informations quand vous voulez.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Révolutionnez Votre Bien-être Mental
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers d'utilisateurs qui ont déjà commencé leur transformation 
                avec MindChain. Votre voyage vers un meilleur bien-être commence ici.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WalletConnect onConnect={handleWalletConnect} variant="secondary" />
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  En savoir plus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
