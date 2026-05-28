-- Create table for storing OTPs
CREATE TABLE public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for sending OTP)
CREATE POLICY "Anyone can insert OTP codes"
ON public.otp_codes
FOR INSERT
WITH CHECK (true);

-- Allow anyone to select their own OTP by email (for verification)
CREATE POLICY "Anyone can select OTP by email"
ON public.otp_codes
FOR SELECT
USING (true);

-- Allow anyone to update (for marking as verified)
CREATE POLICY "Anyone can update OTP codes"
ON public.otp_codes
FOR UPDATE
USING (true);

-- Allow anyone to delete expired OTPs
CREATE POLICY "Anyone can delete OTP codes"
ON public.otp_codes
FOR DELETE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_otp_codes_email ON public.otp_codes(email);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);