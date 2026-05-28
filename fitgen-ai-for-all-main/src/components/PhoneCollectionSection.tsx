import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const PhoneCollectionSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    // Limit to 10 digits
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (phoneNumber.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://dfc.app.n8n.cloud/webhook/jj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: `+91${phoneNumber}` }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setIsSubmitted(true);
      toast.success('Thank you! Our physio expert is calling you now.');
    } catch (error) {
      console.error('Error dispatching physio call:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Content Card */}
          <div className="bg-card/80 backdrop-blur-md rounded-2xl p-8 sm:p-12 border border-border shadow-xl">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                <Phone className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-foreground mb-4">
              Recover Faster with Expert Physiotherapy
            </h2>

            {/* Subheading */}
            <p className="text-muted-foreground text-center text-base sm:text-lg mb-8 max-w-lg mx-auto">
              Enter your number to get a free assessment call from our physio expert.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Input */}
                <div className="relative">
                  <label htmlFor="phone" className="sr-only">
                    Enter your Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      placeholder="Enter your Mobile Number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="pl-14 pr-4 h-14 text-lg bg-input border-border focus:border-primary focus:ring-primary/20 rounded-xl transition-all"
                      aria-label="Mobile phone number"
                      autoComplete="tel"
                    />
                  </div>
                  {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {10 - phoneNumber.length} more digits needed
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={phoneNumber.length < 10 || isSubmitting}
                  className="w-full h-14 text-lg font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all disabled:opacity-50 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Get Free Assessment
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>100% Secure</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>No spam, ever</span>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  Our physiotherapy expert will call you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setPhoneNumber('');
                  }}
                  className="mt-4"
                >
                  Submit Another Number
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
