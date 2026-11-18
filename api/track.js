// api/track.js - Endpoint public de suivi de commande en direct pour les clients
const db = require('./_db');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const query = (req.query.q || '').trim().toLowerCase();
  if (!query) {
    return res.status(400).json({ success: false, error: "Veuillez saisir un code reçu ou un numéro de téléphone." });
  }

  const orders = db.getOrders();
  const order = orders.find(o => 
    o.id.toLowerCase() === query || 
    o.phone.replace(/[^0-9]/g, '').includes(query.replace(/[^0-9]/g, ''))
  );

  if (!order) {
    return res.status(404).json({ success: false, error: "Aucune confection trouvée pour cette référence." });
  }

  // Filtrer les informations sensibles pour le client public
  return res.status(200).json({
    success: true,
    order: {
      id: order.id,
      clientName: order.clientName,
      item: order.item,
      status: order.status,
      deliveryDate: order.deliveryDate,
      total: order.total,
      deposit: order.deposit,
      remaining: order.total - order.deposit
    }
  });
};
