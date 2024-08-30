document.addEventListener('DOMContentLoaded', () => {
    // Selectors for both Marketing and Landing pages
    const marketingEditor = document.querySelector('#marketingEditor');
    const landingEditor = document.querySelector('#landingEditor');
    const marketingEditorButton = document.querySelector('#marketingEditorButton');
    const landingEditorButton = document.querySelector('#landingEditorButton');
    const saveMarketingPageButton = document.querySelector('#saveMarketingPageButton');
    const savePageButton = document.querySelector('#savePageButton');
    const deleteCampaignButton = document.querySelector('#deleteCampaignButton');

    const marketingContent = document.querySelector('#marketingContent');
    const imageUrl = document.querySelector('#imageUrl');
    const imageUpload = document.querySelector('#imageUpload');
    const pageColor = document.querySelector('#pageColor');
    const marketingColorButton = document.querySelector('#marketingColorButton');
    const marketingColorDisplay = document.querySelector('#marketingColorDisplay');
    const pageFontType = document.querySelector('#pageFontType');
    const marketingPreview = document.querySelector('#marketingPreview');
    const fileName = document.querySelector('#fileName');
    const removeImageButton = document.querySelector('#removeImageButton');

    const landingCampaignName = document.querySelector('#landingCampaignName');
    const landingContent = document.querySelector('#landingContent');
    const landingImageUrl = document.querySelector('#landingImageUrl');
    const landingImageUpload = document.querySelector('#landingImageUpload');
    const landingPageColor = document.querySelector('#landingPageColor');
    const landingColorButton = document.querySelector('#landingColorButton');
    const landingColorDisplay = document.querySelector('#landingColorDisplay');
    const landingPageFontType = document.querySelector('#landingPageFontType');
    const landingPreview = document.querySelector('#landingPreview');
    const landingFileName = document.querySelector('#landingFileName');
    const removeLandingImageButton = document.querySelector('#removeLandingImageButton');

    let marketingImageBase64 = null;
    let landingImageBase64 = null;

    // Function to update the Marketing Preview
    function updateMarketingPreview() {
        marketingPreview.style.backgroundColor = pageColor.value;
        marketingPreview.style.fontFamily = pageFontType.value;
        marketingPreview.innerHTML = marketingContent.value;

        if (marketingImageBase64) {
            marketingPreview.innerHTML += `<img id="uploadedImageMarketing" src="${marketingImageBase64}" alt="User uploaded image" style="width:100%; height:100%; object-fit: cover;">`;
        }
    }

    // Function to update the Landing Preview
    function updateLandingPreview() {
        landingPreview.style.backgroundColor = landingPageColor.value;
        landingPreview.style.fontFamily = landingPageFontType.value;
        landingPreview.innerHTML = `<h3>${landingCampaignName.value}</h3>`;
        landingPreview.innerHTML += landingContent.value;

        if (landingImageBase64) {
            landingPreview.innerHTML += `<img id="uploadedImageLanding" src="${landingImageBase64}" alt="User uploaded image" style="width:100%; height:100%; object-fit: cover;">`;
        }
    }

    // Event listeners for switching between editors
    marketingEditorButton.addEventListener('click', () => {
        marketingEditorButton.classList.add('active');
        landingEditorButton.classList.remove('active');
        marketingEditor.style.display = 'block';
        landingEditor.style.display = 'none';
    });

    landingEditorButton.addEventListener('click', () => {
        landingEditorButton.classList.add('active');
        marketingEditorButton.classList.remove('active');
        marketingEditor.style.display = 'none';
        landingEditor.style.display = 'block';
    });

    // Event listeners for image uploads
    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                marketingImageBase64 = e.target.result;
                updateMarketingPreview();
            };
            reader.readAsDataURL(file);
        } else {
            fileName.textContent = "No File Selected";
        }
    });

    landingImageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            landingFileName.textContent = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                landingImageBase64 = e.target.result;
                updateLandingPreview();
            };
            reader.readAsDataURL(file);
        } else {
            landingFileName.textContent = "No File Selected";
        }
    });

    // Remove images
    removeImageButton.addEventListener('click', () => {
        marketingImageBase64 = null;
        const uploadedImageMarketing = document.querySelector('#uploadedImageMarketing');
        if (uploadedImageMarketing) {
            uploadedImageMarketing.remove();
        }
        fileName.textContent = 'No File Selected';

        const savedMarketingPage = JSON.parse(localStorage.getItem('marketingPage'));
        if (savedMarketingPage) {
            delete savedMarketingPage.image;
            localStorage.setItem('marketingPage', JSON.stringify(savedMarketingPage));
        }
    });

    removeLandingImageButton.addEventListener('click', () => {
        landingImageBase64 = null;
        const uploadedImageLanding = document.querySelector('#uploadedImageLanding');
        if (uploadedImageLanding) {
            uploadedImageLanding.remove();
        }
        landingFileName.textContent = 'No File Selected';

        const savedLandingPage = JSON.parse(localStorage.getItem('landingPage'));
        if (savedLandingPage) {
            delete savedLandingPage.image;
            localStorage.setItem('landingPage', JSON.stringify(savedLandingPage));
        }
    });

    // Save Landing Page
    savePageButton.addEventListener('click', () => {
        const landingPage = {
            campaignName: landingCampaignName.value,
            content: landingContent.value,
            bgColor: landingPageColor.value,
            fontType: landingPageFontType.value,
            image: landingImageBase64,
            creationDate: new Date().toLocaleDateString(),
        };
        localStorage.setItem('landingPage', JSON.stringify(landingPage));
        alert('Landing page saved successfully!');
    });

    // Save Marketing Page
    saveMarketingPageButton.addEventListener('click', () => {
        const marketingPage = {
            content: marketingContent.value,
            bgColor: pageColor.value,
            fontType: pageFontType.value,
            image: marketingImageBase64,
        };
        localStorage.setItem('marketingPage', JSON.stringify(marketingPage));
        alert('Marketing page saved successfully!');
    });

    // Delete Landing Page Campaign
    deleteCampaignButton.addEventListener('click', () => {
        localStorage.removeItem('landingPage');

        landingCampaignName.value = '';
        landingContent.value = '';
        landingPageColor.value = '#ffffff';
        landingPageFontType.value = 'Arial';
        landingImageBase64 = null;
        landingFileName.textContent = 'No File Selected';
        landingColorDisplay.style.backgroundColor = '#ffffff';

        updateLandingPreview();

        alert('Campaign deleted successfully!');

        const campaignNameElement = document.querySelector('#campaignName');
        const campaignDateElement = document.querySelector('#campaignDate');
        const landingPreviewBox = document.querySelector('#landingPreviewBox');

        campaignNameElement.textContent = 'No active campaign.';
        campaignDateElement.textContent = 'No date available.';
        landingPreviewBox.innerHTML = '';
    });

    // Update Previews on Input Changes
    marketingContent.addEventListener('input', updateMarketingPreview);
    pageColor.addEventListener('input', updateMarketingPreview);
    pageFontType.addEventListener('change', updateMarketingPreview);

    landingCampaignName.addEventListener('input', updateLandingPreview);
    landingContent.addEventListener('input', updateLandingPreview);
    landingPageColor.addEventListener('input', updateLandingPreview);
    landingPageFontType.addEventListener('change', updateLandingPreview);

    // Color Picker Buttons
    marketingColorButton.addEventListener('click', () => {
        const rect = marketingColorButton.getBoundingClientRect();
        pageColor.style.position = "absolute";
        pageColor.style.top = `${rect.bottom + window.scrollY}px`;
        pageColor.style.left = `${rect.left + window.scrollX}px`;
        pageColor.click();
    });

    landingColorButton.addEventListener('click', () => {
        const rect = landingColorButton.getBoundingClientRect();
        landingPageColor.style.position = "absolute";
        landingPageColor.style.top = `${rect.bottom + window.scrollY}px`;
        landingPageColor.style.left = `${rect.left + window.scrollX}px`;
        landingPageColor.click();
    });

    // Set Background Color in Preview
    pageColor.addEventListener('input', () => {
        marketingColorDisplay.style.backgroundColor = pageColor.value;
        updateMarketingPreview();
    });

    landingPageColor.addEventListener('input', () => {
        landingColorDisplay.style.backgroundColor = landingPageColor.value;
        updateLandingPreview();
    });

    // Hide Native Color Picker Input
    pageColor.style.visibility = "hidden";
    landingPageColor.style.visibility = "hidden";

    // Load Saved Pages
    window.addEventListener('load', () => {
        const savedMarketingPage = localStorage.getItem('marketingPage');
        if (savedMarketingPage) {
            const page = JSON.parse(savedMarketingPage);
            marketingContent.value = page.content;
            pageColor.value = page.bgColor;
            pageFontType.value = page.fontType;
            marketingImageBase64 = page.image;
            marketingColorDisplay.style.backgroundColor = pageColor.value;
            updateMarketingPreview();
        }

        const savedLandingPage = localStorage.getItem('landingPage');
        if (savedLandingPage) {
            const page = JSON.parse(savedLandingPage);
            landingCampaignName.value = page.campaignName || '';
            landingContent.value = page.content;
            landingPageColor.value = page.bgColor;
            landingPageFontType.value = page.fontType;
            landingImageBase64 = page.image;
            landingColorDisplay.style.backgroundColor = landingPageColor.value;
            updateLandingPreview();
        }
    });
});