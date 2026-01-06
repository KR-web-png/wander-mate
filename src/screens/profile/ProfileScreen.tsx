import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, MapPin, Star, Calendar, Shield, 
  Edit2, ChevronRight, LogOut, Heart, Globe,
  Camera, Award
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Avatar } from '@/components/common/Avatar';
import { Badge } from '@/components/common/Badge';
import { currentUser } from '@/services/mock.data';
import { authService } from '@/services/auth.service';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: Edit2, label: 'Edit Profile', path: '/profile/edit' },
    { icon: Heart, label: 'My Interests', path: '/profile/interests' },
    { icon: Globe, label: 'Languages', path: '/profile/languages' },
    { icon: Shield, label: 'Safety & Privacy', path: '/profile/safety' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header title="Profile" showSettings />
      
      <main className="pt-20 px-4 max-w-lg mx-auto">
        {/* Profile Header */}
        <Card variant="elevated" className="p-6 mb-6 animate-fade-in">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size="2xl"
                verificationStatus={currentUser.verificationStatus}
                showBadge
              />
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center shadow-medium">
                <Camera className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
            
            <h1 className="font-display text-2xl font-bold text-foreground">
              {currentUser.name}
            </h1>
            
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="h-3.5 w-3.5" />
              {currentUser.location}
            </p>
            
            <div className="flex items-center gap-3 mt-3">
              <Badge 
                variant={currentUser.verificationStatus === 'fully_verified' ? 'success' : 'info'}
              >
                <Shield className="h-3 w-3 mr-1" />
                {currentUser.verificationStatus === 'fully_verified' 
                  ? 'Verified' 
                  : 'ID Verified'}
              </Badge>
              <Badge variant="outline">
                <Calendar className="h-3 w-3 mr-1" />
                Joined {format(currentUser.joinedDate, 'MMM yyyy')}
              </Badge>
            </div>
          </div>
          
          <p className="text-center text-muted-foreground mt-4">
            {currentUser.bio}
          </p>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 animate-fade-in" 
             style={{ animationDelay: '0.1s' }}>
          <Card variant="gradient" className="p-4 text-center">
            <Award className="h-5 w-5 mx-auto text-sunset mb-1" />
            <p className="text-xl font-bold text-foreground">{currentUser.tripsCompleted}</p>
            <p className="text-xs text-muted-foreground">Trips</p>
          </Card>
          <Card variant="gradient" className="p-4 text-center">
            <Star className="h-5 w-5 mx-auto text-sunset fill-sunset mb-1" />
            <p className="text-xl font-bold text-foreground">{currentUser.rating}</p>
            <p className="text-xs text-muted-foreground">Rating</p>
          </Card>
          <Card variant="gradient" className="p-4 text-center">
            <Globe className="h-5 w-5 mx-auto text-ocean mb-1" />
            <p className="text-xl font-bold text-foreground">{currentUser.languages.length}</p>
            <p className="text-xs text-muted-foreground">Languages</p>
          </Card>
        </div>

        {/* Travel Style */}
        <Card variant="gradient" className="p-4 mb-6 animate-fade-in"
              style={{ animationDelay: '0.15s' }}>
          <h3 className="font-display font-semibold text-foreground mb-3">
            Travel Style
          </h3>
          <Badge variant="premium" size="lg" className="capitalize">
            {currentUser.travelStyle.replace('_', ' ')}
          </Badge>
        </Card>

        {/* Interests */}
        <Card variant="gradient" className="p-4 mb-6 animate-fade-in"
              style={{ animationDelay: '0.2s' }}>
          <h3 className="font-display font-semibold text-foreground mb-3">
            Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.interests.map(interest => (
              <Badge key={interest} variant="outline">
                {interest}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Languages */}
        <Card variant="gradient" className="p-4 mb-6 animate-fade-in"
              style={{ animationDelay: '0.25s' }}>
          <h3 className="font-display font-semibold text-foreground mb-3">
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentUser.languages.map(lang => (
              <Badge key={lang} variant="info">
                {lang}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Menu */}
        <Card variant="elevated" className="divide-y divide-border mb-6 animate-fade-in"
              style={{ animationDelay: '0.3s' }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            );
          })}
        </Card>

        {/* Logout */}
        <Button 
          variant="outline" 
          className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground animate-fade-in"
          style={{ animationDelay: '0.35s' }}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </main>

      <BottomNav />
    </div>
  );
};
