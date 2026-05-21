const STORAGE_KEY = 'liste_course'

export function getPanier() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
}

function savePanier(panier) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(panier))
}

export function addProduit({ nom, prix_unitaire }) {
  const panier = getPanier()
  const existing = panier.findIndex(p => p.nom === nom)
  if (existing >= 0) {
    panier[existing].quantite += 1
  } else {
    panier.push({ nom, prix_unitaire, quantite: 1 })
  }
  savePanier(panier)
  return panier
}

export function removeProduit(index) {
  const panier = getPanier()
  panier.splice(index, 1)
  savePanier(panier)
  return panier
}

export function updateQuantite(index, quantite) {
  const panier = getPanier()
  if (quantite <= 0) {
    panier.splice(index, 1)
  } else {
    panier[index].quantite = quantite
  }
  savePanier(panier)
  return panier
}

export function viderPanier() {
  localStorage.removeItem(STORAGE_KEY)
  return []
}

export function calculerTotal(panier) {
  return panier.reduce((sum, p) => sum + p.prix_unitaire * p.quantite, 0)
}
