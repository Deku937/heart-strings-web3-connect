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

    // Floating elements moins visibles, moins nombreux, plus subtils.
    const elements = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 1.2
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
      {/* Éléments flottants plus subtils */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute pointer-events-none"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            filter: "blur(1.5px)",
            opacity: 0.12 + (0.08 * (element.id % 3)),
            animation: `floatSoft 10s ease-in-out infinite alternate ${element.delay}s`
          }}
        >
          {element.id % 3 === 0 ? (
            <Brain className="w-8 h-8 text-purple-400" />
          ) : element.id % 3 === 1 ? (
            <Sparkles className="w-5 h-5 text-blue-400" />
          ) : (
            <Star className="w-4 h-4 text-indigo-400" />
          )}
        </div>
      ))}

      {/* Barres décoratives assombries, statiques ou avec fade */}
      <div className="absolute top-16 left-0 right-0 h-12 bg-gradient-to-r from-purple-600 to-blue-600 opacity-10 -skew-y-1"></div>
      <div className="absolute top-28 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-blue-600 opacity-8 skew-y-1"></div>
      
      {/* Hero */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex justify-end items-center mb-8 space-x-2">
            <Button 
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 transition-all duration-200 hover:scale-102 hover:shadow focus:ring-2 focus:ring-blue-300"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {t('login')}
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 transition-all duration-200 hover:scale-102 hover:shadow focus:ring-2 focus:ring-blue-300"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('signup')}
            </Button>
            <div>
              <LanguageSelector />
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
          
          {/* Enlève le "bounce"/"pulse" pour une transition douce */}
          <div className={`flex justify-center mb-6 transition-all duration-700 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full shadow-xl transition-transform duration-300">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className={`text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {t('app_title')}
          </h1>
          
          <p className={`text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {t('app_subtitle')}
          </p>
          
          <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <Button 
              onClick={() => navigate('/auth')}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 min-w-[200px] transition-transform duration-300 hover:scale-103 hover:shadow-xl"
            >
              <Wallet className="mr-2 h-4 w-4" />
              {t('login')}
            </Button>
          </div>
        </div>
        {/* Features grid : animation cascade fade-in / slide-in */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Shield, color: 'purple', title: t('private_secure'), desc: t('private_secure_desc'), delay: '0.08s' },
            { icon: Coins, color: 'blue', title: t('automatic_rewards'), desc: t('automatic_rewards_desc'), delay: '0.16s' },
            { icon: Users, color: 'indigo', title: t('professional_access'), desc: t('professional_access_desc'), delay: '0.24s' },
            { icon: Calendar, color: 'green', title: t('personalized_tracking'), desc: t('personalized_tracking_desc'), delay: '0.32s' },
            { icon: Trophy, color: 'orange', title: t('supportive_community'), desc: t('supportive_community_desc'), delay: '0.40s' },
            { icon: Wallet, color: 'pink', title: t('total_control'), desc: t('total_control_desc'), delay: '0.48s' }
          ].map((feature, index) => (
            <Card 
              key={index}
              className={`opacity-0 will-change-transform animate-feature-fade-in transform transition-all duration-500 border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 hover:scale-[1.03] hover:shadow-lg`}
              style={{ animationDelay: feature.delay, animationFillMode: "forwards" }}
            >
              <CardHeader>
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <CardTitle className={`text-${feature.color}-900 dark:text-${feature.color}-100`}>
                  {feature.title}
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {feature.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        {/* Call to Action : fade-in subtile */}
        <div className={`text-center transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                {t('revolutionize_wellbeing')}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {t('revolutionize_desc')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/auth')}
                  variant="secondary" 
                  size="lg"
                  className="min-w-[200px] transition-transform duration-300 hover:scale-103 hover:shadow-lg"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {t('login')}
                </Button>
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-transform duration-300 hover:scale-102"
                  size="lg"
                >
                  {t('learn_more')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Animations sobres : fade-in, translation douce */}
      <style>{`
        @keyframes floatSoft {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-18px); }
        }
        .animate-feature-fade-in {
          animation: featureFadeIn 0.7s cubic-bezier(.36,1.01,.64,1) forwards;
        }
        @keyframes featureFadeIn {
          from { opacity:0; transform: translateY(30px); }
          to { opacity:1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Index;
