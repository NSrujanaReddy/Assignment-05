fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    const products = data.products;
    const container = document.getElementById('productContainer');

    if (!container) {
      console.error('No element with id "productContainer" found.');
      return;
    }

    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="product-image" />
        <h3 class="product-title">${product.title}</h3>
        <p class="product-brand"><strong>Brand:</strong> ${product.brand}</p>
        <p class="product-category"><strong>Category:</strong> ${product.category}</p>
        <p class="product-price">₹${product.price}</p>
      `;

      // On click, save product to localStorage and go to details page
      card.addEventListener('click', () => {
        // Save entire product object as JSON string
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        // Redirect
        window.location.href = 'details.html';
      });

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Error fetching products:', err);
    const container = document.getElementById('productContainer');
    if (container) {
      container.innerText = 'Failed to load products.';
    }
  });
