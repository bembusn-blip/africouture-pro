# AfriCouture Pro 🇨🇮
> **Logiciel SaaS & Portail Client pour Ateliers de Couture et Créateurs en Côte d'Ivoire**

AfriCouture Pro est une plateforme complète conçue pour digitaliser les ateliers de confection en Afrique de l'Ouest : gestion des commandes en 6 étapes de confection, carnet de mensurations numériques en centimètres, alertes WhatsApp automatisées, calculatrice de métrages de pagne (Bazin, Wax, Lin) et suivi de commande en temps réel pour les clients.

---

## 🏗️ Architecture Technique du Projet

### 1. Frontend Mobile-First (`index.html`)
- **Conception Mobile-First native** : Navigation au pouce via une barre inférieure dédiée, optimisée pour smartphones iOS (Safari sans zoom forcé) et Android.
- **Vrais Onglets SaaS Indépendants** :
  - 📊 **Tableau de Bord** : Indicateurs clés (CA total, encaissé réel, soldes dus) et commandes urgentes sous 48h.
  - 👗 **Commandes en Atelier** : Filtres rapides par type de tissu (*Toutes*, *Bazin Riche*, *Wax & Pagne*, *Urgences*, *Soldes*), mise à jour du statut en 1 tap et relance WhatsApp.
  - 📐 **Carnet de Mesures** : Fiches clients avec mensurations complètes en cm (Épaule, Poitrine, Taille, Bassin, Manche, Longueur).
  - ✂️ **Modèles & Métrages** : Barèmes des tenues traditionnelles et modernes (Grand Boubou Getzner, Robe Sirène, Saharienne).
  - 💰 **Caisse & Recouvrements** : Suivi financier et relances des impayés avec messages pré-remplis.
  - 🌐 **Suivi Client Public** : Portail accessible aux clients finaux par numéro de téléphone ou référence reçu.
  - 🛡️ **Abonnement SaaS** : Gestion de la licence atelier (15 000 FCFA/mois via Wave CI ou Orange Money).

### 2. Backend Serverless Vercel (`api/`)
- `GET /api/health` : Diagnostic de disponibilité du backend, statut de la base de données et environnement.
- `GET, POST, PATCH, DELETE /api/orders` : CRUD complet des commandes avec calcul automatique des acomptes et soldes.
- `GET, POST /api/clients` : Gestion des profils clients et de leurs mensurations corporelles.
- `GET /api/track?q=...` : Consultation publique sécurisée (données financières confidentielles masquées).
- `_db.js` : Moteur de données avec étanchéité stricte entre les environnements **Staging** (tests clients) et **Production** (officiel).

### 3. Configuration Cloud (`vercel.json`)
- Déploiement optimisé sans serveur lourd avec URL propres (`cleanUrls`) et gestion CORS sécurisée pour les API.

---

## 🔒 Sécurité et Données Sensibles
- Aucun mot de passe, clé secrète ou numéro bancaire privé n'est présent dans le code source.
- Les scripts d'exécution locale temporaires (`server.ps1`, `tunnel.ps1`) et les fichiers de configuration locale sont exclus du dépôt via `.gitignore`.

---

## 🚀 Environnements de Déploiement
- **Staging (Tests)** : Déployé sur la branche `staging` pour validation par le tailleur et test clients.
- **Production (Officiel)** : Déployé sur la branche `main` uniquement après validation explicite.
