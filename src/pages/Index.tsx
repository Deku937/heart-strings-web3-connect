import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Shield, Coins, Users, Calendar, Trophy, Wallet, LogIn, UserPlus } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import { useAuth } from '@/hooks/useAuth';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mb-4 inline-block">
            <Brain className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
      {/* Decorative bars with same gradient as login button */}
      <div className="absolute top-16 left-0 right-0 h-12 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 transform -skew-y-1"></div>
      <div className="absolute top-28 left-0 right-0 h-8 bg-gradient-to-r from-purple-600 to-blue-600 opacity-15 transform skew-y-1"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          {/* Header with controls */}
          <div className="flex justify-end items-center mb-8 space-x-2">
            <Button 
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {t('login')}
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {t('signup')}
            </Button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full">
              <Brain className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            {t('app_title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t('app_subtitle')}
          </p>
          
          <Button 
            onClick={() => navigate('/auth')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 min-w-[200px]"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {t('login')}
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-900 dark:text-purple-100">{t('private_secure')}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {t('private_secure_desc')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-900 dark:text-blue-100">{t('automatic_rewards')}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {t('automatic_rewards_desc')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <CardTitle className="text-indigo-900 dark:text-indigo-100">{t('professional_access')}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {t('professional_access_desc')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-green-900 dark:text-green-100">{t('personalized_tracking')}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {t('personalized_tracking_desc')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-orange-900 dark:text-orange-100">{t('supportive_community')}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {t('supportive_community_desc')}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-pink-600" />
              </div>
              <CardTitle className="text-pink-900 dark:text-pink-100">{t('total_control')}</CardTitle>
              <CardDescription className="dark:text-gray-300">
                {t('total_control_desc')}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
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
                  className="min-w-[200px]"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {t('login')}
                </Button>
                <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" size="lg">
                  {t('learn_more')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
