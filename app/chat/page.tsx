import { Metadata } from 'next';
import SPTChatbot from '@/app/components/SPTChatbot';

export const metadata: Metadata = {
  title: 'Chat with SPT Assistant',
  description: 'Get instant answers to your pension-related questions',
};

export default function ChatPage() {
  return (
    <div className="bg-background p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Chat with SPT Assistant
          </h1>
          <p className="text-xs sm:text-sm lg:text-lg text-muted-foreground">
            Ask me anything about pensions, benefits, or our services
          </p>
        </div>
        
        {/* Chat Container - Let chatbot control its own size */}
        <div className="flex justify-center">
                      <SPTChatbot />
        </div>
      </div>
    </div>
  );
}