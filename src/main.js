import './style.css'
import { filtrerProduits, trierProduits, renderListeProduits } from './produits.js'
import { addProduit } from './panier.js'

let produits = []
let recherche = ''
let tri = 'nom'

const listeProduits = document.getElementById('liste-produits')
const compteur = document.getElementById('compteur-produits')
const rechercheInput = document.getElementById('recherche')
const triSelect = document.getElementById('tri')
const resetBtn = document.getElementById('reset-filtres')

function afficher() {
  const filtres = filtrerProduits(produits, recherche)
  const tries = trierProduits(filtres, tri)
  renderListeProduits(tries, listeProduits, (produit) => {
    addProduit(produit)
    showToast(`${produit.nom} ajouté à la liste`)
  })
  compteur.textContent = tries.length
}

function showToast(message) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  document.getElementById('toast-container').appendChild(toast)
  setTimeout(() => toast.remove(), 2500)
}

rechercheInput.addEventListener('input', e => {
  recherche = e.target.value
  afficher()
})

triSelect.addEventListener('change', e => {
  tri = e.target.value
  afficher()
})

resetBtn.addEventListener('click', () => {
  recherche = ''
  tri = 'nom'
  rechercheInput.value = ''
  triSelect.value = 'nom'
  afficher()
})

fetch('/liste_produits_quotidien.json')
  .then(res => res.json())
  .then(data => {
    produits = data
    afficher()
  })
