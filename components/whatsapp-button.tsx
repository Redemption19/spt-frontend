"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import SPTChatbot from "@/app/components/SPTChatbot"

export function WhatsAppButton() {
  const [showChatBot, setShowChatBot] = useState(false)
  
  const handleCloseChatBot = () => {
    setShowChatBot(false)
  }

  return (
    <>
      {/* Only show WhatsApp Button when chatbot is not open */}
      {!showChatBot && (
        <Button
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg z-50 bg-accent hover:bg-accent/90 p-0 flex items-center justify-center"
          onClick={() => setShowChatBot(true)}
          aria-label="Open SPT Assistant"
        >
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-accent-foreground" />
        </Button>
      )}

      {showChatBot && (
        <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
          <SPTChatbot onClose={handleCloseChatBot} />
        </div>
      )}
    </>
  )
}
