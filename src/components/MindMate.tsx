
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  Send,
  Image,
  Loader2,
  MessageSquare,
  User,
  Bot
} from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'text' | 'audio' | 'image';
  audioUrl?: string;
  imageUrl?: string;
}

const MindMate: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      role: 'assistant',
      content: "Hello! I'm MindMate, your mental health companion. I'm here to support you with mental wellness questions, help you navigate this app, and assist with your wellbeing journey. You can talk to me via text or voice, and I can even generate calming images for you. How can I help you today?",
      timestamp: new Date(),
      type: 'text'
    }]);
  }, []);

  const addMessage = (role: 'user' | 'assistant', content: string, type: 'text' | 'audio' | 'image' = 'text', audioUrl?: string, imageUrl?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      type,
      audioUrl,
      imageUrl
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordedChunks([]);
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const processAudioRecording = async () => {
    if (recordedChunks.length === 0) return;

    const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
    const reader = new FileReader();
    
    reader.onloadend = async () => {
      const base64Audio = (reader.result as string).split(',')[1];
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase.functions.invoke('ai-speech-to-text', {
          body: { audio: base64Audio },
        });

        if (error) throw error;

        const transcribedText = data.text;
        addMessage('user', transcribedText, 'text');
        await sendToMindMate(transcribedText);
      } catch (error) {
        console.error('Speech to text error:', error);
        toast({
          title: "Error",
          description: "Could not process audio. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setRecordedChunks([]);
      }
    };
    
    reader.readAsDataURL(audioBlob);
  };

  useEffect(() => {
    if (!isRecording && recordedChunks.length > 0) {
      processAudioRecording();
    }
  }, [isRecording, recordedChunks]);

  const sendToMindMate = async (message: string) => {
    try {
      setIsLoading(true);
      
      // Check if user is asking for an image
      const imageKeywords = ['image', 'picture', 'visualize', 'show me', 'generate', 'create a picture', 'draw'];
      const isImageRequest = imageKeywords.some(keyword => message.toLowerCase().includes(keyword));
      
      if (isImageRequest) {
        // Generate image
        const { data: imageData, error: imageError } = await supabase.functions.invoke('ai-generate-image', {
          body: { prompt: `A calming, therapeutic image related to: ${message}` },
        });

        if (imageError) throw imageError;

        addMessage('assistant', 'I\'ve created a calming image for you based on your request:', 'image', undefined, imageData.imageUrl);
      } else {
        // Generate text response
        const { data, error } = await supabase.functions.invoke('ai-generate-text', {
          body: { 
            prompt: `You are MindMate, a compassionate mental health companion AI. You help users with mental wellness, mindfulness, and questions about mental health apps. Always be supportive, empathetic, and provide helpful guidance. User message: ${message}` 
          },
        });

        if (error) throw error;

        const assistantResponse = data.generatedText;
        addMessage('assistant', assistantResponse, 'text');

        // Generate audio response
        try {
          const { data: audioData, error: audioError } = await supabase.functions.invoke('ai-text-to-speech', {
            body: { 
              text: assistantResponse,
              voice: 'nova'
            },
          });

          if (!audioError && audioData.audioContent) {
            const audioBlob = new Blob([
              new Uint8Array(atob(audioData.audioContent).split('').map(c => c.charCodeAt(0)))
            ], { type: 'audio/mp3' });
            
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
          }
        } catch (audioError) {
          console.error('Audio generation error:', audioError);
        }
      }
    } catch (error) {
      console.error('MindMate error:', error);
      toast({
        title: "Error",
        description: "I'm having trouble responding right now. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText('');
    addMessage('user', userMessage, 'text');
    await sendToMindMate(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
              <h2 className="text-2xl font-bold">MindMate</h2>
              <p className="opacity-90">Your AI Mental Health Companion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
            Chat with MindMate
          </CardTitle>
          <CardDescription>
            Ask me about mental health, mindfulness, or how to use this app. I can respond with text, voice, or images.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    ) : (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      {message.imageUrl && (
                        <img 
                          src={message.imageUrl} 
                          alt="Generated image"
                          className="mt-2 rounded-lg max-w-full"
                        />
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">MindMate is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Textarea
              placeholder="Type your message or ask about mental health..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 min-h-[50px] max-h-[100px]"
              disabled={isLoading}
            />
            <div className="flex flex-col space-y-2">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                disabled={isLoading}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Voice Status */}
          {isRecording && (
            <div className="flex items-center justify-center space-x-2 text-red-600">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-sm">Recording... Click the mic to stop</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Volume2 className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">Voice Chat</p>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Talk naturally with MindMate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Mental Health Support</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Expert guidance and support
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Image className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-100">Therapeutic Images</p>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Calming visuals on request
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MindMate;
