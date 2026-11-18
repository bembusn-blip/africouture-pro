// api/health.js - Diagnostic complet de l'état du backend et de la base de données
const db = require('./_db');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const orders = db.getOrders();
  const clients = db.getClients();

  return res.status(200).json({
    status: "ok",
    service: "AfriCouture Pro API",
    version: "1.0.0",
    environment: db.ENV,
    cloud: "Vercel Serverless",
    database: {
      status: "connected",
      records: {
        ordersCount: orders.length,
        clientsCount: clients.length
      }
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};
