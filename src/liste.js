import './style.css'
import { getPanier, removeProduit, updateQuantite, viderPanier, calculerTotal } from './panier.js'

const tbody = document.getElementById('liste-course-body')
const totalEl = document.getElementById('total-general')
const viderBtn = document.getElementById('vider-liste')

function updateTotal() {
  totalEl.textContent = `${calculerTotal(getPanier()).toFixed(2)} €`
}

function renderLigne(produit, index) {
  const tr = document.createElement('tr')
  tr.innerHTML = `
    <td>${produit.nom}</td>
    <td>${produit.prix_unitaire.toFixed(2)} €</td>
    <td>
      <input type="number" min="1" value="${produit.quantite}"
             data-index="${index}" class="input-qty" />
    </td>
    <td class="cell-sous-total">${(produit.prix_unitaire * produit.quantite).toFixed(2)} €</td>
    <td>
      <button class="btn-delete" data-delete="${index}">Supprimer</button>
    </td>
  `

  const input = tr.querySelector('input')
  const cellSousTotal = tr.querySelector('.cell-sous-total')

  input.addEventListener('input', e => {
    const qte = parseInt(e.target.value, 10)
    if (!qte || qte < 1) return
    updateQuantite(index, qte)
    cellSousTotal.textContent = `${(produit.prix_unitaire * qte).toFixed(2)} €`
    updateTotal()
  })

  input.addEventListener('change', e => {
    const qte = parseInt(e.target.value, 10)
    if (!qte || qte < 1) {
      e.target.value = 1
      updateQuantite(index, 1)
      cellSousTotal.textContent = `${produit.prix_unitaire.toFixed(2)} €`
      updateTotal()
    }
  })

  tr.querySelector('button').addEventListener('click', () => {
    removeProduit(index)
    afficher()
  })

  return tr
}

function afficher() {
  const panier = getPanier()
  tbody.innerHTML = ''
  panier.forEach((produit, index) => tbody.appendChild(renderLigne(produit, index)))
  updateTotal()
}

viderBtn.addEventListener('click', () => {
  if (confirm('Vider toute la liste ?')) {
    viderPanier()
    afficher()
  }
})

afficher()
