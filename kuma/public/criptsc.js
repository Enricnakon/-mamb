$(document).ready(function() {
  // Add click event listener to subcategory links
  $('.subcategory-link').click(function(event) {
    event.preventDefault();
    const subcategory = $(this).data('subcategory');
    fetchAndDisplayProducts('Furniture', subcategory);
  });

  // Function to fetch and display products for a specific subcategory
  async function fetchAndDisplayProducts(category, subcategory) {
    try {
      const response = await fetch(`/category/${category}/${subcategory}`);
      const products = await response.json();
      displayLatestProducts(category, products, subcategory);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }

  // Function to display products in the container
  function displayLatestProducts(category, products, subcategory) {
    const container = $(`#latest${category}`);
    container.empty(); // Clear previous content

    products.forEach(product => {
      const card = $(`
        <div class="card mt-3">
          <div class="card-header">${product.productName}</div>
          <div class="card-body">
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <img src="/images/${product.productImages[0]}" alt="Product Image" class="img-fluid card-img-top" width="200" height="150">
            <div class="overlay"></div>
          </div>
        </div>
      `);
      container.append(card);
    });

    // Update page URL to reflect selected subcategory
    history.pushState(null, null, `/category/${category}/${subcategory}`);
  }
});



