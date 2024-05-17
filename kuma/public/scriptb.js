$(document).ready(function () {
    // Fetch data from the API endpoint
    $.ajax({
        url: '/api/formdata', // Your API endpoint URL
        method: 'GET',
        success: function (data) {
            // Data retrieval successful
            // Iterate through each item in the data array and display it
            data.forEach(function (item, index) {
                // Default text for call-to-action button
                var ctaText = item.cta_text || 'Read More';
                
                // Append each item's image and modified description to the dataContainer div
                var imageContainer = $('<div class="image-container">').append(
                    '<img src="/images/' + item.image + '" alt="Image">' +
                    '<div class="image-description">' +
                    '<p class="fade-in">' + formatDescription(item.description) + '</p>' +
                    '<a href="' + item.cta_link + '" class="call-to-action">' + ctaText + '</a>' +
                    '</div>'
                );
                $('#dataContainer').append(imageContainer);
                if (index === 1) {
                    imageContainer.addClass('active'); // Show first image initially
                }
            });

            // Set interval to show next image every 5 seconds
            var images = $('.image-container');
            var currentIndex = 0;

            setInterval(function () {
                // Hide current image and its description
                images.eq(currentIndex).removeClass('active').find('.image-description p').removeClass('fade-in');

                // Increment index or loop back to 0 if currentIndex is at the last index
                currentIndex = (currentIndex + 1) % images.length;

                // Show next image and its description
                images.eq(currentIndex).addClass('active').find('.image-description p').addClass('fade-in');
                
                // If currentIndex is back to 0 (first image), immediately show it
                if (currentIndex === 0) {
                    images.eq(0).addClass('active').find('.image-description p').addClass('fade-in');
                }
            }, 5000);
        },
        error: function (xhr, status, error) {
            // Error handling
            console.error('Error fetching data:', error);
        }
    });

    // Function to format the description
    function formatDescription(description) {
        var words = description.split(' '); // Split the description into words
        var formattedDescription = ''; // Initialize formatted description string
        var wordCount = 0; // Initialize word count

        // Iterate through each word in the description
        words.forEach(function (word) {
            formattedDescription += word + ' '; // Add current word to formatted description

            // Increment word count and check if it's time to add a line break
            if (++wordCount % 7 === 0 && wordCount <= 15) {
                formattedDescription += '<br>'; // Add line break after every 7 words
            }

            // Break loop if 15 words have been added
            if (wordCount >= 15) {
                return false;
            }
        });

        return formattedDescription.trim(); // Remove trailing space and return formatted description
    }

    // Click event handler for call-to-action link
    $(document).on('click', '.call-to-action', function(e) {
        e.preventDefault(); // Prevent default link behavior
        var link = $(this).attr('href'); // Get the href attribute of the clicked link
        // Redirect to news.html
        window.location.href = 'news.html';
    });
});













function minimizeCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.style.display = cartItems.style.display === 'none' ? 'block' : 'none';
  }

  function closeCart() {
    cartVisible = false;
    document.getElementById('cart').style.display = 'none';
  }