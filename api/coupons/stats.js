export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Database of valid coupons (same as validate.js)
    const validCoupons = {
      'CamilaDias10': {
        influencerName: 'Camila Dias',
        discountPercentage: 10,
        isActive: true,
        usageCount: 0,
        maxUsage: 1000
      },
      'Day10': {
        influencerName: 'Day Langaro',
        discountPercentage: 10,
        isActive: true,
        usageCount: 0,
        maxUsage: 1000
      },
      'DaniChoma10': {
        influencerName: 'Daniela Choma',
        discountPercentage: 10,
        isActive: true,
        usageCount: 0,
        maxUsage: 1000
      }
    };

    // Calculate statistics
    const stats = {
      totalCoupons: Object.keys(validCoupons).length,
      activeCoupons: Object.values(validCoupons).filter(c => c.isActive).length,
      totalUsage: Object.values(validCoupons).reduce((sum, c) => sum + c.usageCount, 0),
      totalMaxUsage: Object.values(validCoupons).reduce((sum, c) => sum + c.maxUsage, 0),
      coupons: Object.entries(validCoupons).map(([code, data]) => ({
        code,
        influencerName: data.influencerName,
        discountPercentage: data.discountPercentage,
        isActive: data.isActive,
        usageCount: data.usageCount,
        maxUsage: data.maxUsage,
        usagePercentage: Math.round((data.usageCount / data.maxUsage) * 100),
        remainingUses: data.maxUsage - data.usageCount
      }))
    };

    // Add overall usage percentage
    stats.overallUsagePercentage = Math.round((stats.totalUsage / stats.totalMaxUsage) * 100);

    return res.status(200).json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error getting coupon stats:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}