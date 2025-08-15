'use client';

import { useState, useRef, useEffect } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import MarkdownRenderer from './MarkdownRenderer';
import { queryKnowledgeBase, initKnowledgeBase } from '@/lib/utils/knowledge-base';
import { Button } from '@/components/ui/button';
import { HomeIcon, MessageSquare, HelpCircle, Search, ChevronRight, Check, Sparkles, Clock, BookOpen } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

type ActiveTab = 'home' | 'messages' | 'help';

interface HelpArticle {
  id: number;
  title: string;
  content: string;
  category: string;
}

interface HelpCollection {
  id: number;
  title: string;
  articleCount: number;
  articles: HelpArticle[];
}

export default function ClaudeStyleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKnowledgeBaseReady, setIsKnowledgeBaseReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [clickedQuickReply, setClickedQuickReply] = useState<string | null>(null);
  const [collections, setCollections] = useState<HelpCollection[]>([
    { 
      id: 1, 
      title: 'Pension Schemes', 
      articleCount: 3,
      articles: [
        { 
          id: 101, 
          title: 'Understanding Tier 2 Pension', 
          content: 'Tier 2 is a mandatory occupational pension scheme managed by approved Trustees. It provides lump sum benefits upon retirement and is funded by 5% of your salary, contributed by your employer.', 
          category: 'Pension Schemes' 
        },
        { 
          id: 102, 
          title: 'Personal Pension Plans', 
          content: 'Personal pension plans (Tier 3) allow you to make additional voluntary contributions toward your retirement. These plans offer tax benefits and flexibility in contribution amounts.', 
          category: 'Pension Schemes' 
        },
        { 
          id: 103, 
          title: 'Provident Fund Scheme', 
          content: 'The Provident Fund Scheme is a voluntary savings program that helps you build additional retirement funds. Contributions are flexible and can be adjusted based on your financial situation.', 
          category: 'Pension Schemes' 
        }
      ]
    },
    { 
      id: 2, 
      title: 'Enrollment Process', 
      articleCount: 2,
      articles: [
        { 
          id: 201, 
          title: 'How to Enroll as an Individual', 
          content: 'To enroll as an individual, complete the Personal Pension Enrollment Form available in our Self-Service Center. Submit the form with your ID and proof of income to start your pension journey.', 
          category: 'Enrollment Process' 
        },
        { 
          id: 202, 
          title: 'Employer Enrollment Guide', 
          content: 'Employers can enroll their staff by submitting the Employer Enrollment Form along with employee details. Our team will set up the accounts and provide access credentials for all employees.', 
          category: 'Enrollment Process' 
        }
      ]
    },
    { 
      id: 3, 
      title: 'Benefit Claims', 
      articleCount: 3,
      articles: [
        { 
          id: 301, 
          title: 'Retirement Benefit Claims', 
          content: 'Upon reaching retirement age, you can claim your benefits by submitting the Retirement Benefit Claim Form with supporting documents including proof of age and employment history.', 
          category: 'Benefit Claims' 
        },
        { 
          id: 302, 
          title: 'Beneficiary Claims Process', 
          content: 'Beneficiaries can claim benefits by submitting the Beneficiary Claim Form along with the death certificate and proof of relationship to the deceased member.', 
          category: 'Benefit Claims' 
        },
        { 
          id: 303, 
          title: 'Early Withdrawal Conditions', 
          content: 'Early withdrawals are permitted under specific conditions such as critical illness or permanent disability. Documentation from medical professionals is required for such claims.', 
          category: 'Benefit Claims' 
        }
      ]
    },
    { 
      id: 4, 
      title: 'Personal Pension', 
      articleCount: 2,
      articles: [
        { 
          id: 401, 
          title: 'Tax Benefits of Personal Pension', 
          content: 'Personal pension contributions qualify for tax relief up to 16.5% of your income. This can significantly reduce your annual tax burden while building your retirement savings.', 
          category: 'Personal Pension' 
        },
        { 
          id: 402, 
          title: 'Investment Options', 
          content: 'Our personal pension plans offer various investment options ranging from conservative to aggressive growth strategies. You can choose based on your risk tolerance and retirement timeline.', 
          category: 'Personal Pension' 
        }
      ]
    },
    { 
      id: 5, 
      title: 'FAQ', 
      articleCount: 4,
      articles: [
        { 
          id: 501, 
          title: 'How do I claim my Tier 2 benefits?', 
          content: 'To claim your Tier 2 benefits, download and complete the Tier 2 Benefit Claim Form from our Self-Service Centre. Submit the form along with required documents including proof of retirement age and employment history.', 
          category: 'FAQ' 
        },
        { 
          id: 502, 
          title: 'Can I contribute to both Tier 2 and Tier 3?', 
          content: 'Yes, you can contribute to both Tier 2 and Tier 3 schemes simultaneously. Tier 2 is mandatory through your employer, while Tier 3 offers additional voluntary contributions.', 
          category: 'FAQ' 
        },
        { 
          id: 503, 
          title: 'How do I check my pension balance online?', 
          content: 'Log in to the Member Portal using your PAN and password. Your current balance and contribution history will be displayed on your dashboard.', 
          category: 'FAQ' 
        },
        { 
          id: 504, 
          title: 'Who qualifies for the Account Booster program?', 
          content: 'The Account Booster program is available to all Tier 3 contributors who maintain regular monthly contributions for at least 6 months.', 
          category: 'FAQ' 
        }
      ]
    },
  ]);
  const [showChatView, setShowChatView] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<HelpCollection | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);
  const [searchResults, setSearchResults] = useState<HelpArticle[]>([]);
  const [lastMessage, setLastMessage] = useState<string>('No recent messages');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLDivElement>(null);

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

  // Mobile keyboard handling
  useEffect(() => {
    const handleResize = () => {
      // Small delay to ensure keyboard is fully shown/hidden
      setTimeout(() => {
        if (textareaRef.current && document.activeElement === textareaRef.current) {
          textareaRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 150);
    };

    const handleFocus = () => {
      // Scroll input into view when focused
      setTimeout(() => {
        if (chatInputRef.current) {
          chatInputRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end' 
          });
        }
      }, 300);
    };

    const handleBlur = () => {
      // Scroll back to bottom when input loses focus
      setTimeout(() => {
        scrollToBottom();
      }, 150);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    
    if (textareaRef.current) {
      textareaRef.current.addEventListener('focus', handleFocus);
      textareaRef.current.addEventListener('blur', handleBlur);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (textareaRef.current) {
        textareaRef.current.removeEventListener('focus', handleFocus);
        textareaRef.current.removeEventListener('blur', handleBlur);
      }
    };
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
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamedResponse('');
    
    // Add a temporary "thinking" message
    setMessages(prev => [
      ...prev, 
      { 
        role: 'assistant', 
        content: 'Searching for information...' 
      }
    ]);

    try {
      // Get relevant context from knowledge base
      setIsSearching(true);
      const relevantInfo = isKnowledgeBaseReady 
        ? await queryKnowledgeBase(input, 3)
        : [];
      setIsSearching(false);
      
      // Remove the temporary thinking message
      setMessages(prev => prev.slice(0, prev.length - 1));
      
      // Construct context message if we have relevant info
      let contextMessages: Message[] = [];
      if (relevantInfo.length > 0) {
        // Get the base URL safely (works in both browser and server environments)
        const baseUrl = typeof window !== 'undefined' 
          ? window.location.origin 
          : 'https://standardpensiontrust.com';
          
        const contextContent = `
Here is relevant information from the SPT Pension Trust website:

${relevantInfo.map(item => `[PAGE: ${item.route}](${baseUrl}${item.route})
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
        setMessages(prev => [...prev, { role: 'assistant', content: fullResponse }]);
      }
      
      setStreamedResponse('');
    } catch (error) {
      console.error('Error in chat request:', error);
      setMessages(prev => [
        ...prev.filter(msg => msg.content !== 'Searching for information...'),
        { role: 'assistant', content: 'Sorry, I encountered an error while processing your request. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
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
    collections.forEach(collection => {
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
    collections.forEach(collection => {
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

  const generateQuickReplies = (messageContent: string) => {
    const replies: string[] = [];
    const lowerCaseContent = messageContent.toLowerCase();

    // Smart context-based replies
    if (lowerCaseContent.includes('pension')) {
      replies.push('What are my pension options?');
      replies.push('How do I calculate my pension?');
      replies.push('What are the benefits of a pension?');
    }
    if (lowerCaseContent.includes('enrollment')) {
      replies.push('How do I enroll in a pension scheme?');
      replies.push('What documents do I need for enrollment?');
      replies.push('Can I change my pension provider?');
    }
    if (lowerCaseContent.includes('claim')) {
      replies.push('How do I make a pension claim?');
      replies.push('What are the requirements for a pension claim?');
      replies.push('How long does it take to process a pension claim?');
    }
    if (lowerCaseContent.includes('tax')) {
      replies.push('How are pension contributions taxed?');
      replies.push('What are the tax benefits of a pension?');
      replies.push('How do I claim tax relief on my pension?');
    }
    if (lowerCaseContent.includes('investment')) {
      replies.push('What are the investment options for my pension?');
      replies.push('How do I choose an investment strategy?');
      replies.push('What are the risks associated with pension investments?');
    }
    if (lowerCaseContent.includes('withdrawal')) {
      replies.push('Can I withdraw my pension early?');
      replies.push('What are the conditions for early withdrawal?');
      replies.push('How much can I withdraw from my pension?');
    }
    if (lowerCaseContent.includes('benefits')) {
      replies.push('What are the benefits of a pension?');
      replies.push('How do I maximize my pension benefits?');
      replies.push('What are the different types of pension benefits?');
    }
    if (lowerCaseContent.includes('faq')) {
      replies.push('Can you explain the FAQ?');
      replies.push('What are the most common questions?');
      replies.push('How do I find specific answers?');
    }
    if (lowerCaseContent.includes('help')) {
      replies.push('How can I get more help?');
      replies.push('What are the office hours?');
      replies.push('How do I contact customer support?');
    }

    // If no specific context found, provide general helpful suggestions
    if (replies.length === 0) {
      replies.push('Tell me more about pension schemes');
      replies.push('How do I get started?');
      replies.push('What are the next steps?');
      replies.push('Can you explain this in simpler terms?');
    }

    // Limit to 4 replies to avoid overwhelming the user
    return replies.slice(0, 4);
  };

  return (
    <div className="flex flex-col w-[600px] h-[600px] bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Modern Header with Gradient */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">SPT Assistant</h2>
            <p className="text-white/80 text-sm">Your Pension Planning Partner</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeTab === 'home' && (
          <div className="flex-1 overflow-y-auto p-6">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-2xl mb-4">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <h2 className="font-bold text-2xl text-gray-800 mb-2">How can we help?</h2>
                <p className="text-gray-600">Get expert guidance on your pension journey</p>
              </div>
            </div>
            
            {/* Recent Message Card */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                   onClick={() => {
                     setActiveTab('messages');
                     setShowChatView(true);
                   }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Recent Conversation</p>
                      <p className="text-blue-700 text-sm">
                        {messages.length > 0 ? lastMessage : "Start your first chat"}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>
            
            {/* Quick Action Cards */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div 
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer text-center"
                onClick={() => setActiveTab('messages')}
              >
                <MessageSquare className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-green-800">Start Chat</p>
              </div>
              <div 
                className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer text-center"
                onClick={() => setActiveTab('help')}
              >
                <HelpCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-purple-800">Help Center</p>
              </div>
            </div>
            
            {/* Office Hours Card */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-orange-800">Office Hours</h4>
                  <p className="text-orange-700 text-sm">Mon - Fri: 8:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="flex-1 flex flex-col">
            {messages.length === 0 && !showChatView ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="text-center max-w-sm">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">Ready to Chat?</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Start a conversation with SPT Assistant to get personalized help with your pension questions.
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={startNewChat}>
                    Start Chatting <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Messages Container */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-auto p-4 space-y-4"
                >
                  {/* Welcome Message with Quick Actions */}
                  {messages.length === 0 && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                            <p className="text-gray-800 mb-3 font-medium">👋 Hello! I'm here to help with your pension questions.</p>
                            <p className="text-gray-600 mb-4 text-sm">Here are some topics we can discuss:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {['Pension Plans', 'Enrollment', 'Benefits', 'Tax Info'].map((topic, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setInput(`Tell me about ${topic.toLowerCase()}`);
                                    setClickedQuickReply(topic);
                                    if (textareaRef.current) {
                                      textareaRef.current.focus();
                                    }
                                    setTimeout(() => setClickedQuickReply(null), 1000);
                                  }}
                                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                    clickedQuickReply === topic 
                                      ? 'bg-primary text-white shadow-lg scale-105' 
                                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                  }`}
                                >
                                  {topic}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Display Messages */}
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shrink-0">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg'
                            : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200'
                        } ${message.content === 'Searching for information...' ? 'animate-pulse' : ''}`}
                      >
                        {message.role === 'assistant' ? (
                          <div className="whitespace-normal">
                            <MarkdownRenderer 
                              content={message.content} 
                              className="text-sm leading-relaxed" 
                            />
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Streaming Response */}
                  {streamedResponse && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                            <div className="whitespace-normal">
                              <MarkdownRenderer 
                                content={streamedResponse} 
                                className="text-sm leading-relaxed" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Quick Reply Suggestions */}
                  {messages.length > 0 && messages[messages.length - 1]?.role === 'assistant' && !isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                            <div className="text-gray-600 mb-3 font-medium text-sm">💡 Quick replies:</div>
                            <div className="flex flex-wrap gap-2">
                              {generateQuickReplies(messages[messages.length - 1]?.content).map((reply, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    setInput(reply);
                                    setClickedQuickReply(reply);
                                    if (textareaRef.current) {
                                      textareaRef.current.focus();
                                    }
                                    setTimeout(() => setClickedQuickReply(null), 1000);
                                  }}
                                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                                    clickedQuickReply === reply 
                                      ? 'bg-primary text-white shadow-lg scale-105' 
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {reply}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Loading State */}
                  {isLoading && !streamedResponse && !isSearching && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shrink-0">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4 border border-gray-200">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} className="h-px" />
                </div>

                {/* Modern Chat Input */}
                <div className="border-t border-gray-200 bg-white p-4">
                  <form onSubmit={handleSubmit} className="flex items-end gap-3">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all duration-200">
                      <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full p-3 bg-transparent focus:outline-none resize-none min-h-[50px] max-h-[120px] text-gray-800 placeholder-gray-500"
                        rows={2}
                        onFocus={() => {
                          if (window.innerWidth <= 768) {
                            setTimeout(() => {
                              if (textareaRef.current) {
                                textareaRef.current.scrollIntoView({ 
                                  behavior: 'smooth', 
                                  block: 'end'
                                });
                              }
                            }, 100);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                          }
                        }}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      size="icon" 
                      className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={isLoading || !input.trim()}>
                      <PaperPlaneIcon className="h-5 w-5 text-white" />
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2 ml-1">Press Enter to send</p>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'help' && (
          <div className="flex-1 overflow-y-auto">
            {/* Modern Search Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search help articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-800 placeholder-gray-500"
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
            
            {/* Collections View */}
            {!selectedCollection && searchResults.length === 0 && (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-800">{collections.length} Help Collections</h3>
                </div>
                
                <div className="space-y-3">
                  {collections.map(collection => (
                    <div 
                      key={collection.id} 
                      className="bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md active:shadow-sm transition-all duration-200 p-4"
                      onClick={() => handleSelectCollection(collection)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{collection.title}</h4>
                          <p className="text-gray-600 text-sm">{collection.articleCount} articles available</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search Results */}
            {searchResults.length > 0 && !selectedArticle && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2 text-sm text-gray-600 hover:text-gray-800"
                    onClick={handleBackToCollections}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back to Collections
                  </Button>
                  <h3 className="text-sm font-medium text-gray-600">
                    {searchResults.length} search results
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {searchResults.map(article => (
                    <div 
                      key={article.id} 
                      className="bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md active:shadow-sm transition-all duration-200 p-4"
                      onClick={() => handleSelectArticle(article)}
                    >
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-800 mb-1">{article.title}</h4>
                        <p className="text-gray-600 text-sm">{article.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Articles View */}
            {selectedCollection && !selectedArticle && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2 text-sm text-gray-600 hover:text-gray-800"
                    onClick={handleBackToCollections}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back to Collections
                  </Button>
                  <h3 className="text-sm font-medium text-gray-600">
                    {selectedCollection.title} ({selectedCollection.articles.length} articles)
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {selectedCollection.articles.map(article => (
                    <div 
                      key={article.id} 
                      className="bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md active:shadow-sm transition-all duration-200 p-4"
                      onClick={() => handleSelectArticle(article)}
                    >
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-800 mb-1">{article.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Article Detail View */}
            {selectedArticle && (
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-2 text-sm text-gray-600 hover:text-gray-800"
                    onClick={handleBackToArticles}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back to Articles
                  </Button>
                  <h3 className="text-sm font-medium text-gray-600">
                    {selectedArticle.category}
                  </h3>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <h2 className="text-lg font-bold text-gray-800 mb-3">{selectedArticle.title}</h2>
                  <p className="mb-4 text-gray-700 leading-relaxed">{selectedArticle.content}</p>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => handleUseArticleInChat(selectedArticle)}
                  >
                    Ask more about this topic
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold mb-3 text-gray-800">Was this helpful?</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="text-sm rounded-lg">👍 Yes</Button>
                    <Button variant="outline" size="sm" className="text-sm rounded-lg">👎 No</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modern Footer Navigation */}
      <div className="bg-white border-t border-gray-200 flex shrink-0">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 ${
            activeTab === 'home' 
              ? 'text-primary bg-primary/5' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <HomeIcon className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 ${
            activeTab === 'messages' 
              ? 'text-primary bg-primary/5' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Chat</span>
        </button>
        <button
          onClick={() => setActiveTab('help')}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 ${
            activeTab === 'help' 
              ? 'text-primary bg-primary/5' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          <HelpCircle className="h-5 w-5 mb-1" />
          <span className="text-xs font-medium">Help</span>
        </button>
      </div>
    </div>
  );
}

