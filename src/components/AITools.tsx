
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Wand2, 
  Volume2, 
  Sparkles,
  MessageSquare,
  Image,
  Loader2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

const AITools: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  // Text Generation State
  const [textPrompt, setTextPrompt] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  
  // Text-to-Speech State
  const [ttsText, setTtsText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  
  // Image Generation State
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');

  const setLoadingState = (key: string, isLoading: boolean) => {
    setLoading(prev => ({ ...prev, [key]: isLoading }));
  };

  const handleTextGeneration = async () => {
    if (!textPrompt.trim()) {
      toast({
        title: "Prompt requis",
        description: "Veuillez entrer un prompt pour générer du texte.",
        variant: "destructive",
      });
      return;
    }

    setLoadingState('textGen', true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-text', {
        body: { prompt: textPrompt },
      });

      if (error) {
        throw new Error(error.message);
      }

      setGeneratedText(data.generatedText);
      toast({
        title: "Texte généré! ✨",
        description: "L'IA a créé votre contenu avec succès.",
      });
    } catch (error) {
      console.error('Text generation error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le texte. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoadingState('textGen', false);
    }
  };

  const handleTextToSpeech = async () => {
    if (!ttsText.trim()) {
      toast({
        title: "Texte requis",
        description: "Veuillez entrer du texte à convertir en audio.",
        variant: "destructive",
      });
      return;
    }

    setLoadingState('tts', true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-text-to-speech', {
        body: { 
          text: ttsText,
          voice: selectedVoice 
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Play the generated audio
      const audioBlob = new Blob([
        new Uint8Array(atob(data.audioContent).split('').map(c => c.charCodeAt(0)))
      ], { type: 'audio/mp3' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();

      toast({
        title: "Audio généré! 🎵",
        description: "Votre texte a été converti en parole.",
      });
    } catch (error) {
      console.error('TTS error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer l'audio. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoadingState('tts', false);
    }
  };

  const handleImageGeneration = async () => {
    if (!imagePrompt.trim()) {
      toast({
        title: "Prompt requis",
        description: "Veuillez entrer une description pour générer une image.",
        variant: "destructive",
      });
      return;
    }

    setLoadingState('imageGen', true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-generate-image', {
        body: { prompt: imagePrompt },
      });

      if (error) {
        throw new Error(error.message);
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "Image générée! 🎨",
        description: "L'IA a créé votre image avec succès.",
      });
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer l'image. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoadingState('imageGen', false);
    }
  };

  const voices = [
    { id: 'alloy', name: 'Alloy', description: 'Voix neutre et claire' },
    { id: 'echo', name: 'Echo', description: 'Voix masculine' },
    { id: 'fable', name: 'Fable', description: 'Voix britannique' },
    { id: 'onyx', name: 'Onyx', description: 'Voix grave' },
    { id: 'nova', name: 'Nova', description: 'Voix féminine' },
    { id: 'shimmer', name: 'Shimmer', description: 'Voix douce' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <Brain className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Outils IA</h2>
              <p className="opacity-90">Explorez les capacités de l'intelligence artificielle</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Tools Tabs */}
      <Tabs defaultValue="text" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm dark:bg-gray-900/50">
          <TabsTrigger value="text" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Génération de texte</span>
          </TabsTrigger>
          <TabsTrigger value="voice" className="flex items-center space-x-2">
            <Volume2 className="w-4 h-4" />
            <span>Synthèse vocale</span>
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center space-x-2">
            <Image className="w-4 h-4" />
            <span>Génération d'images</span>
          </TabsTrigger>
        </TabsList>

        {/* Text Generation Tab */}
        <TabsContent value="text">
          <Card className="border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wand2 className="w-5 h-5 mr-2 text-purple-600" />
                Génération de texte avec IA
              </CardTitle>
              <CardDescription>
                Créez du contenu original avec l'intelligence artificielle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Écrivez votre journal personnel sur votre journée d'aujourd'hui..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="min-h-[100px]"
              />
              
              <Button 
                onClick={handleTextGeneration}
                disabled={loading.textGen}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {loading.textGen ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Générer du texte
                  </>
                )}
              </Button>

              {generatedText && (
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                    Texte généré:
                  </h4>
                  <p className="text-sm leading-relaxed">{generatedText}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice Synthesis Tab */}
        <TabsContent value="voice">
          <Card className="border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Volume2 className="w-5 h-5 mr-2 text-blue-600" />
                Synthèse vocale
              </CardTitle>
              <CardDescription>
                Convertissez votre texte en parole naturelle
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Tapez le texte que vous souhaitez entendre..."
                value={ttsText}
                onChange={(e) => setTtsText(e.target.value)}
                className="min-h-[100px]"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Choisir une voix:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {voices.map((voice) => (
                    <Button
                      key={voice.id}
                      variant={selectedVoice === voice.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedVoice(voice.id)}
                      className="text-left justify-start"
                    >
                      <div>
                        <div className="font-medium">{voice.name}</div>
                        <div className="text-xs opacity-70">{voice.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleTextToSpeech}
                disabled={loading.tts}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {loading.tts ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Génération audio...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Générer l'audio
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Image Generation Tab */}
        <TabsContent value="image">
          <Card className="border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="w-5 h-5 mr-2 text-green-600" />
                Génération d'images
              </CardTitle>
              <CardDescription>
                Créez des images uniques à partir de vos descriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Décrivez l'image que vous souhaitez créer (ex: Un paysage montagneux au coucher du soleil avec des nuages dorés)..."
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                className="min-h-[100px]"
              />
              
              <Button 
                onClick={handleImageGeneration}
                disabled={loading.imageGen}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {loading.imageGen ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Génération de l'image...
                  </>
                ) : (
                  <>
                    <Image className="w-4 h-4 mr-2" />
                    Générer l'image
                  </>
                )}
              </Button>

              {generatedImage && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Image className="w-4 h-4 mr-2 text-green-600" />
                    Image générée:
                  </h4>
                  <img 
                    src={generatedImage} 
                    alt="Generated image"
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Stats */}
      <Card className="border-0 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/20 dark:to-pink-900/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900 dark:text-orange-100">IA Alimentée par OpenAI</p>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  Technologie de pointe pour une expérience utilisateur exceptionnelle
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200">
              Actif
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AITools;
