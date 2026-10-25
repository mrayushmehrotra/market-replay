'use client';

import React, { useState } from 'react';
import { FxrIcon } from './fxr-icon';

export function MentorFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hello! I am your Market Replay Trading Mentor. I've analyzed your backtesting performance on XAUUSD (41.03% win rate across 39 trades). How can I help optimize your strategy or risk parameters today?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);

    setTimeout(() => {
      let reply = "Your risk-to-reward ratio currently gives you positive expectancy despite a 41% win rate. Consider testing tighter stop losses around key 4H liquidity levels or trailing your profit targets when moving with trend momentum.";
      if (userText.toLowerCase().includes('gold') || userText.toLowerCase().includes('xau')) {
        reply = "For XAUUSD (Gold), volatility peaks during New York overlap (13:00 - 17:00 UTC). Make sure your session filters avoid Asian session chop unless playing mean-reversion with defined ranges.";
      }
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-11 right-11 z-[1001] mentor-fab-neon-wrapper">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Mentor Chat"
          style={{
            display: 'flex',
            width: '60px',
            height: '60px',
            padding: '7.5px 12.5px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderRadius: '40px',
            border: '2px solid #313235',
            background: '#030303',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2,
            opacity: 1,
          }}
          className="hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          <div
            style={{
              backgroundImage: 'url("/assets/icons/ai-logo.svg")',
              backgroundPosition: 'center center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: '28px',
              height: '28px',
            }}
          />
        </button>
      </div>

      {/* Mentor Chat Drawer */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 sm:right-11 w-[92vw] sm:w-[400px] h-[520px] max-h-[80vh] bg-[#090d14] border border-[#1b2433] rounded-3xl shadow-2xl z-[1002] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#1b2433] flex items-center justify-between bg-[#0d121c]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <FxrIcon icon="ai-logo" size={16} color="#2C7BFD" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white font-lato">Market Replay Mentor AI</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-[#22c55e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>Active Analysis</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-lg p-1"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-[#2C7BFD] text-white rounded-br-none'
                      : 'bg-[#151c28] border border-[#1e2738] text-gray-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-[#1b2433] bg-[#0d121c] flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask mentor about your trades or strategy..."
              className="flex-1 bg-[#151c28] border border-[#1e2738] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-[#2C7BFD]"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#2C7BFD] hover:bg-[#2576fd] text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
