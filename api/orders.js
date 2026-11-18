// api/orders.js - Gestion des commandes (CRUD complet)
const db = require('./_db');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // GET : Lister les commandes
    if (req.method === 'GET') {
      const orders = db.getOrders();
      return res.status(200).json({ success: true, count: orders.length, orders });
    }

    // POST : Créer une nouvelle commande
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { clientName, phone, item, category, total, deposit, deliveryDate, measures } = body;

      if (!clientName || !phone || !item) {
        return res.status(400).json({ success: false, error: "Nom, téléphone et vêtement sont requis." });
      }

      const existingOrders = db.getOrders();
      const newId = "CMD-" + (1000 + existingOrders.length + 1);

      const newOrder = {
        id: newId,
        clientName: clientName.trim(),
        phone: phone.trim(),
        item: item.trim(),
        category: category || "autre",
        total: Number(total) || 0,
        deposit: Number(deposit) || 0,
        deliveryDate: deliveryDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        status: "recu",
        createdAt: new Date().toISOString()
      };

      db.addOrder(newOrder);

      // Créer automatiquement le client s'il n'existe pas encore
      const clients = db.getClients();
      if (!clients.find(c => c.phone === phone.trim())) {
        db.addClient({
          id: "CLI-" + (clients.length + 1),
          name: clientName.trim(),
          phone: phone.trim(),
          gender: "Femme",
          measures: measures || {},
          createdAt: new Date().toISOString()
        });
      }

      return res.status(201).json({ success: true, order: newOrder });
    }

    // PATCH : Mettre à jour le statut ou les informations
    if (req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { id, status, deposit, total } = body;

      if (!id) {
        return res.status(400).json({ success: false, error: "Identifiant de commande (id) requis." });
      }

      const updates = {};
      if (status) updates.status = status;
      if (deposit !== undefined) updates.deposit = Number(deposit);
      if (total !== undefined) updates.total = Number(total);

      const updated = db.updateOrder(id, updates);
      if (!updated) {
        return res.status(404).json({ success: false, error: "Commande non trouvée." });
      }

      return res.status(200).json({ success: true, order: updated });
    }

    // DELETE : Supprimer une commande
    if (req.method === 'DELETE') {
      const { id } = req.query || {};
      if (!id) {
        return res.status(400).json({ success: false, error: "Paramètre id manquant." });
      }
      const deleted = db.deleteOrder(id);
      return res.status(200).json({ success: deleted });
    }

    return res.status(405).json({ success: false, error: "Méthode non autorisée" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
