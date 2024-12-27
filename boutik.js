document.addEventListener('DOMContentLoaded', () => {
    const panier = [];
    const contenuPanier = document.getElementById('contenu-panier');
    const totalElement = document.getElementById('total');

    document.querySelectorAll('.ajouter-panier').forEach(button => {
        button.addEventListener('click', (event) => {
            const produitElement = event.target.closest('.produit');
            const id = produitElement.dataset.id;
            const nom = produitElement.dataset.nom;
            const prix = parseFloat(produitElement.dataset.prix);

            const produitExistant = panier.find(p => p.id === id);
            if (produitExistant) {
                produitExistant.quantite += 1;
            } else {
                panier.push({ id, nom, prix, quantite: 1 });
            }

            afficherPanier();
        });
    });

    function afficherPanier() {
        contenuPanier.innerHTML = '';
        let total = 0;

        panier.forEach(produit => {
            const li = document.createElement('li');
            li.textContent = `${produit.nom} - ${produit.quantite} x ${produit.prix}€`;
            contenuPanier.appendChild(li);

            total += produit.quantite * produit.prix;
        });

        if (panier.length === 0) {
            contenuPanier.innerHTML = '<li>Votre panier est vide.</li>';
        }

        totalElement.textContent = total.toFixed(2);
    }
});
