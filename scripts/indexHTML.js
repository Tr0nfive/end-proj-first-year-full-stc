document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements to display campaign details and landing page preview
    const campaignNameElement = document.querySelector('#campaignName');
    const campaignDateElement = document.querySelector('#campaignDate');
    const landingPreviewBox = document.querySelector('#landingPreviewBox');

    // Retrieve the saved landing page data from local storage
    const savedLandingPage = JSON.parse(localStorage.getItem('landingPage'));

    // Check if there is saved landing page data and if it contains content
    if (savedLandingPage && savedLandingPage.content) {
        // Display the campaign name or a default message if the name is not available
        campaignNameElement.textContent = `CAMPAIGN: ${savedLandingPage.campaignName || "No active campaign."}`;
        
        // Display the creation date or a default message if the date is not available
        campaignDateElement.textContent = `CREATED ON: ${savedLandingPage.creationDate || "No date available."}`;
        
        // Render the landing page preview
        landingPreviewBox.style.backgroundColor = savedLandingPage.bgColor || "#ffffff"; // Set background color
        landingPreviewBox.style.fontFamily = savedLandingPage.fontType || "Arial"; // Set font type
        landingPreviewBox.innerHTML = savedLandingPage.content || ""; // Insert the saved HTML content

        // If an image was saved with the landing page, append it to the preview
        if (savedLandingPage.image) {
            const img = document.createElement('img');
            img.src = savedLandingPage.image;
            img.alt = 'Landing Page Image';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.objectFit = 'cover'; // Ensure the image fits well within the preview
            landingPreviewBox.appendChild(img);
        }
    } else {
        // If no saved landing page is found, display default messages
        campaignNameElement.textContent = 'No active campaign.';
        campaignDateElement.textContent = 'No date available.';
        landingPreviewBox.innerHTML = ''; // Clear any previous content in the preview box
    }
});