'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Minimize2, MessageCircle, User, Bot, HomeIcon, HelpCircle, Search, ChevronRight, Star, Clock, BookOpen, Coins, FileText, X } from 'lucide-react';
import { helpCollections } from '@/lib/constants';
import { initKnowledgeBase, queryKnowledgeBase, type KnowledgeItem } from '@/lib/utils/knowledge-base';
import MarkdownRenderer from './MarkdownRenderer';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
    id?: string;
    sender?: 'user' | 'assistant';
  }
  
  type ActiveTab = 'home' | 'messages' | 'help' | 'chat';
  
  interface HelpArticle {
    id: string;
    title: string;
    content: string;
    category: string;
  }
  
  interface HelpCollection {
    id: string;
    title: string;
    articleCount: number;
    articles: HelpArticle[];
  }
  
  interface SPTChatbotProps {
  onClose?: () => void;
}

export default function ClaudeStyleChat({ onClose }: SPTChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isKnowledgeBaseReady, setIsKnowledgeBaseReady] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [streamedResponse, setStreamedResponse] = useState('');
    const [activeTab, setActiveTab] = useState<ActiveTab>('home');
    // Use helpCollections from constants instead of duplicate state
    const [showChatView, setShowChatView] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState<HelpCollection | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
    const [searchResults, setSearchResults] = useState<HelpArticle[]>([]);
    const [lastMessage, setLastMessage] = useState<string>('No recent messages');
    const [isTyping, setIsTyping] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
      const [showQuestionOptions, setShowQuestionOptions] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    // Question options for quick actions
    const questionOptions: Record<string, string[]> = {
      contribution: [
        'What are your management fees and charges?',
        'How do contribution rates work for different schemes?',
        'What is the minimum contribution amount?',
        'Can I increase or decrease my contributions?',
        'Are there any penalties for late contributions?',
        'How are my contributions invested?'
      ],
      enrollment: [
        'How do I enroll as an individual member?',
        'What documents do I need for enrollment?',
        'Can my employer enroll me automatically?',
        'What is the minimum age for enrollment?',
        'How long does the enrollment process take?',
        'Can I enroll in multiple pension schemes?'
      ],
      faqs: [
        'How do I check my pension balance online?',
        'When can I withdraw my pension funds?',
        'What happens to my pension if I change jobs?',
        'How do I update my personal information?',
        'What are the tax benefits of pension contributions?',
        'How do I claim my pension benefits?'
      ]
    };
  
    // Initialize knowledge base on component mount
    useEffect(() => {
      const init = async () => {
        try {
          await initKnowledgeBase();
          setIsKnowledgeBaseReady(true);
        } catch (error) {
          console.error('Error initializing knowledge base:', error);
        }
      };
      
      init();
    }, []);
  
    // Save last message when messages are updated
    useEffect(() => {
      if (messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg.role === 'assistant') {
          // Save a preview of the last message (first 50 characters)
          setLastMessage(lastMsg.content.substring(0, 50) + (lastMsg.content.length > 50 ? '...' : ''));
        }
      }
    }, [messages]);
  
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        const container = messagesContainerRef.current;
        const scrollHeight = container.scrollHeight;
        const height = container.clientHeight;
        const maxScrollTop = scrollHeight - height;
        container.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  
        // Force browser to recalculate layout and scroll again after a small delay
        setTimeout(() => {
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }, 50);
        
        // Ensure text is visible by scrolling one more time after rendering
        setTimeout(() => {
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        }, 300);
      }
    };
  
    useEffect(() => {
      // Scroll immediately and then again after a delay to handle content rendering
      scrollToBottom();
      
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100);
      
      // Try one more time after longer delay to ensure all content is rendered
      const finalTimeoutId = setTimeout(() => {
        scrollToBottom();
      }, 500);
      
      // One last attempt for very long content
      const lastAttemptId = setTimeout(() => {
        scrollToBottom();
      }, 1000);
      
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(finalTimeoutId);
        clearTimeout(lastAttemptId);
      };
    }, [messages, streamedResponse]);
  
    // Auto-resize textarea as user types
    useEffect(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        // Reset height to auto to get the correct scrollHeight
        textarea.style.height = 'auto';
        
        // Calculate new height with minimum and maximum constraints
        const newHeight = Math.min(Math.max(textarea.scrollHeight, 40), 200);
        textarea.style.height = `${newHeight}px`;
        
        // Ensure smooth transition
        textarea.style.transition = 'height 0.2s ease-out';
      }
    }, [inputText]);
  
    const handleSubmit = async (e: React.FormEvent, messageContent?: string) => {
      e.preventDefault();
      const content = messageContent || input;
      if (!content.trim() || isLoading) return;

      const userMessage: Message = { role: 'user', content: content };
      console.log('🔵 Adding user message:', userMessage);
      setMessages(prev => {
        const newMessages = [...prev, userMessage];
        console.log('🔵 Messages after adding user:', newMessages.length, newMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
        return newMessages;
      });
      setInputText('');
      setIsLoading(true);
      setIsTyping(true);
      setIsThinking(true);
      setStreamedResponse('');
      
      // Reset textarea height after sending
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = '40px';
        }
      }, 100);
      
      // Add a temporary "thinking" message
      setMessages(prev => {
        const newMessages: Message[] = [
          ...prev, 
          { 
            role: 'assistant' as const, 
            content: 'Thinking...' 
          }
        ];
        console.log('🟡 Messages after adding thinking:', newMessages.length, newMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
        return newMessages;
      });
  
      try {
        // Get relevant context from knowledge base
        setIsSearching(true);
        setMessages(prev => {
          const newMessages: Message[] = [
            ...prev.slice(0, -1),
            { 
              role: 'assistant' as const, 
              content: 'Searching knowledge base...' 
            }
          ];
          console.log('🟢 Messages after searching update:', newMessages.length, newMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
          return newMessages;
        });
        
        const relevantInfo = isKnowledgeBaseReady 
          ? await queryKnowledgeBase(content, 3)
          : [];
        setIsSearching(false);
        setIsThinking(false);
        
        // Remove the temporary thinking message
        setMessages(prev => {
          const newMessages = prev.slice(0, prev.length - 1);
          console.log('🔴 Messages after removing temp message:', newMessages.length, newMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
          return newMessages;
        });
        
        // Construct context message if we have relevant info
        let contextMessages: Message[] = [];
        if (relevantInfo.length > 0) {
          // Get the base URL safely (works in both browser and server environments)
          const baseUrl = typeof window !== 'undefined' 
            ? window.location.origin 
            : 'https://standardpensiontrust.com';
            
          const contextContent = `
  Here is relevant information from the SPT Pension Trust website:
  
  ${relevantInfo.map((item: KnowledgeItem) => `[PAGE: ${item.route}](${baseUrl}${item.route})
  ${item.content}
  `).join('\n---\n')}
  
  Please use the above information to provide an accurate and specific answer. When referencing specific schemes or pages, use proper markdown links like [Page Name](${baseUrl}/path) instead of just showing the path.`;
  
          contextMessages.push({
            role: 'system',
            content: contextContent
          });
        }
  
        // Prepare message array for the API
        const messageArray = [
          ...contextMessages,
          ...messages.filter(msg => msg.role !== 'assistant' || msg.content !== 'Searching for information...'), 
          userMessage
        ];
  
        // Start streaming response
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: messageArray,
            stream: true
          }),
        });
  
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
  
        // Set up streaming response handling
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Response body is not readable');
        }
  
        // Start streaming UI
        setIsStreaming(true);
        setIsTyping(false);
        setMessages(prev => {
          const newMessages: Message[] = [
            ...prev,
            { 
              role: 'assistant' as const, 
              content: 'Generating response...' 
            }
          ];
          console.log('🟣 Messages after adding generating:', newMessages.length, newMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
          return newMessages;
        });
        
        let accumulatedResponse = '';
        let fullResponse = '';
  
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            break;
          }
          
          // Decode and process the chunk
          const chunk = new TextDecoder().decode(value);
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.substring(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || '';
                
                if (content) {
                  accumulatedResponse += content;
                  fullResponse += content;
                  setStreamedResponse(accumulatedResponse);
                  
                  // Remove the "Generating response..." message when streaming starts
                  if (accumulatedResponse.length === content.length) {
                    setMessages(prev => {
                      const filtered = prev.filter(msg => msg.content !== 'Generating response...');
                      console.log('🟠 Messages after removing generating:', filtered.length, filtered.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
                      return filtered;
                    });
                  }
                  
                  // Ensure scrolling happens as content arrives
                  setTimeout(() => {
                    scrollToBottom();
                  }, 50);
                }
              } catch (error) {
                console.error('Error parsing streaming response:', error);
              }
            }
          }
        }
  
        // Add the complete final response
        if (fullResponse) {
          setMessages(prev => {
            const filtered = prev.filter(msg => {
              // Always keep user messages
              if (msg.role === 'user') return true;
              // Remove only temporary assistant messages
              return !['Thinking...', 'Searching knowledge base...', 'Generating response...'].includes(msg.content);
            });
            const finalMessages: Message[] = [...filtered, { role: 'assistant' as const, content: fullResponse }];
            console.log('✅ Final messages:', finalMessages.length, finalMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
            return finalMessages;
          });
        }
        
        setStreamedResponse('');
      } catch (error) {
        console.error('Error in chat request:', error);
        setMessages(prev => {
          const filtered = prev.filter(msg => {
            // Always keep user messages
            if (msg.role === 'user') return true;
            // Remove only temporary assistant messages
            return !['Thinking...', 'Searching knowledge base...', 'Generating response...'].includes(msg.content);
          });
          const errorMessages: Message[] = [...filtered, { role: 'assistant' as const, content: 'Sorry, I encountered an error while processing your request. Please try again.' }];
          console.log('❌ Error messages:', errorMessages.length, errorMessages.map(m => `${m.role}: ${m.content.substring(0, 30)}...`));
          return errorMessages;
        });
      } finally {
        setIsLoading(false);
        setIsTyping(false);
        setIsThinking(false);
        setIsStreaming(false);
        setStreamedResponse('');
        
        // Ensure one final scroll after everything is done
        setTimeout(() => {
          scrollToBottom();
        }, 300);
      }
    };
  
    const startNewChat = () => {
      setMessages([]);
      setStreamedResponse('');
      setShowChatView(true);
      setActiveTab('messages');
    };
  
    const handleSearchHelpCenter = (e: React.FormEvent) => {
      e.preventDefault();
      const searchQuery = inputRef.current?.value.toLowerCase();
      console.log('Search query:', searchQuery);
      
      if (!searchQuery) {
        // If search is empty, show collections
        setSearchResults([]);
        return;
      }
      
      // Search across all articles in all collections
      const results: HelpArticle[] = [];
      helpCollections.forEach(collection => {
        collection.articles.forEach(article => {
          if (
            article.title.toLowerCase().includes(searchQuery) || 
            article.content.toLowerCase().includes(searchQuery)
          ) {
            results.push(article);
          }
        });
      });
      
      console.log('Search results:', results.length, 'matches found');
      setSearchResults(results);
      setSelectedCollection(null);
      setSelectedArticle(null);
    };
    
    // Handle input changes for auto-search
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchQuery = e.target.value.toLowerCase();
      
      // Only search if at least 2 characters are typed
      if (searchQuery.length < 2) {
        setSearchResults([]);
        return;
      }
      
      // Search across all articles in all collections
      const results: HelpArticle[] = [];
      helpCollections.forEach(collection => {
        collection.articles.forEach(article => {
          if (
            article.title.toLowerCase().includes(searchQuery) || 
            article.content.toLowerCase().includes(searchQuery)
          ) {
            results.push(article);
          }
        });
      });
      
      setSearchResults(results);
      setSelectedCollection(null);
      setSelectedArticle(null);
    };
    
    const handleSelectCollection = (collection: HelpCollection) => {
      setSelectedCollection(collection);
      setSelectedArticle(null);
      setSearchResults([]);
    };
    
    const handleSelectArticle = (article: HelpArticle) => {
      setSelectedArticle(article);
    };
    
    const handleBackToCollections = () => {
      setSelectedCollection(null);
      setSelectedArticle(null);
      setSearchResults([]);
    };
    
    const handleBackToArticles = () => {
      setSelectedArticle(null);
    };
    
    const handleUseArticleInChat = (article: HelpArticle) => {
      setActiveTab('messages');
      setShowChatView(true);
      setInput(`Tell me more about: ${article.title}`);
      // Focus on the textarea after a brief delay to ensure it's rendered
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 100);
    };
    
    const handleCollectionSelect = (collection: HelpCollection) => {
      setSelectedCollection(collection);
      setSelectedArticle(null);
      setSearchResults([]);
    };
    

    
    const handleQuickAction = (action: string) => {
      // Handle quick action buttons
      switch (action) {
        case 'contribution':
          setShowQuestionOptions('contribution');
          break;
        case 'enrollment':
          setShowQuestionOptions('enrollment');
          break;
        case 'faqs':
          setShowQuestionOptions('faqs');
          break;
        default:
          console.log('Unknown action:', action);
      }
    };
    
    const handleSendMessage = () => {
      if (inputText.trim()) {
        handleSubmit(new Event('submit') as any, inputText);
        setInputText('');
      }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
    
    const handleQuestionSelect = (question: string) => {
      // Close the modal first
      setShowQuestionOptions(null);
      
      // Switch to chat tab
      setActiveTab('chat');
      
      // Set the question as input
      setInput(question);
      
      // Automatically send the message after a brief delay to ensure UI updates
      setTimeout(() => {
        const syntheticEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        handleSubmit(syntheticEvent, question);
      }, 100);
    };
    
    const handleSearch = (query: string) => {
      setSearchQuery(query);
      handleSearchInputChange({ target: { value: query } } as React.ChangeEvent<HTMLInputElement>);
    };
    
    const handleArticleSelect = (article: HelpArticle) => {
      setSelectedArticle(article);
    };
    
    const handleBackToCollection = () => {
      setSelectedArticle(null);
    };
  
  // No minimized state needed - WhatsApp Button handles opening/closing

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 w-auto h-[500px] sm:h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 max-h-[90vh]">
      {/* Header */}
      <div className="bg-red-700 text-white p-3 sm:p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-base sm:text-lg">SPT Assistant</h3>
            <p className="text-xs sm:text-sm text-red-200">Pension Planning Partner</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-1 sm:px-2 transition-all duration-200 ${
              activeTab === 'home' 
                ? 'text-red-700 bg-white border-b-2 border-red-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HomeIcon className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-1 sm:px-2 transition-all duration-200 ${
              activeTab === 'chat' 
                ? 'text-red-700 bg-white border-b-2 border-red-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs font-medium">Chat</span>
          </button>
                      <button
            onClick={() => setActiveTab('help')}
            className={`flex-1 flex flex-col items-center justify-center py-2 sm:py-3 px-1 sm:px-2 transition-all duration-200 ${
              activeTab === 'help' 
                ? 'text-red-700 bg-white border-b-2 border-red-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
            <span className="text-xs font-medium">Help</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && (
          <div className="h-full overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50">
            {/* Welcome Section */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full mb-3 sm:mb-4 border-2 border-red-200">
                <Star className="h-6 w-6 sm:h-8 sm:w-8 text-red-700" />
              </div>
              <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">How can we help?</h2>
              <p className="text-gray-600 text-xs sm:text-sm">Get expert guidance on your pension journey</p>
            </div>
            
            {/* Quick Action Cards */}
            <div className="space-y-3">
              <div 
                className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setActiveTab('chat')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900 text-sm">Start Chat</p>
                      <p className="text-blue-700 text-xs">Get personalized help</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>
              
              <div 
                className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setActiveTab('help')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-green-500 p-1.5 sm:p-2 rounded-lg">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900 text-sm">Help Center</p>
                      <p className="text-green-700 text-xs">Browse articles & guides</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-green-500" />
                </div>
              </div>
            </div>
            
            {/* Office Hours */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-orange-800 text-sm">Office Hours</h4>
                  <p className="text-orange-700 text-xs">Mon - Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => handleQuickAction('contribution')}
                className="w-full bg-red-50 hover:bg-red-100 p-3 rounded-lg border border-red-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <Coins className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-red-800">Contribution Information</h4>
                    <p className="text-sm text-red-600">View our transparent contribution structure</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => handleQuickAction('enrollment')}
                className="w-full bg-green-50 hover:bg-green-100 p-3 rounded-lg border border-green-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-green-800">Enrollment Guide</h4>
                    <p className="text-sm text-green-600">Start your pension journey today</p>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => handleQuickAction('faqs')}
                className="w-full bg-blue-50 hover:bg-blue-100 p-3 rounded-lg border border-blue-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-blue-800">Quick FAQs</h4>
                    <p className="text-sm text-blue-600">Get instant answers to common questions</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full">
            {/* Messages - Fixed height with scroll */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 min-h-0">
              {messages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-red-600' 
                        : 'bg-red-700'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className="flex flex-col">
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-red-600 text-white rounded-br-md'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
                      }`}>
                        {message.role === 'assistant' ? (
                          <MarkdownRenderer content={message.content} className="text-sm leading-relaxed" />
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Enhanced Loading Indicators */}
              {(isTyping || isThinking || isStreaming || streamedResponse) && (
                <div className="flex justify-start">
                  <div className="flex items-end space-x-2">
                    <div className={`w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white flex-shrink-0 ${
                      isThinking || isStreaming ? 'animate-pulse' : ''
                    }`}>
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-md">
                      {streamedResponse ? (
                        <div className="text-sm leading-relaxed">
                          <MarkdownRenderer content={streamedResponse} className="text-sm leading-relaxed" />
                          <div className="inline-flex ml-1">
                            <div className="w-1 h-4 bg-red-600 animate-pulse"></div>
                          </div>
                        </div>
                      ) : isThinking ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-blue-600 font-medium">Thinking...</span>
                        </div>
                      ) : isSearching ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-green-600 font-medium">Searching...</span>
                        </div>
                      ) : isStreaming ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs text-purple-600 font-medium">Generating...</span>
                        </div>
                      ) : (
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions - Fixed at bottom */}
            <div className="px-4 py-2 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="flex space-x-2 text-xs">
                <button 
                  onClick={() => handleQuickAction('contribution')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Coins className="w-3 h-3" />
                  Contribution
                </button>
                <button 
                  onClick={() => handleQuickAction('enrollment')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  Enrollment
                </button>
                <button 
                  onClick={() => handleQuickAction('faqs')}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <HelpCircle className="w-3 h-3" />
                  FAQs
                </button>
              </div>
            </div>

            {/* Question Options Modal - Enhanced Popup */}
            {showQuestionOptions && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-sm sm:max-w-md w-full max-h-[70vh] sm:max-h-[80vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
                  {/* Modal Header */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-pink-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                        {showQuestionOptions === 'contribution' ? (
                          <span className="flex items-center gap-1 sm:gap-2">
                            <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            <span className="hidden sm:inline">Contribution Questions</span>
                            <span className="sm:hidden">Contribution</span>
                          </span>
                        ) : showQuestionOptions === 'enrollment' ? (
                          <span className="flex items-center gap-1 sm:gap-2">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            <span className="hidden sm:inline">Enrollment Questions</span>
                            <span className="sm:hidden">Enrollment</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 sm:gap-2">
                            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            <span className="hidden sm:inline">Frequently Asked Questions</span>
                            <span className="sm:hidden">FAQs</span>
                          </span>
                        )}
                      </h3>
                      <button
                        onClick={() => setShowQuestionOptions(null)}
                        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Select a question to ask our AI assistant
                    </p>
                  </div>
                  
                  {/* Modal Content */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 max-h-64 sm:max-h-96 overflow-y-auto">
                    <div className="space-y-2 sm:space-y-3">
                      {questionOptions[showQuestionOptions].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionSelect(question)}
                          className="w-full text-left p-3 sm:p-4 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg transition-all duration-200 hover:shadow-md group"
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-100 group-hover:bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-red-600 text-xs sm:text-sm font-medium">{index + 1}</span>
                            </div>
                            <span className="text-sm sm:text-base text-gray-800 group-hover:text-red-700 font-medium leading-relaxed">
                              {question}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Modal Footer */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => setShowQuestionOptions(null)}
                      className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Input - Fixed at bottom */}
            <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-lg flex-shrink-0">
              <div className="flex items-center space-x-2">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={isLoading ? "Please wait..." : "Type your message here..."}
                  rows={1}
                  disabled={isLoading}
                  className={`flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none overflow-y-auto min-h-[40px] max-h-[200px] ${
                    isLoading ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''
                  }`}
                  style={{ 
                    lineHeight: '1.5',
                    transition: 'height 0.2s ease-out'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                    isLoading 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : !inputText.trim() 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-red-700 hover:bg-red-800'
                  } text-white`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {/* Helper text for keyboard shortcuts */}
              <div className="mt-2 text-xs text-gray-500 text-center">
                Press Enter to send, Shift+Enter for new line
              </div>
            </div>
          </div>
        )}

        {activeTab === 'help' && (
          <div className="h-full flex flex-col">
            {/* Search Header */}
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-red-700 bg-white text-gray-800 placeholder-gray-500 text-sm"
                />
              </div>
            </div>
            
            {/* Help Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {/* Search Results */}
              {searchQuery && searchResults.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3">Search Results ({searchResults.length})</h3>
                  <div className="space-y-3">
                    {searchResults.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => handleArticleSelect(article)}
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md cursor-pointer transition-all"
                      >
                        <h4 className="font-medium text-gray-800 mb-1">{article.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{article.category}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{article.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Search Results */}
              {searchQuery && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-medium text-gray-600 mb-2">No articles found</h3>
                  <p className="text-sm text-gray-500">Try different keywords or browse our categories below</p>
                </div>
              )}

              {/* Article View */}
              {selectedArticle && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={handleBackToCollection}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      ← Back to {selectedArticle.category}
                    </button>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">{selectedArticle.title}</h2>
                    <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                      {selectedArticle.category}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{selectedArticle.content}</p>
                  </div>
                </div>
              )}

              {/* Collection View */}
              {selectedCollection && !selectedArticle && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <button
                      onClick={handleBackToCollections}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      ← Back to Categories
                    </button>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedCollection.title}</h2>
                  <div className="space-y-3">
                    {selectedCollection.articles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => handleArticleSelect(article)}
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md cursor-pointer transition-all"
                      >
                        <h4 className="font-medium text-gray-800 mb-2">{article.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{article.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories View (Default) */}
              {!selectedCollection && !selectedArticle && !searchQuery && (
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <div className="bg-gradient-to-br from-red-100 to-pink-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 border-4 border-red-200 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">Help Center</h3>
                    <p className="text-gray-600 text-sm">Browse our comprehensive help articles and guides</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {helpCollections.map((collection) => (
                      <div
                        key={collection.id}
                        onClick={() => handleCollectionSelect(collection)}
                        className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md cursor-pointer transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">{collection.title}</h4>
                              <p className="text-sm text-gray-500">{collection.articleCount} articles</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
