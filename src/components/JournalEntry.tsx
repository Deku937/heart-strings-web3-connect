
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [entry, setEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!entry.trim()) {
      toast({
        title: "Empty Entry",
        description: "Please write something before saving.",
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
        title: "Entry Saved! 🎉",
        description: "Your journal has been secured on the blockchain. +10 MIND tokens earned!",
      });
    }, 2000);
  };

  const promptSuggestions = [
    "How I feel today...",
    "Something I'm grateful for...",
    "My biggest challenge today...",
    "A recent personal victory...",
    "What I'd like to improve..."
  ];

  return (
    <div className="space-y-6">
      {/* Today's Entry Card */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <Book className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>{t('todays_journal')}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <Lock className="w-3 h-3 mr-1" />
              {t('encrypted')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={t('journal_placeholder')}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-[200px] resize-none border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {entry.length > 0 && `${entry.length} characters`}
            </div>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting || !entry.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  {t('saving')}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {t('save')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Writing Prompts */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
        <CardHeader>
          <CardTitle className="text-lg">{t('writing_suggestions')}</CardTitle>
          <CardDescription className="dark:text-gray-300">
            {t('writing_suggestions_desc')}
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
                className="text-left justify-start hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-950 dark:hover:border-purple-700"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-0 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3 text-sm text-purple-800 dark:text-purple-100">
            <Lock className="w-5 h-5" />
            <div>
              <p className="font-medium">{t('privacy_notice')}</p>
              <p>{t('privacy_notice_desc')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntry;
