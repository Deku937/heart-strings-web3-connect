
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Book, 
  Save, 
  Lock, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface JournalEntryProps {
  onEntrySubmit: (entry: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ onEntrySubmit }) => {
  const [entry, setEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!entry.trim()) {
      toast({
        title: "Entrée vide",
        description: "Veuillez écrire quelque chose avant de sauvegarder.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate blockchain transaction
    setTimeout(() => {
      onEntrySubmit(entry);
      setEntry('');
      setIsSubmitting(false);
      
      toast({
        title: "Entrée sauvegardée! 🎉",
        description: "Votre journal a été sécurisé sur la blockchain. +10 MIND tokens gagnés!",
      });
    }, 2000);
  };

  const promptSuggestions = [
    "Comment je me sens aujourd'hui...",
    "Une chose pour laquelle je suis reconnaissant...",
    "Mon plus grand défi aujourd'hui...",
    "Une victoire personnelle récente...",
    "Ce que j'aimerais améliorer..."
  ];

  return (
    <div className="space-y-6">
      {/* Today's Entry Card */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Journal d'aujourd'hui</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Lock className="w-3 h-3 mr-1" />
              Crypté
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Exprimez vos pensées, émotions, et réflexions en toute sécurité..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-[200px] resize-none border-purple-200 focus:border-purple-400"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              {entry.length > 0 && `${entry.length} caractères`}
            </div>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !entry.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Sauvegarde sécurisée...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Writing Prompts */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Suggestions d'écriture</CardTitle>
          <CardDescription>
            Besoin d'inspiration ? Cliquez sur une suggestion pour commencer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {promptSuggestions.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setEntry(prompt)}
                className="text-left justify-start hover:bg-purple-50 hover:border-purple-300"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-0 bg-gradient-to-r from-purple-100 to-blue-100">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 text-sm text-purple-800">
            <Lock className="w-5 h-5" />
            <div>
              <p className="font-medium">100% Privé et Sécurisé</p>
              <p>Vos entrées sont cryptées end-to-end et stockées de manière décentralisée. 
                 Seul vous avez accès à vos données personnelles.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntry;
