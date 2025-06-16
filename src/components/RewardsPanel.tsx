
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
      title: "First Step",
      description: "First journal entry",
      icon: Star,
      unlocked: true,
      reward: 10
    },
    {
      id: 2,
      title: "Perseverant",
      description: "7 days in a row",
      icon: Target,
      unlocked: true,
      reward: 50
    },
    {
      id: 3,
      title: "Regular Writer",
      description: "20 journal entries",
      icon: Heart,
      unlocked: true,
      reward: 100
    },
    {
      id: 4,
      title: "Wellbeing Master",
      description: "30 days in a row",
      icon: Crown,
      unlocked: false,
      reward: 200
    }
  ];

  const rewards = [
    {
      id: 1,
      title: "Consult with a Pro",
      description: "30 minutes with a certified psychologist",
      cost: 500,
      icon: Zap,
      available: tokens >= 500
    },
    {
      id: 2,
      title: "Premium Resources",
      description: "Access to advanced meditation guides",
      cost: 200,
      icon: Gift,
      available: tokens >= 200
    },
    {
      id: 3,
      title: "Custom Badge",
      description: "Create your own profile badge",
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
                <p className="text-yellow-100">Available tokens</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/20 p-3 rounded-full">
                <Trophy className="w-8 h-8" />
              </div>
              <p className="text-sm mt-1">Level {level}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to level {level + 1}</span>
              <span>{tokens % 100}/100</span>
            </div>
            <Progress value={progressToNextLevel} className="bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
            Achievements
          </CardTitle>
          <CardDescription className="text-blue-100">
            Unlock rewards by reaching your goals
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
                      ? 'bg-blue-700/50 border-blue-500' 
                      : 'bg-blue-900/30 border-blue-700 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-600 text-blue-300'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{achievement.title}</h4>
                      <p className="text-sm text-blue-200">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"} className={achievement.unlocked ? "bg-green-600 text-white" : "bg-blue-700 text-blue-200"}>
                    {achievement.unlocked ? "Unlocked" : `${achievement.reward} MIND`}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reward Shop */}
      <Card className="border-0 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Gift className="w-5 h-5 mr-2 text-purple-400" />
            Rewards Shop
          </CardTitle>
          <CardDescription className="text-blue-100">
            Exchange your MIND tokens for exclusive rewards
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
                      ? 'bg-blue-700/50 border-blue-500' 
                      : 'bg-blue-900/30 border-blue-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      reward.available 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-blue-600 text-blue-300'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{reward.title}</h4>
                      <p className="text-sm text-blue-200">{reward.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-blue-400 text-blue-100">
                      {reward.cost} MIND
                    </Badge>
                    <Button 
                      size="sm" 
                      disabled={!reward.available}
                      className={reward.available ? 
                        "bg-purple-600 hover:bg-purple-700 text-white" : "bg-blue-700 text-blue-300"
                      }
                    >
                      {reward.available ? "Redeem" : "Unavailable"}
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
