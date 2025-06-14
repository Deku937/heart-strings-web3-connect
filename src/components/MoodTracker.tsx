
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  TrendingUp, 
  Calendar,
  Smile,
  Frown,
  Meh,
  Save
} from 'lucide-react';

interface MoodTrackerProps {
  currentMood: number;
  onMoodUpdate: (mood: number) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ currentMood, onMoodUpdate }) => {
  const [selectedMood, setSelectedMood] = useState([currentMood]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const moodLabels = {
    1: { label: 'Très difficile', color: 'text-red-600', icon: Frown },
    2: { label: 'Difficile', color: 'text-red-500', icon: Frown },
    3: { label: 'Pas génial', color: 'text-orange-500', icon: Frown },
    4: { label: 'Moyen-', color: 'text-orange-400', icon: Meh },
    5: { label: 'Neutre', color: 'text-yellow-500', icon: Meh },
    6: { label: 'Correct', color: 'text-yellow-400', icon: Meh },
    7: { label: 'Bien', color: 'text-green-400', icon: Smile },
    8: { label: 'Très bien', color: 'text-green-500', icon: Smile },
    9: { label: 'Excellent', color: 'text-green-600', icon: Smile },
    10: { label: 'Fantastique', color: 'text-green-700', icon: Smile }
  };

  const currentMoodInfo = moodLabels[selectedMood[0] as keyof typeof moodLabels];
  const IconComponent = currentMoodInfo.icon;

  const handleSaveMood = async () => {
    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      onMoodUpdate(selectedMood[0]);
      setIsSubmitting(false);
      
      toast({
        title: "Humeur enregistrée! 💚",
        description: `Votre humeur (${selectedMood[0]}/10) a été sauvegardée. +5 MIND tokens gagnés!`,
      });
    }, 1500);
  };

  const weeklyMoodData = [
    { day: 'Lun', mood: 7 },
    { day: 'Mar', mood: 6 },
    { day: 'Mer', mood: 8 },
    { day: 'Jeu', mood: 7 },
    { day: 'Ven', mood: 9 },
    { day: 'Sam', mood: 8 },
    { day: 'Dim', mood: selectedMood[0] }
  ];

  return (
    <div className="space-y-6">
      {/* Current Mood Tracker */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Comment vous sentez-vous ?</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric',
                    month: 'long'
                  })}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-pink-100 text-pink-800">
              Suivi quotidien
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mood Selector */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <IconComponent className={`w-12 h-12 ${currentMoodInfo.color}`} />
              <div>
                <div className="text-4xl font-bold">{selectedMood[0]}/10</div>
                <div className={`text-lg ${currentMoodInfo.color} font-medium`}>
                  {currentMoodInfo.label}
                </div>
              </div>
            </div>
            
            <div className="px-4">
              <Slider
                value={selectedMood}
                onValueChange={setSelectedMood}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 - Très difficile</span>
                <span>10 - Fantastique</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSaveMood}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
          >
            {isSubmitting ? (
              <>
                <Heart className="w-4 h-4 mr-2 animate-pulse" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Enregistrer mon humeur
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Weekly Mood Trend */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
            Tendance de la semaine
          </CardTitle>
          <CardDescription>
            Votre humeur au cours des 7 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simple mood chart */}
            <div className="grid grid-cols-7 gap-2">
              {weeklyMoodData.map((data, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{data.day}</div>
                  <div 
                    className={`w-full h-16 rounded-lg flex items-center justify-center text-white font-bold ${
                      data.mood >= 8 ? 'bg-green-500' :
                      data.mood >= 6 ? 'bg-yellow-500' :
                      data.mood >= 4 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  >
                    {data.mood}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
                <span>Bien (8-10)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
                <span>Moyen (6-7)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded mr-1"></div>
                <span>Difficile (4-5)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
                <span>Très difficile (1-3)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
