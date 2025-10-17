import { promises as fs } from 'fs';

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

  try {
    // In production, this should be stored in a real database
    const usageFile = '/tmp/usage_log.json';
    let usageData = [];

    try {
      const data = await fs.readFile(usageFile, 'utf8');
      usageData = JSON.parse(data);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      usageData = [];
    }

    // Add usage record
    usageData.push({
      couponCode: normalizedCouponCode,
      timestamp: Math.floor(Date.now() / 1000),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    });

    // Save usage data
    await fs.writeFile(usageFile, JSON.stringify(usageData, null, 2));

    return res.json({
      success: true,
      message: 'Uso do cupom registrado com sucesso'
    });

  } catch (error) {
    console.error('Error registering coupon usage:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor'
    });
  }
}