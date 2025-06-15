import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Coins, Users, Calendar, Trophy, Wallet, LogIn, UserPlus, Sparkles, Star } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate floating elements
    const elements = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setFloatingElements(elements);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mb-4 inline-block animate-pulse">
            <Brain className="w-12 h-12 text-white animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
            {t('app_title')}
          </h1>
        </div>
      </div>
    );
  }

  if (user) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      {/* Animated floating elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-20 animate-pulse"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animation: `float 6s ease-in-out infinite ${element.delay}s`
          }}
        >
          {element.id % 3 === 0 ? (
            <Brain className="w-8 h-8 text-purple-400" />
          ) : element.id % 3 === 1 ? (
            <Sparkles className="w-6 h-6 text-blue-400" />
          ) : (
            <Star className="w-5 h-5 text-indigo-400" />
          )}
        </div>
      ))}

      {/* Animated decorative bars */}
      <div className="absolute top-16 left-0 right-0 h-12 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 transform -skew-y-1 animate-slide-in-right"></div>
      <div className="absolute top-28 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-blue-600 opacity-15 transform skew-y-1 animate-slide-in-right" style={{ animationDelay: '0.2s' }}></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Header with controls */}
          <div className={`flex justify-end items-center mb-8 space-x-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {t('login')}
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('signup')}
            </Button>
            <div className="transform transition-all duration-300 hover:scale-105">
              <LanguageSelector />
            </div>
            <div className="transform transition-all duration-300 hover:scale-105">
              <ThemeToggle />
            </div>
          </div>
          
          <div className={`flex justify-center mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ animationDelay: '0.5s' }}>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full animate-pulse hover:animate-bounce transition-all duration-300 hover:scale-110 shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.7s' }}>
            {t('app_title')}
          </h1>
          
          <p className={`text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.9s' }}>
            {t('app_subtitle')}
          </p>
          
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1.1s' }}>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 min-w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {t('login')}
            </Button>
          </div>
        </div>

        {/* Features Grid with staggered animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Shield, color: 'purple', title: t('private_secure'), desc: t('private_secure_desc'), delay: '0.2s' },
            { icon: Coins, color: 'blue', title: t('automatic_rewards'), desc: t('automatic_rewards_desc'), delay: '0.4s' },
            { icon: Users, color: 'indigo', title: t('professional_access'), desc: t('professional_access_desc'), delay: '0.6s' },
            { icon: Calendar, color: 'green', title: t('personalized_tracking'), desc: t('personalized_tracking_desc'), delay: '0.8s' },
            { icon: Trophy, color: 'orange', title: t('supportive_community'), desc: t('supportive_community_desc'), delay: '1.0s' },
            { icon: Wallet, color: 'pink', title: t('total_control'), desc: t('total_control_desc'), delay: '1.2s' }
          ].map((feature, index) => (
            <Card 
              key={index}
              className={`hover:shadow-lg transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 transform hover:scale-105 hover:-translate-y-2 opacity-0 animate-fade-in group cursor-pointer`}
              style={{ animationDelay: feature.delay, animationFillMode: 'forwards' }}
            >
              <CardHeader>
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-lg flex items-center justify-center mb-4 group-hover:animate-bounce transition-all duration-300`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <CardTitle className={`text-${feature.color}-900 dark:text-${feature.color}-100 group-hover:text-${feature.color}-600 transition-colors duration-300`}>
                  {feature.title}
                </CardTitle>
                <CardDescription className="dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Call to Action with enhanced animation */}
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '1.4s' }}>
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4 animate-fade-in">
                {t('revolutionize_wellbeing')}
              </h2>
              <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {t('revolutionize_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/auth')}
                  variant="secondary" 
                  size="lg"
                  className="min-w-[200px] transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-bounce"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {t('login')}
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 transform transition-all duration-300 hover:scale-105" 
                  size="lg"
                >
                  {t('learn_more')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 1s ease-out forwards;
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100%) skewY(1deg); }
          to { transform: translateX(0) skewY(1deg); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
