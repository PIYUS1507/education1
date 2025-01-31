// Function to filter the resources by search term
function filterResources() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    
    const categories = document.querySelectorAll(".category");
    
    categories.forEach(category => {
        const resources = category.querySelectorAll("ul li");
        let hasMatch = false;

        resources.forEach(resource => {
            const text = resource.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                resource.style.display = "block";  // Show matching item
                hasMatch = true;
            } else {
                resource.style.display = "none";  // Hide non-matching item
            }
        });

        // If no match in the category, hide the category header
        const categoryHeader = category.querySelector("h2");
        categoryHeader.style.display = hasMatch ? "block" : "none";
    });
}
