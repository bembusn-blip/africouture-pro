// api/_db.js - Moteur de persistance cloud avec séparation Staging / Production
const fs = require('fs');
const path = require('path');

// Données initiales réalistes pour la Côte d'Ivoire
const SEED_CLIENTS = [
  { id: "CLI-1", name: "Mme Awa Traoré", phone: "0708091011", gender: "Femme", measures: { epaule: 39, poitrine: 94, taille: 76, bassin: 104, manche: 58, pantalon: 106 }, createdAt: new Date().toISOString() },
  { id: "CLI-2", name: "M. Kouamé Jean", phone: "0504030201", gender: "Homme", measures: { epaule: 47, poitrine: 108, taille: 92, bassin: 102, manche: 64, pantalon: 110 }, createdAt: new Date().toISOString() },
  { id: "CLI-3", name: "Mme Bakayoko Salimata", phone: "0102030405", gender: "Femme", measures: { epaule: 41, poitrine: 98, taille: 82, bassin: 112, manche: 60, pantalon: 108 }, createdAt: new Date().toISOString() }
];

const SEED_ORDERS = [
  { id: "CMD-1001", clientName: "Mme Awa Traoré", phone: "0708091011", item: "Robe Sirène Wax Hollandais Cérémonie", category: "wax", total: 35000, deposit: 20000, deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], status: "essayage", createdAt: new Date().toISOString() },
  { id: "CMD-1002", clientName: "M. Kouamé Jean", phone: "0504030201", item: "Grand Boubou 3 pièces Bazin Getzner", category: "bazin", total: 45000, deposit: 30000, deliveryDate: new Date(Date.now() + 2*86400000).toISOString().split('T')[0], status: "confection", createdAt: new Date().toISOString() },
  { id: "CMD-1003", clientName: "Mme Bakayoko Salimata", phone: "0102030405", item: "Ensemble Kaba Pagne Tissé Vlisco", category: "wax", total: 25000, deposit: 25000, deliveryDate: new Date(Date.now() + 4*86400000).toISOString().split('T')[0], status: "pret", createdAt: new Date().toISOString() },
  { id: "CMD-1004", clientName: "M. Touré Mamadou", phone: "0788990011", item: "Veste Saharienne en Lin & Kente", category: "homme", total: 30000, deposit: 10000, deliveryDate: new Date(Date.now() + 5*86400000).toISOString().split('T')[0], status: "coupe", createdAt: new Date().toISOString() }
];

// Gestionnaire de mémoire partagé avec isolation d'environnement (Staging vs Production)
const ENV = process.env.VERCEL_ENV || process.env.NODE_ENV || 'staging';

// Utilisation d'un store global en mémoire réactif pour le runtime Vercel
if (!global.__AFRICOUTURE_DB) {
  global.__AFRICOUTURE_DB = {
    staging: {
      clients: [...SEED_CLIENTS],
      orders: [...SEED_ORDERS]
    },
    production: {
      clients: [],
      orders: []
    }
  };
}

function getStore() {
  const targetEnv = (ENV === 'production') ? 'production' : 'staging';
  return global.__AFRICOUTURE_DB[targetEnv];
}

module.exports = {
  ENV,
  getOrders: () => getStore().orders,
  setOrders: (orders) => { getStore().orders = orders; },
  getClients: () => getStore().clients,
  setClients: (clients) => { getStore().clients = clients; },
  addOrder: (order) => {
    const store = getStore();
    store.orders.unshift(order);
    return order;
  },
  updateOrder: (id, updates) => {
    const store = getStore();
    const idx = store.orders.findIndex(o => o.id === id);
    if (idx !== -1) {
      store.orders[idx] = { ...store.orders[idx], ...updates, updatedAt: new Date().toISOString() };
      return store.orders[idx];
    }
    return null;
  },
  deleteOrder: (id) => {
    const store = getStore();
    const lenBefore = store.orders.length;
    store.orders = store.orders.filter(o => o.id !== id);
    return store.orders.length < lenBefore;
  },
  addClient: (client) => {
    const store = getStore();
    store.clients.unshift(client);
    return client;
  },
  updateClient: (id, updates) => {
    const store = getStore();
    const idx = store.clients.findIndex(c => c.id === id);
    if (idx !== -1) {
      store.clients[idx] = { ...store.clients[idx], ...updates, updatedAt: new Date().toISOString() };
      return store.clients[idx];
    }
    return null;
  }
};
