// api/clients.js - Gestion des clients et mensurations
const db = require('./_db');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const clients = db.getClients();
      return res.status(200).json({ success: true, count: clients.length, clients });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { id, name, phone, gender, measures } = body;

      if (!name || !phone) {
        return res.status(400).json({ success: false, error: "Nom et téléphone requis." });
      }

      if (id) {
        const updated = db.updateClient(id, { name: name.trim(), phone: phone.trim(), gender, measures });
        if (updated) return res.status(200).json({ success: true, client: updated });
      }

      const clients = db.getClients();
      const newClient = {
        id: "CLI-" + (clients.length + 1),
        name: name.trim(),
        phone: phone.trim(),
        gender: gender || "Femme",
        measures: measures || {},
        createdAt: new Date().toISOString()
      };

      db.addClient(newClient);
      return res.status(201).json({ success: true, client: newClient });
    }

    return res.status(405).json({ success: false, error: "Méthode non autorisée" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
