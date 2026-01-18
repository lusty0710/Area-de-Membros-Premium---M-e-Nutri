import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Check, CheckCheck, Trophy, MessageCircle } from 'lucide-react';
import { CHAT_CONTACTS, INITIAL_CHAT_MESSAGES } from '../constants';
import { ChatMessage, User } from '../types';
import { Ranking } from './Ranking';

interface CommunityFeedProps {
  user?: User;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'ranking'>('chats');
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [messages, setMessages] = useState<Record<number, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fallback to first contact if activeChatId is not found (e.g. if ID 2 was removed but state persisted)
  const activeContact = CHAT_CONTACTS.find(c => c.id === activeChatId) || CHAT_CONTACTS[0];
  const activeMessages = messages[activeContact?.id] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chats') {
      scrollToBottom();
    }
  }, [activeMessages, activeChatId, activeTab]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Use activeContact.id instead of activeChatId directly to ensure we are sending to a valid contact
    const currentChatId = activeContact.id;

    const userMessage: ChatMessage = {
      id: Date.now(),
      senderId: 0, // Usuário atual
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), userMessage]
    }));
    
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = (id: number) => {
    setActiveChatId(id);
    setIsMobileListOpen(false);
  };

  if (activeTab === 'ranking') {
    return (
      <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between dark:bg-gray-900 dark:border-gray-700">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('chats')} 
              className="text-gray-500 hover:text-brand-primary font-medium flex items-center gap-2"
            >
              <MessageCircle size={20} /> Chats
            </button>
            <button 
              className="text-brand-primary font-bold border-b-2 border-brand-primary flex items-center gap-2"
            >
              <Trophy size={20} /> Ranking
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <Ranking />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in dark:bg-gray-800 dark:border-gray-700">
      
      {/* Sidebar / Lista de Contatos */}
      <div className={`
        w-full md:w-[320px] bg-white border-r border-gray-200 flex flex-col dark:bg-gray-800 dark:border-gray-700
        ${isMobileListOpen ? 'block' : 'hidden md:flex'}
      `}>
        {/* Header da Lista */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between dark:bg-gray-900 dark:border-gray-700">
          <div className="flex gap-4">
            <button 
              className="text-brand-primary font-bold border-b-2 border-brand-primary flex items-center gap-2"
            >
              <MessageCircle size={20} /> Chats
            </button>
            <button 
              onClick={() => setActiveTab('ranking')} 
              className="text-gray-500 hover:text-brand-primary font-medium flex items-center gap-2"
            >
              <Trophy size={20} /> Ranking
            </button>
          </div>
          <div className="flex gap-2 text-gray-500">
             <MoreVertical size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* Busca */}
        <div className="p-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Pesquisar conversa..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary dark:bg-gray-700 dark:text-white"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {CHAT_CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => handleContactClick(contact.id)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 ${activeContact?.id === contact.id ? 'bg-brand-bg/50 dark:bg-gray-700/50' : ''}`}
            >
              <div className="relative">
                 <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                 {contact.unreadCount > 0 && (
                   <div className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white font-bold">
                     {contact.unreadCount}
                   </div>
                 )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 truncate dark:text-gray-200">{contact.name}</h3>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                      contact.isOnline 
                        ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      {contact.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">{contact.lastTime}</span>
                </div>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área do Chat */}
      <div className={`
        flex-1 flex flex-col bg-[#efeae2] bg-opacity-30 dark:bg-gray-900
        ${!isMobileListOpen ? 'block' : 'hidden md:flex'}
      `}>
        {/* Header do Chat */}
        <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm z-10 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-gray-500 dark:text-gray-300"
              onClick={() => setIsMobileListOpen(true)}
            >
              <i className="fa-solid fa-arrow-left"></i> Voltar
            </button>
            <img src={activeContact?.avatar} alt={activeContact?.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-gray-800 leading-tight dark:text-white">{activeContact?.name}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 dark:text-gray-400">
                <span className={`w-2 h-2 rounded-full ${activeContact?.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                {activeContact?.isGroup 
                  ? 'Mães: Ana, Carla, Você...' 
                  : (activeContact?.isOnline ? 'Online' : 'Visto por último hoje')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-brand-primary">
            <Video size={20} className="cursor-pointer hover:text-brand-dark" />
            <Phone size={20} className="cursor-pointer hover:text-brand-dark" />
            <Search size={20} className="hidden sm:block cursor-pointer hover:text-brand-dark" />
          </div>
        </div>

        {/* Mensagens */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" 
          style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundSize: '400px' }}
        >
          {activeMessages.map((msg) => {
            const isMe = msg.senderId === 0;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] sm:max-w-[60%] rounded-lg p-3 shadow-sm relative group
                  ${isMe ? 'bg-[#d9fdd3] rounded-tr-none dark:bg-green-900' : 'bg-white rounded-tl-none dark:bg-gray-700'}
                `}>
                  {!isMe && activeContact?.isGroup && (
                    <p className="text-xs font-bold text-orange-600 mb-1">
                      {msg.senderId === 2 ? 'Carla Mendes' : 'Mãe VIP'}
                    </p>
                  )}
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap dark:text-gray-100">{msg.text}</p>
                  <div className="flex justify-end items-center gap-1 mt-1">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {msg.timestamp}
                    </span>
                    {isMe && (
                      <CheckCheck size={14} className="text-blue-400" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200 flex items-center gap-3 dark:bg-gray-800 dark:border-gray-700">
          <Smile size={24} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          <Paperclip size={24} className="text-gray-400 cursor-pointer hover:text-gray-600" />
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Digite uma mensagem" 
              className="w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-3 rounded-full transition-all ${inputText.trim() ? 'bg-brand-primary text-white hover:bg-brand-dark transform hover:scale-105' : 'bg-gray-200 text-gray-400 cursor-default dark:bg-gray-600'}`}
          >
            <Send size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};