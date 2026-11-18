# AfriCouture Pro & Atelier Ciseau d'Or (Côte d'Ivoire) 🇨🇮
> **Solution Clé en Main : Site Web Vitrine + Logiciel SaaS de Gestion pour Tailleurs et Couturiers en Côte d'Ivoire**

Ce projet a été conçu sur mesure pour vous permettre de **vendre une solution complète sous forme d'abonnement mensuel ou annuel (SaaS)** à un tailleur / créateur de mode en Côte d'Ivoire (Abidjan, Yamoussoukro, Bouaké, etc.).

---

## 🌟 Ce qui a été développé

Le dossier contient **2 applications complémentaires interconnectées** :

### 1. `index.html` — Le Site Web Vitrine Public de l'Atelier
- **Pour qui ?** Les clients du couturier (particuliers qui font confectionner leurs habits).
- **Fonctionnalités clés :**
  - **Suivi de commande en direct** : Le client tape son numéro de téléphone ou de commande (ex: `CMD-1001` ou `0708091011`) et voit en temps réel où en est son vêtement (*Tissu reçu ➔ Patron & Coupe ➔ Confection & Broderie ➔ Prêt pour essayage ➔ Prêt au retrait*), avec son solde restant en FCFA !
  - **Galerie & Catalogue** : Mise en valeur du Bazin riche getzner, Pagne Wax / Woodin, Costumes masculins, Robes de mariées et tenues traditionnelles.
  - **Prise de Rendez-vous & Devis** : Redirection directe sur WhatsApp avec message pré-rempli.
  - **Tarifs indicatifs & Coordonnées** : Localisation (ex: Cocody Angré 8ème Tranche, Abidjan).

### 2. `app.html` — L'Application Métier SaaS du Couturier
- **Pour qui ?** Le maître tailleur et son équipe d'atelier (sur son smartphone, sa tablette ou son PC).
- **Fonctionnalités clés :**
  - **Bandeau de Licence & Abonnement (Votre Business Model)** :
    - Affichage du statut d'abonnement (*Actif*, date d'échéance, jours restants).
    - Modalités de règlement par **Wave CI, Orange Money, MTN MoMo**.
    - Système de clé de licence pour prolonger l'abonnement (+30j, +90j, +365j).
  - **Carnet Numérique de Mesures** :
    - Fiches clients avec coordonnées complètes.
    - Mensurations complètes pour l'homme et la femme (Épaules, Poitrine, Tour de taille, Tour de hanches, Longueur manche, Tour de bras, Longueur pantalon/jupe, Tour de cuisse, Boubou/Robe en cm).
  - **Gestion des Commandes & Confections** :
    - Enregistrement des confections avec calcul automatique du solde restant.
    - Mise à jour des statuts en 1 clic.
    - **Bouton WhatsApp Magique** : Envoie un message pré-écrit au client selon le statut (ex: vêtement prêt pour essayage ou solde restant à régler au retrait).
    - **Impression du Ticket / Reçu de Caisse** format reçu officiel pour le client.
  - **Caisse & Finances en FCFA** :
    - Suivi du Chiffre d'Affaires total.
    - Total des acomptes encaissés.
    - Total des restes à recouvrer chez les clients (impayés).
  - **Sauvegarde & Restauration 100% Hors-ligne** :
    - Fonctionne même sans connexion Internet via `localStorage`.
    - Bouton pour exporter toutes les données dans un fichier `.json` sécurisé.

---

## 💰 Comment faire payer l'abonnement à votre client ?

### 1. Tarifs recommandés sur le marché ivoirien
- **Formule Mensuelle** : **10 000 FCFA à 15 000 FCFA / mois** (très accessible pour un atelier qui fait des confections entre 20 000 et 50 000 FCFA l'unité).
- **Formule Annuelle** : **100 000 FCFA à 150 000 FCFA / an** (avec 2 mois offerts pour inciter au paiement direct sur l'année).
- **Frais de mise en service (Optionnel)** : **25 000 FCFA à 50 000 FCFA** la première fois (pour entrer son logo, ses photos de modèles et ses premiers clients).

### 2. Comment vous êtes payé ?
Dans l'onglet **"Mon Abonnement SaaS"** de `app.html`, vos coordonnées de paiement Mobile Money sont affichées (Wave, Orange Money, MTN MoMo).
Quand le tailleur vous transfère les fonds :
1. Vous lui donnez une clé de renouvellement.
2. Clés pré-configurées (vous pouvez les changer dans le code) :
   - `PRO-30J` : Prolonge l'abonnement de **30 jours**.
   - `PRO-90J` : Prolonge l'abonnement de **90 jours**.
   - `ANNUEL-365` : Prolonge l'abonnement de **365 jours**.

---

## 🚀 Comment lancer et tester sur votre ordinateur dès maintenant ?

Vous n'avez besoin d'installer aucun logiciel complexe ! Les deux fichiers s'ouvrent directement dans n'importe quel navigateur web (Google Chrome, Microsoft Edge, Safari, Firefox).

1. Ouvrez le dossier :
   `C:\Users\Konat\.gemini\antigravity\scratch\couture-saas-ci\`
2. Double-cliquez sur `index.html` pour voir le **Site Vitrine Client**.
3. Double-cliquez sur `app.html` pour voir le **Tableau de Bord SaaS du Couturier**.

---

## 🌐 Comment le mettre en ligne gratuitement pour votre client ?

Pour que votre client couturier et ses clients puissent y accéder depuis leurs smartphones avec une adresse web :

### Option A : Déploiement en 1 minute sur Vercel ou Netlify (Gratuit)
1. Créez un compte gratuit sur [Netlify.com](https://www.netlify.com) ou [Vercel.com](https://www.vercel.com).
2. Glissez-déposez le dossier `couture-saas-ci` dans la zone de dépôt.
3. En 10 secondes, vous obtenez un lien web sécurisé en HTTPS (ex: `ciseaudor-abidjan.netlify.app`).

### Option B : Nom de domaine personnalisé (.ci ou .com)
Vous pouvez lui acheter un nom de domaine ivoirien (ex: `atelier-ciseaudor.ci` ou `couture-abidjan.com`) pour 10 000 à 15 000 FCFA / an et le relier au site, ce qui donnera une image très haut de gamme à son atelier.

---

## 🛠️ Personnalisation rapide pour votre client

Pour adapter les coordonnées aux vraies informations de votre client :
- Ouvrez `index.html` et `app.html` avec un éditeur de texte (Bloc-notes, VS Code, etc.).
- Remplacez **"Atelier Ciseau d'Or"** par le vrai nom de l'atelier de votre client.
- Remplacez le numéro de téléphone **`+225 07 00 00 00 00`** par le vrai numéro WhatsApp de votre client couturier.
- Dans `app.html` (onglet abonnement), mettez **votre propre numéro Wave / Orange Money** pour recevoir les paiements de son abonnement.
