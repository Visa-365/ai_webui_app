import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Plus, Globe, Menu, Sun, Moon, User, ChevronDown, ChevronUp, X } from 'lucide-react';
import logo from './logo.svg';
import { v4 as uuidv4 } from 'uuid';
import AccountPage from './AccountPage';

const App = () => {
  // Load data from localStorage on initialization
  const loadChatsFromStorage = () => {
    try {
      const stored = localStorage.getItem('app_chats');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading chats from storage:', error);
      return [];
    }
  };

  const loadMessagesFromStorage = (chatId) => {
    try {
      const stored = localStorage.getItem(`app_messages_${chatId}`);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading messages from storage:', error);
      return [];
    }
  };

  const loadActiveChatIdFromStorage = () => {
    try {
      return localStorage.getItem('app_active_chat_id') || null;
    } catch (error) {
      console.error('Error loading active chat ID from storage:', error);
      return null;
    }
  };

  const [chats, setChats] = useState(loadChatsFromStorage);
  const [activeChatId, setActiveChatId] = useState(loadActiveChatIdFromStorage);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountPageOpen, setIsAccountPageOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Load messages for active chat on mount or when activeChatId changes
  useEffect(() => {
    if (activeChatId) {
      const loadedMessages = loadMessagesFromStorage(activeChatId);
      if (loadedMessages.length > 0) {
        setMessages(loadedMessages);
      } else {
        // New chat - show empty messages (will show welcome screen)
        setMessages([]);
      }
    } else {
      // No active chat - show empty state
      setMessages([]);
    }
  }, [activeChatId]);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    try {
      localStorage.setItem('app_chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chats to storage:', error);
    }
  }, [chats]);

  // Save active chat ID to localStorage whenever it changes
  useEffect(() => {
    try {
      if (activeChatId) {
        localStorage.setItem('app_active_chat_id', activeChatId);
      } else {
        localStorage.removeItem('app_active_chat_id');
      }
    } catch (error) {
      console.error('Error saving active chat ID to storage:', error);
    }
  }, [activeChatId]);

  const models = [
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
    'gpt-4',
    'gpt-4-turbo',
    'gpt-4-turbo-16k'
  ];

  const menuItems = [
    { icon: '🏠', label: 'Home', action: () => {} },
    { icon: '📚', label: 'Chat History', action: () => {} },
    { icon: '⚙️', label: 'Settings', action: () => {} },
    { icon: '❓', label: 'Help', action: () => {} },
    { icon: '🔒', label: 'Account', action: () => {} }
  ];

  const scrollToBottom = (behavior = 'smooth') => {
    const el = scrollContainerRef.current;
    if (el) {
      try {
        el.scrollTo({ top: el.scrollHeight, behavior });
        return;
      } catch (err) {
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    setAutoScroll(atBottom);
  };

  useEffect(() => {
    if (!autoScroll) return;
    const t = window.setTimeout(() => {
      requestAnimationFrame(() => scrollToBottom('smooth'));
    }, 20);
    return () => clearTimeout(t);
  }, [messages, autoScroll]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    let currentChatId = activeChatId;
    const messageText = inputText;
    
    // Create new chat if no active chat
    if (!activeChatId) {
      currentChatId = uuidv4();
      const newChat = {
        id: currentChatId,
        title: `Chat ${chats.length + 1}`,
        lastMessage: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(currentChatId);
    }
    
    // Add user message
    const newUserMessage = {
      id: uuidv4(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const currentMessages = messages.length > 0 ? messages : [];
    const updatedMessages = [...currentMessages, newUserMessage];
    setMessages(updatedMessages);
    
    // Save messages to localStorage immediately
    try {
      localStorage.setItem(`app_messages_${currentChatId}`, JSON.stringify(updatedMessages));
    } catch (error) {
      console.error('Error saving messages to storage:', error);
    }
    
    // Update chat's last message
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? { ...chat, lastMessage: messageText, timestamp: newUserMessage.timestamp }
        : chat
    ));
    
    setInputText('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: uuidv4(),
        sender: 'assistant',
        text: 'I received your request and I am ready to help. Please clarify what exactly you would like to know or do.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: selectedModel
      };
      
      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
      
      // Save updated messages to localStorage
      try {
        localStorage.setItem(`app_messages_${currentChatId}`, JSON.stringify(finalMessages));
      } catch (error) {
        console.error('Error saving messages to storage:', error);
      }
      
      // Update chat's last message with AI response
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, lastMessage: aiResponse.text, timestamp: aiResponse.timestamp }
          : chat
      ));
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation(); // Prevent chat selection when clicking delete
    
    // Remove chat from state
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    
    // Remove messages from localStorage
    try {
      localStorage.removeItem(`app_messages_${chatId}`);
    } catch (error) {
      console.error('Error removing messages from storage:', error);
    }
    
    // If deleted chat was active, clear active chat and messages
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
      try {
        localStorage.removeItem('app_active_chat_id');
      } catch (error) {
        console.error('Error removing active chat ID from storage:', error);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const quickActions = [
    { icon: '🗺️', label: 'Trip Planner' },
    { icon: '🎨', label: 'Image Editing' },
    { icon: '📚', label: 'Learning & Education' },
    { icon: '💼', label: 'Business Analysis' },
    { icon: '🎵', label: 'Music Assistant' },
    { icon: '🎮', label: 'Games & Entertainment' }
  ];

  // Show Account Page if opened
  if (isAccountPageOpen) {
    return (
      <AccountPage 
        menuItems={menuItems}
        isDarkTheme={isDarkTheme}
        onBack={() => setIsAccountPageOpen(false)}
      />
    );
  }

  return (
    <div className={`h-screen ${isDarkTheme ? 'bg-black text-white' : 'bg-white text-gray-900'} flex flex-col`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-4 py-3 border-b ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-lg transition-colors ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <Menu size={24} />
          </button>
          
          {/* Model Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
                isDarkTheme 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span className="font-medium text-sm">{selectedModel}</span>
              {isModelDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {isModelDropdownOpen && (
              <div className={`absolute top-full left-0 mt-1 rounded-lg shadow-lg z-10 min-w-48 ${
                isDarkTheme 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}>
                {models.map((model, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedModel(model);
                      setIsModelDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      selectedModel === model 
                        ? 'bg-blue-600 text-white' 
                        : isDarkTheme 
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-100'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors ${isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          {isDarkTheme ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </header>

      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className={`absolute left-0 top-0 h-full w-64 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isDarkTheme 
              ? 'bg-gray-900 border-r border-gray-800' 
              : 'bg-white border-r border-gray-200'
          }`}>
            <div className={`p-4 border-b flex-shrink-0 ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
              <button
                onClick={() => {
                  const newChatId = uuidv4();
                  const newChat = {
                    id: newChatId,
                    title: `Chat ${chats.length + 1}`,
                    lastMessage: '',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  };
                  setChats(prev => [newChat, ...prev]);
                  setActiveChatId(newChatId);
                  // Initialize with empty messages for new chat
                  setMessages([]);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  isDarkTheme 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Plus size={20} />
                <span className="font-medium">New chat</span>
              </button>
            </div>
            
            {/* Chat List */}
            <div className="flex-1 overflow-y-auto py-2 min-h-0">
              {chats.length === 0 ? (
                <div className={`px-4 py-8 text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p className="text-sm">No chats yet</p>
                  <p className="text-xs mt-1">Create a new chat to get started</p>
                </div>
              ) : (
                <div className="px-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      className="relative group mb-1"
                    >
                      <button
                        onClick={() => {
                          setActiveChatId(chat.id);
                          // Load messages from localStorage for this chat
                          const loadedMessages = loadMessagesFromStorage(chat.id);
                          setMessages(loadedMessages);
                          setIsMenuOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          activeChatId === chat.id
                            ? isDarkTheme
                              ? 'bg-gray-800'
                              : 'bg-gray-200'
                            : isDarkTheme
                              ? 'hover:bg-gray-800'
                              : 'hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1 pr-5">
                          <span className={`font-medium text-sm truncate ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            {chat.title}
                          </span>
                          {chat.timestamp && (
                            <span className={`text-xs ml-2 flex-shrink-0 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                              {chat.timestamp}
                            </span>
                          )}
                        </div>
                        {chat.lastMessage && (
                          <p className={`text-xs truncate ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                            {chat.lastMessage}
                          </p>
                        )}
                      </button>
                      <button
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                        className={`absolute top-1 right-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                          isDarkTheme
                            ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-300 text-gray-500 hover:text-gray-900'
                        }`}
                        title="Delete chat"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className={`p-4 border-t flex-shrink-0 ${isDarkTheme ? 'border-gray-800' : 'border-gray-200'}`}>
              <button
                onClick={() => {
                  setIsAccountPageOpen(true);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-2 py-2 rounded-lg transition-colors ${
                  isDarkTheme ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium">User Name</p>
                  <p className="text-sm text-gray-400">Premium</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-auto px-4"
        >
          {/* Welcome Header - only show when no active chat */}
          {!activeChatId && messages.length === 0 && (
            <div className="flex items-center justify-center pt-8 pb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <img src={logo} alt="Logo" className="w-11 h-11 object-contain" />
                </div>
                <div className="text-center">
                  <h1 className="text-xl font-bold">Good evening</h1>
                  <p className="text-lg">User Name</p>
                </div>
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="w-full max-w-3xl mx-auto space-y-4 pb-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : isDarkTheme 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs opacity-70">{message.timestamp}</p>
                    {message.sender === 'assistant' && message.model && (
                      <p className="text-xs opacity-70">{message.model}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>

      {/* Quick Actions */}
      <div className={`px-4 py-2 border-t ${isDarkTheme ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="quick-actions-container">
          <div className="quick-actions-scroll">
            {/* Duplicate actions for seamless loop */}
            {[...quickActions, ...quickActions].map((action, index) => (
              <button 
                key={index}
                className={`flex items-center space-x-2 rounded-full px-4 py-2 text-sm transition-colors whitespace-nowrap mr-3 ${
                  isDarkTheme 
                    ? 'bg-gray-800 hover:bg-gray-700' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span>{action.icon}</span>
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className={`border-t p-4 ${isDarkTheme ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-gray-50'}`}>
        {/* Desktop Layout */}
        <div className="hidden md:flex items-end space-x-2">
          <button className={`p-2 rounded-full transition-colors ${
            isDarkTheme 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            <Plus size={20} />
          </button>
          
          <button className={`p-2 rounded-full transition-colors ${
            isDarkTheme 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            <Globe size={20} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="How can I help you today?"
              className={`w-full rounded-full px-4 py-3 resize-none focus:outline-none ${
                isDarkTheme 
                  ? 'bg-gray-800 text-white placeholder-gray-400' 
                  : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-300'
              }`}
              rows="1"
              style={{ minHeight: '48px' }}
            />
          </div>
          
          <button className={`p-2 rounded-full transition-colors ${
            isDarkTheme 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}>
            <Mic size={20} />
          </button>
          
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-2 rounded-full transition-colors ${
              inputText.trim() 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : isDarkTheme 
                  ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Input row with Send button */}
          <div className="flex items-end space-x-2 mb-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help you today?"
                className={`w-full rounded-full px-4 py-3 resize-none focus:outline-none ${
                  isDarkTheme 
                    ? 'bg-gray-800 text-white placeholder-gray-400' 
                    : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-300'
                }`}
                rows="1"
                style={{ minHeight: '48px' }}
              />
            </div>
            
            <button 
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`p-2 rounded-full transition-colors ${
                inputText.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : isDarkTheme 
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>

          {/* Bottom row with Plus, Globe, and Mic */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button className={`p-2 rounded-full transition-colors ${
                isDarkTheme 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}>
                <Plus size={20} />
              </button>
              
              <button className={`p-2 rounded-full transition-colors ${
                isDarkTheme 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}>
                <Globe size={20} />
              </button>
            </div>
            
            <button className={`p-2 rounded-full transition-colors ${
              isDarkTheme 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}>
              <Mic size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
