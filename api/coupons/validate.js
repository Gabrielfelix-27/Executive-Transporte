import { promises as fs } from 'fs';
import path from 'path';

// Database of valid coupons (in production, this should be in a real database)
const validCoupons = {
  'CAMILA10': {
    influencerName: 'Camila Dias',
    discountPercentage: 10,
    isActive: true,
    usageCount: 0,
    maxUsage: 1000
  },
  'DAY10': {
    influencerName: 'Day Langaro',
    discountPercentage: 10,
    isActive: true,
    usageCount: 0,
    maxUsage: 1000
  },
  'DANIELA10': {
    influencerName: 'Daniela Choma',
    discountPercentage: 10,
    isActive: true,
    usageCount: 0,
    maxUsage: 1000
  }
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { couponCode } = req.body;

  if (!couponCode) {
    return res.status(400).json({ error: 'Coupon code is required' });
  }

  const normalizedCouponCode = couponCode.toUpperCase().trim();

  // Rate limiting - simple implementation
  const rateLimitFile = '/tmp/rate_limit.json';
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const currentTime = Math.floor(Date.now() / 1000);

  try {
    // Load rate limit data
    let rateLimitData = [];
    try {
      const data = await fs.readFile(rateLimitFile, 'utf8');
      rateLimitData = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      rateLimitData = [];
    }

    // Clean old entries (older than 1 hour)
    rateLimitData = rateLimitData.filter(entry => 
      (currentTime - entry.timestamp) < 3600
    );

    // Count requests from this IP in the last hour
    const requestCount = rateLimitData.filter(entry => entry.ip === clientIP).length;

    // Limit to 10 requests per hour per IP
    if (requestCount >= 10) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }

    // Add current request to rate limit
    rateLimitData.push({
      ip: clientIP,
      timestamp: currentTime
    });

    // Save rate limit data
    await fs.writeFile(rateLimitFile, JSON.stringify(rateLimitData));

  } catch (error) {
    console.error('Rate limiting error:', error);
    // Continue without rate limiting if there's an error
  }

  // Validate coupon
  if (!validCoupons[normalizedCouponCode]) {
    return res.json({
      valid: false,
      message: 'Cupom inválido ou não encontrado'
    });
  }

  const coupon = validCoupons[normalizedCouponCode];

  // Check if coupon is active
  if (!coupon.isActive) {
    return res.json({
      valid: false,
      message: 'Este cupom não está mais ativo'
    });
  }

  // Check usage limit
  if (coupon.usageCount >= coupon.maxUsage) {
    return res.json({
      valid: false,
      message: 'Este cupom atingiu o limite de uso'
    });
  }

  // Return valid coupon data (without sensitive information)
  return res.json({
    valid: true,
    message: 'Cupom válido!',
    coupon: {
      code: normalizedCouponCode,
      influencerName: coupon.influencerName,
      discountPercentage: coupon.discountPercentage
    }
  });
}