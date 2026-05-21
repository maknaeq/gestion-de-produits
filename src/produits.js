export function filtrerProduits(produits, recherche) {
  const query = recherche.toLowerCase().trim()
  if (!query) return produits
  return produits.filter(p => p.nom.toLowerCase().includes(query))
}

export function trierProduits(produits, critere) {
  return [...produits].sort((a, b) =>
    critere === 'prix' ? a.prix_unitaire - b.prix_unitaire : a.nom.localeCompare(b.nom)
  )
}

export function renderProduitCard(produit) {
  const li = document.createElement('li')
  li.innerHTML = `
    <div class="card">
      <h2 class="card-title">${produit.nom}</h2>
      <p class="card-stock">Stock : ${produit.quantite_stock}</p>
      <div class="card-footer">
        <span class="card-price">${produit.prix_unitaire.toFixed(2)} €</span>
        <button class="btn-add" data-nom="${produit.nom}" aria-label="Ajouter ${produit.nom}">+</button>
      </div>
    </div>
  `
  return li
}

export function renderListeProduits(produits, container, onAjouter) {
  container.innerHTML = ''
  produits.forEach(produit => {
    const li = renderProduitCard(produit)
    li.querySelector('button').addEventListener('click', () => onAjouter(produit))
    container.appendChild(li)
  })
}
