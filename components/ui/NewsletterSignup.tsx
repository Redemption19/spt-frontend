"use client"
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useNewsletterSubscription } from '@/hooks/useApi';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface NewsletterSignupProps {
  className?: string;
}

export default function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const newsletterMutation = useNewsletterSubscription();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await newsletterMutation.mutateAsync({
        email: email.trim(),
        name: name.trim() || undefined,
      });
      
      setIsSubmitted(true);
      setEmail('');
      setName('');
    } catch (error: any) {
      // Handle API errors
      const errorMessage = error.response?.data?.message || 'Failed to subscribe. Please try again.';
      setError(errorMessage);
    }
  };

  if (isSubmitted) {
    return (
      <section className={`py-12 sm:py-16 md:py-20 bg-card rounded-lg ${className}`}>
        <div className="container-custom text-center">
          <div className="flex flex-col items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">Thank You for Subscribing!</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              You&apos;ve been successfully added to our newsletter list. Look out for our latest updates in your inbox.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setIsSubmitted(false)}
              className="text-sm sm:text-base"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 sm:py-16 md:py-20 bg-card rounded-lg ${className}`}>
      <div className="container-custom text-center">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-foreground">Subscribe to Our Newsletter</h2>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Stay updated with our latest news, articles, and insights on pension schemes and financial planning.
        </p>
        
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={newsletterMutation.isPending}
              className="dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground"
              aria-label="Email address for newsletter signup"
            />
            
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={newsletterMutation.isPending}
              className="dark:bg-background dark:text-foreground dark:placeholder:text-muted-foreground"
              aria-label="Your name (optional)"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={newsletterMutation.isPending || !email}
            className="w-full bg-rose-700 text-white hover:bg-rose-800 dark:bg-rose-800 dark:hover:bg-rose-900"
          >
            {newsletterMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe to Newsletter'
            )}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4 max-w-sm mx-auto">
          We respect your privacy. Unsubscribe at any time by clicking the link in our emails.
        </p>
      </div>
    </section>
  );
} 