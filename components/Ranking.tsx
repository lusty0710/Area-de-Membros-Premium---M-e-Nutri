import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { User } from '../types';
import { ONLINE_USERS, MOCK_LIVE_USERS, LEVELS, getLevelInfo } from '../constants';

// Generate a fake ranking list combining available mock users
const GENERATED_RANKING: User[] = [
  ...ONLINE_USERS,
  ...MOCK_LIVE_USERS,
  { id: 201, name: "Paula Martins", avatar: "https://i.pravatar.cc/150?u=201", isOnline: false, points: 2500, badge: "🏆" },
  { id: 202, name: "Beatriz Souza", avatar: "https://i.pravatar.cc/150?u=202", isOnline: false, points: 2350, badge: "🏆" },
  { id: 203, name: "Larissa Manoela", avatar: "https://i.pravatar.cc/150?u=203", isOnline: false, points: 2100, badge: "🏆" },
  { id: 204, name: "Virginia F.", avatar: "https://i.pravatar.cc/150?u=204", isOnline: false, points: 1950, badge: "👑" },
  { id: 205, name: "Tata W.", avatar: "https://i.pravatar.cc/150?u=205", isOnline: false, points: 1800, badge: "👑" },
  { id: 206, name: "Maisa Silva", avatar: "https://i.pravatar.cc/150?u=206", isOnline: false, points: 1600, badge: "👑" },
].sort((a, b) => (b.points || 0) - (a.points || 0)).map((u, index) => ({...u, position: index + 1}));

export const Ranking: React.FC = () => {
  return (
    <div className="animate-fade-in pb-10">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-3xl text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold mb-2 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-100" />
            Ranking Top 50
          </h1>
          <p className="opacity-90">As mamães mais ativas da comunidade! Participe, comente e suba de nível.</p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Posição</th>
                <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mamãe</th>
                <th className="py-4 px-6 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Nível</th>
                <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Pontos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {GENERATED_RANKING.map((user, index) => {
                const levelInfo = getLevelInfo(user.points || 0);
                const isTop3 = index < 3;
                
                return (
                  <tr key={user.id} className="hover:bg-brand-bg/30 transition-colors">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {index === 0 && <span className="text-2xl">🥇</span>}
                        {index === 1 && <span className="text-2xl">🥈</span>}
                        {index === 2 && <span className="text-2xl">🥉</span>}
                        {!isTop3 && <span className="font-bold text-gray-400 w-8 text-center">#{index + 1}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`relative p-0.5 rounded-full ${isTop3 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : ''}`}>
                           <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                        </div>
                        <span className={`font-medium ${isTop3 ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-bg text-brand-dark border border-brand-primary/20">
                        <span>{levelInfo.badge}</span>
                        {levelInfo.name}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <span className="font-bold text-gray-800">{user.points}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};