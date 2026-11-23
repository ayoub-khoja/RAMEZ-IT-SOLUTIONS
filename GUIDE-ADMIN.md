# Espace admin RAMEZ IT Solutions

Adresse : **https://www.ramezitsolutions.tn/admin**

Chaque message ou demande de devis envoyé depuis le formulaire du site est enregistré
dans une base de données. Dans l'espace admin, vous pouvez :

- voir toutes les demandes, avec des statistiques (nouveaux, en cours, devis, ce mois-ci) ;
- filtrer par statut (Nouveau, En cours, Traité, Archivé) ou par type (Message / Devis) et rechercher ;
- ouvrir une demande : répondre par e-mail ou WhatsApp, changer le statut, écrire des notes internes, supprimer.

## Installation (une seule fois)

### 1. Installer la nouvelle dépendance

Dans le terminal de Cursor, à la racine du projet :

```bash
npm install
```

### 2. Créer la base de données (gratuit)

1. Allez sur https://neon.tech et créez un compte (avec Google, c'est le plus simple).
2. Créez un projet (région : Europe, par exemple Frankfurt).
3. Cliquez sur **Connect** et copiez l'adresse qui commence par `postgresql://...`

La table se crée toute seule au premier message : rien d'autre à faire.

### 3. Remplir le fichier `.env.local`

Copiez `.env.example` en `.env.local` et remplissez :

```
DATABASE_URL=postgresql://...            (l'adresse copiée sur Neon)
ADMIN_PASSWORD=un-mot-de-passe-long      (celui que vous taperez sur /admin)
ADMIN_SESSION_SECRET=...                 (32 caractères au hasard)
```

Pour générer `ADMIN_SESSION_SECRET`, tapez dans le terminal :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Redémarrez ensuite `npm run dev` et ouvrez http://localhost:3000/admin

### 4. Mettre en ligne

Chez votre hébergeur (par exemple Vercel : Project → Settings → Environment Variables),
ajoutez **les mêmes variables** : `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`
(et `RESEND_API_KEY` si vous voulez aussi recevoir un e-mail à chaque demande), puis redéployez.

## Sécurité

- Le fichier `.env.local` ne doit **jamais** être envoyé sur GitHub (il est déjà ignoré).
- L'espace /admin est caché de Google (robots.txt et `noindex`).
- Pour déconnecter tout le monde, changez `ADMIN_SESSION_SECRET`.
