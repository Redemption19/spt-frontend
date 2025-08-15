import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { eventsApi } from '@/lib/api/services';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface EventRegistrationFormProps {
  eventSlug: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  special_requirements: string;
}

const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({ eventSlug }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    special_requirements: '',
  });
  
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      setErrorMessage('Please agree to the Terms and Conditions to proceed.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await eventsApi.registerForEvent(eventSlug, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        organization: formData.organization || undefined,
        position: formData.position || undefined,
        special_requirements: formData.special_requirements || undefined,
      });

      if (response.data.status === 'success') {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          position: '',
          special_requirements: '',
        });
        setAgreeToTerms(false);
        setSubscribeToUpdates(false);
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(
        error.response?.data?.message || 
        error.message || 
        'Failed to register for the event. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="mt-8 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <div className="text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-100 mb-2">
              Registration Successful!
            </h3>
            <p className="text-green-700 dark:text-green-200 mb-4">
              Thank you for registering for this event. You will receive a confirmation email shortly with all the event details.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setSubmitStatus('idle')}
              className="border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-950"
            >
              Register Another Person
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader className="border-b bg-muted/50">
        <CardTitle className="text-2xl">Register for this Event</CardTitle>
        <p className="text-muted-foreground">
          Fill out the form below to secure your spot at this event.
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {submitStatus === 'error' && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  placeholder="Enter your full name"
                  className="mt-1.5"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="mt-1.5"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter your phone number"
                className="mt-1.5"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organization">Organization</Label>
                <Input
                  type="text"
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Enter your organization"
                  className="mt-1.5"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="position">Position/Title</Label>
                <Input
                  type="text"
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="Enter your position or title"
                  className="mt-1.5"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Additional Information</h3>
            <div>
              <Label htmlFor="special_requirements">
                Special Requirements or Dietary Restrictions
              </Label>
              <Textarea
                id="special_requirements"
                value={formData.special_requirements}
                onChange={(e) => handleInputChange('special_requirements', e.target.value)}
                placeholder="Please let us know if you have any special requirements, dietary restrictions, or accessibility needs"
                className="mt-1.5 min-h-[100px]"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Consent and Terms */}
          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="updates"
                checked={subscribeToUpdates}
                onCheckedChange={(checked) => setSubscribeToUpdates(!!checked)}
                disabled={isSubmitting}
              />
              <Label
                htmlFor="updates"
                className="text-sm text-muted-foreground leading-5"
              >
                Send me event reminders and updates about future events via email
              </Label>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                required
                disabled={isSubmitting}
              />
              <Label
                htmlFor="terms"
                className="text-sm text-muted-foreground leading-5"
              >
                I agree to SPT's{' '}
                <a href="/terms" className="text-primary hover:underline" target="_blank">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:underline" target="_blank">
                  Privacy Policy
                </a>{' '}
                <span className="text-red-500">*</span>
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting || !agreeToTerms}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register for Event'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventRegistrationForm; 