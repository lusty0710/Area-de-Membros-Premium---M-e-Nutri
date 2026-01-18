import React, { useEffect, useState } from 'react';
import { Notification } from '../types';
import { MessageCircle, Heart, Bell, MessageSquare } from 'lucide-react';

interface NotificationToastProps {
  notification: Notification | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  if (!notification && !isVisible) return null;

  const getIcon = () => {
    switch (notification?.type) {
      case 'chat': return <MessageCircle className="w-6 h-6 text-blue-500" />;
      case 'like': return <Heart className="w-6 h-6 text-red-500" />;
      case 'comment': return <MessageSquare className="w-6 h-6 text-green-500" />;
      default: return <Bell className="w-6 h-6 text-brand-primary" />;
    }
  };

  return (
    <div 
      className={`fixed top-24 right-5 bg-white p-4 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.15)] z-[9999] max-w-xs transition-all duration-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="flex items-center gap-3">
        <span className="bg-gray-50 p-2 rounded-full">{getIcon()}</span>
        <div className="flex-1">
          <div className="font-semibold text-sm text-gray-800 mb-1">{notification?.from}</div>
          <div className="text-xs text-gray-500">{notification?.message}</div>
        </div>
      </div>
    </div>
  );
};