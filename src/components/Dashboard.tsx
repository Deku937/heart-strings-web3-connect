
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Coins, 
  Calendar, 
  TrendingUp, 
  Users, 
  LogOut,
  Plus,
  Heart,
  Award,
  Book
} from 'lucide-react';
import JournalEntry from '@/components/JournalEntry';
import MoodTracker from '@/components/MoodTracker';
import RewardsPanel from '@/components/RewardsPanel';

interface DashboardProps {
  walletAddress: string;
  onDisconnect: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ walletAddress, onDisconnect }) => {
  const [userStats, setUserStats] = useState({
    streak: 7,
    totalEntries: 23,
    mindTokens: 150,
    level: 3,
    currentMood: 8
  });

  const [weeklyProgress, setWeeklyProgress] = useState(75);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  MindChain
                </h1>
                <p className="text-sm text-gray-600">
                  {formatAddress(walletAddress)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100">
                <Coins className="w-4 h-4 mr-1" />
                {userStats.mindTokens} MIND
              </Badge>
              <Button variant="outline" onClick={onDisconnect}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Série Actuelle</p>
                  <p className="text-3xl font-bold">{userStats.streak} jours</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Entrées Totales</p>
                  <p className="text-3xl font-bold">{userStats.totalEntries}</p>
                </div>
                <Book className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Niveau</p>
                  <p className="text-3xl font-bold">{userStats.level}</p>
                </div>
                <Award className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100">Humeur Actuelle</p>
                  <p className="text-3xl font-bold">{userStats.currentMood}/10</p>
                </div>
                <Heart className="w-8 h-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress This Week */}
        <Card className="mb-8 border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Progrès cette semaine
            </CardTitle>
            <CardDescription>
              Vous avez complété {weeklyProgress}% de vos objectifs hebdomadaires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={weeklyProgress} className="w-full" />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Lundi</span>
              <span>Mardi</span>
              <span>Mercredi</span>
              <span>Jeudi</span>
              <span>Vendredi</span>
              <span>Samedi</span>
              <span>Dimanche</span>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="journal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="journal">Journal</TabsTrigger>
            <TabsTrigger value="mood">Humeur</TabsTrigger>
            <TabsTrigger value="rewards">Récompenses</TabsTrigger>
            <TabsTrigger value="community">Communauté</TabsTrigger>
          </TabsList>

          <TabsContent value="journal">
            <JournalEntry onEntrySubmit={(entry) => {
              console.log('New journal entry:', entry);
              setUserStats(prev => ({
                ...prev,
                totalEntries: prev.totalEntries + 1,
                mindTokens: prev.mindTokens + 10
              }));
            }} />
          </TabsContent>

          <TabsContent value="mood">
            <MoodTracker 
              currentMood={userStats.currentMood}
              onMoodUpdate={(mood) => {
                setUserStats(prev => ({
                  ...prev,
                  currentMood: mood,
                  mindTokens: prev.mindTokens + 5
                }));
              }}
            />
          </TabsContent>

          <TabsContent value="rewards">
            <RewardsPanel tokens={userStats.mindTokens} level={userStats.level} />
          </TabsContent>

          <TabsContent value="community">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Communauté MindChain
                </CardTitle>
                <CardDescription>
                  Connectez-vous avec d'autres membres de manière anonyme et bienveillante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-purple-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Bientôt disponible</h3>
                  <p className="text-gray-600 mb-6">
                    La fonctionnalité communauté sera lancée prochainement. 
                    Restez connecté pour partager votre parcours avec d'autres.
                  </p>
                  <Button disabled>
                    <Plus className="w-4 h-4 mr-2" />
                    Rejoindre la communauté
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
