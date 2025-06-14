
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Coins, 
  Trophy, 
  Gift, 
  Star,
  Zap,
  Heart,
  Target,
  Crown
} from 'lucide-react';

interface RewardsPanelProps {
  tokens: number;
  level: number;
}

const RewardsPanel: React.FC<RewardsPanelProps> = ({ tokens, level }) => {
  const nextLevelTokens = level * 100;
  const progressToNextLevel = ((tokens % 100) / 100) * 100;

  const achievements = [
    {
      id: 1,
      title: "Premier Pas",
      description: "Première entrée de journal",
      icon: Star,
      unlocked: true,
      reward: 10
    },
    {
      id: 2,
      title: "Persévérant",
      description: "7 jours consécutifs",
      icon: Target,
      unlocked: true,
      reward: 50
    },
    {
      id: 3,
      title: "Écrivain Régulier",
      description: "20 entrées de journal",
      icon: Heart,
      unlocked: true,
      reward: 100
    },
    {
      id: 4,
      title: "Maître du Bien-être",
      description: "30 jours consécutifs",
      icon: Crown,
      unlocked: false,
      reward: 200
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Consultation avec un Pro",
      description: "30 minutes avec un psychologue certifié",
      cost: 500,
      icon: Zap,
      available: tokens >= 500
    },
    {
      id: 2,
      title: "Ressources Premium",
      description: "Accès aux guides de méditation avancés",
      cost: 200,
      icon: Gift,
      available: tokens >= 200
    },
    {
      id: 3,
      title: "Badge Personnalisé",
      description: "Créez votre propre badge de profil",
      cost: 100,
      icon: Star,
      available: tokens >= 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <Card className="border-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{tokens} MIND</h3>
                <p className="text-yellow-100">Tokens disponibles</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-3 rounded-full">
                <Trophy className="w-8 h-8" />
              </div>
              <p className="text-sm mt-1">Niveau {level}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progrès vers niveau {level + 1}</span>
              <span>{tokens % 100}/100</span>
            </div>
            <Progress value={progressToNextLevel} className="bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
            Accomplissements
          </CardTitle>
          <CardDescription>
            Débloquez des récompenses en atteignant vos objectifs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={achievement.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                    {achievement.unlocked ? "Débloqué" : `${achievement.reward} MIND`}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reward Shop */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Gift className="w-5 h-5 mr-2 text-purple-600" />
            Boutique de Récompenses
          </CardTitle>
          <CardDescription>
            Échangez vos MIND tokens contre des récompenses exclusives
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {rewards.map((reward) => {
              const IconComponent = reward.icon;
              return (
                <div 
                  key={reward.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    reward.available 
                      ? 'bg-purple-50 border-purple-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      reward.available 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{reward.title}</h4>
                      <p className="text-sm text-gray-600">{reward.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {reward.cost} MIND
                    </Badge>
                    <Button 
                      size="sm" 
                      disabled={!reward.available}
                      className={reward.available ? 
                        "bg-purple-600 hover:bg-purple-700" : ""
                      }
                    >
                      {reward.available ? "Échanger" : "Indisponible"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsPanel;
