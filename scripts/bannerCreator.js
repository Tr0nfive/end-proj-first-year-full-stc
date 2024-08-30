document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements for banner customization and interaction
  const bannerOrientation = document.querySelector('#bannerOrientation');
  const bannerText = document.querySelector('#bannerText');
  const bannerBgColor = document.querySelector('#bannerBgColor');
  const bannerTextColor = document.querySelector('#bannerTextColor');
  const bannerFontSize = document.querySelector('#bannerFontSize');
  const bannerFontType = document.querySelector('#bannerFontType');
  const bannerPreview = document.querySelector('#bannerPreview');
  const saveBannerButton = document.querySelector('#saveBannerButton');
  const addTextLineButton = document.querySelector('#addTextLine');
  const deleteTextLineButton = document.querySelector('#deleteTextLine');
  const savedBannerSelect = document.querySelector('#savedBannerSelect');
  const loadBannerButton = document.querySelector('#loadBannerButton');
  const deleteBannerButton = document.querySelector('#deleteBannerButton');
  const hulkImages = document.querySelectorAll('.hulk');
  const background = document.querySelector('#background'); // Background element

  // Initialize variables for text dragging and selection
  let currentDraggedText = null;
  let selectedTextElement = null; // Track selected text element
  let isBroken = false; // Track background state

  // Function to update the banner preview based on selected options
  function updateBannerPreview() {
      bannerPreview.style.backgroundColor = bannerBgColor.value;
      bannerPreview.style.width = bannerOrientation.value === 'portrait' ? '300px' : '250px';
      bannerPreview.style.height = bannerOrientation.value === 'portrait' ? '600px' : '250px';

      if (selectedTextElement) {
          selectedTextElement.style.color = bannerTextColor.value;
          selectedTextElement.style.fontFamily = bannerFontType.value;
          selectedTextElement.style.fontSize = `${bannerFontSize.value}px`;
      }
  }

  // Event listener to update background color
  bannerBgColor.addEventListener('input', updateBannerPreview);

  // Event listener to update banner orientation
  bannerOrientation.addEventListener('change', updateBannerPreview);

  // Apply changes only to the selected text element
  [bannerTextColor, bannerFontSize, bannerFontType].forEach(el => {
      el.addEventListener('input', updateBannerPreview);
  });

  // Function to add a new text line to the banner
  addTextLineButton.addEventListener('click', () => {
      if (bannerText.value.trim() !== "") {
          const textElement = document.createElement('div');
          textElement.classList.add('bannerTextElement');
          textElement.textContent = bannerText.value;
          textElement.draggable = true;

          // Event listener to select the text element for editing
          textElement.addEventListener('click', () => {
              if (selectedTextElement) {
                  selectedTextElement.style.border = 'none'; // Deselect previous
              }
              selectedTextElement = textElement;
              textElement.style.border = '2px dashed red'; // Highlight selected

              // Update controls to reflect the selected text's properties
              bannerTextColor.value = rgbToHex(textElement.style.color || '#000000');
              bannerFontType.value = textElement.style.fontFamily || 'Arial';
              bannerFontSize.value = parseInt(textElement.style.fontSize) || 24;
          });

          // Event listener to handle drag start for text elements
          textElement.addEventListener('dragstart', (e) => {
              currentDraggedText = textElement;
              e.dataTransfer.setData('text', '');
          });

          bannerPreview.appendChild(textElement); // Add the new text element to the banner
          bannerText.value = ""; // Clear input field
          updateBannerPreview(); // Update the preview with the new element
      }
  });

  // Function to delete the selected text line from the banner
  deleteTextLineButton.addEventListener('click', () => {
      if (selectedTextElement) {
          bannerPreview.removeChild(selectedTextElement);
          selectedTextElement = null; // Clear selection
      } else {
          alert('Please select a text element to delete.');
      }
  });

  // Handle drag and drop for positioning text elements within the banner
  bannerPreview.addEventListener('dragover', (e) => {
      e.preventDefault();
  });

  bannerPreview.addEventListener('drop', (e) => {
      e.preventDefault();
      if (currentDraggedText) {
          const rect = bannerPreview.getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;

          // Ensure text stays within bounds of the banner
          const maxX = bannerPreview.clientWidth - currentDraggedText.clientWidth;
          const maxY = bannerPreview.clientHeight - currentDraggedText.clientHeight;

          currentDraggedText.style.left = `${Math.min(Math.max(0, offsetX), maxX)}px`;
          currentDraggedText.style.top = `${Math.min(Math.max(0, offsetY), maxY)}px`;

          currentDraggedText = null;
      }
  });

  // Function to save the current banner configuration to local storage
  function saveBanner() {
      let banners = JSON.parse(localStorage.getItem('banners')) || [];
      const bannerData = {
          orientation: bannerOrientation.value,
          textElements: Array.from(bannerPreview.querySelectorAll('.bannerTextElement')).map(el => ({
              text: el.textContent.trim(),
              color: el.style.color,
              fontFamily: el.style.fontFamily,
              fontSize: el.style.fontSize,
              top: el.style.top,
              left: el.style.left
          })),
          bgColor: bannerBgColor.value,
          textColor: bannerTextColor.value,
          fontSize: bannerFontSize.value,
          fontType: bannerFontType.value
      };

      if (banners.length >= 5) { // Check if there are already 5 saved banners
          if (confirm("The memory is full, do you want to save this over one of the other banners?")) {
              const replaceIndex = prompt("Enter the number (1-5) of the banner you want to replace:");
              if (replaceIndex >= 1 && replaceIndex <= 5) {
                  banners[replaceIndex - 1] = bannerData;
                  localStorage.setItem('banners', JSON.stringify(banners));
                  alert('Banner replaced successfully!');
              } else {
                  alert('Invalid input. Save operation cancelled.');
              }
          }
      } else {
          banners.push(bannerData);
          localStorage.setItem('banners', JSON.stringify(banners));
          alert('Banner saved successfully!');
      }

      updateSavedBannerList(); // Update the list of saved banners
  }

  // Function to load a saved banner configuration
  function loadBanner(index) {
      const banners = JSON.parse(localStorage.getItem('banners')) || [];
      if (banners[index]) {
          const banner = banners[index];

          // Set banner properties from the saved data
          bannerOrientation.value = banner.orientation;
          bannerBgColor.value = banner.bgColor;
          bannerTextColor.value = banner.textColor;
          bannerFontSize.value = banner.fontSize;
          bannerFontType.value = banner.fontType;

          // Clear existing text elements
          bannerPreview.innerHTML = '';

          // Add saved text elements to the preview
          banner.textElements.forEach(el => {
              const textElement = document.createElement('div');
              textElement.classList.add('bannerTextElement');
              textElement.style.position = 'absolute';
              textElement.style.top = el.top;
              textElement.style.left = el.left;
              textElement.textContent = el.text;
              textElement.style.color = el.color;
              textElement.style.fontFamily = el.fontFamily;
              textElement.style.fontSize = el.fontSize;
              textElement.draggable = true;

              // Add click listener to select the text element
              textElement.addEventListener('click', () => {
                  if (selectedTextElement) {
                      selectedTextElement.style.border = 'none'; // Deselect previous
                  }
                  selectedTextElement = textElement;
                  textElement.style.border = '2px dashed red'; // Highlight selected

                  // Update controls to reflect selected text's properties
                  bannerTextColor.value = rgbToHex(textElement.style.color || '#000000');
                  bannerFontType.value = textElement.style.fontFamily || 'Arial';
                  bannerFontSize.value = parseInt(textElement.style.fontSize) || 24;
              });

              // Add dragstart listener for text elements
              textElement.addEventListener('dragstart', (e) => {
                  currentDraggedText = textElement;
                  e.dataTransfer.setData('text', '');
              });

              bannerPreview.appendChild(textElement); // Add element to preview
          });

          updateBannerPreview(); // Update preview after loading
      }
  }

  // Function to update the list of saved banners in the dropdown
  function updateSavedBannerList() {
      savedBannerSelect.innerHTML = ''; // Clear current options
      const banners = JSON.parse(localStorage.getItem('banners')) || [];
      banners.forEach((_, index) => {
          const option = document.createElement('option');
          option.value = index;
          option.textContent = `Banner ${index + 1}`;
          savedBannerSelect.appendChild(option);
      });
  }

  // Event listener for saving the current banner
  saveBannerButton.addEventListener('click', saveBanner);

  // Event listener for loading the selected banner
  loadBannerButton.addEventListener('click', () => {
      const selectedIndex = savedBannerSelect.value;
      loadBanner(selectedIndex);
  });

  // Event listener for deleting the selected banner
  deleteBannerButton.addEventListener('click', () => {
      const selectedIndex = savedBannerSelect.value;
      let banners = JSON.parse(localStorage.getItem('banners')) || [];
      banners.splice(selectedIndex, 1); // Remove selected banner
      localStorage.setItem('banners', JSON.stringify(banners));
      updateSavedBannerList(); // Refresh the list
  });

  // Function to convert RGB color values to hex
  function rgbToHex(rgb) {
      let rgbValues = rgb.match(/\d+/g).map(Number);
      return "#" + rgbValues.map(x => x.toString(16).padStart(2, "0")).join("");
  }

  // Event listeners to play Hulk sound and toggle background images
  hulkImages.forEach(hulk => {
      hulk.addEventListener('click', playHulkSound);
  });

  // Function to play the Hulk sound and toggle the background
  function playHulkSound() {
      const audio = document.querySelector('#hulkSmash'); // Select audio element
      audio.currentTime = 0; // Reset audio to start
      audio.play(); // Play sound
      toggleBackground(); // Toggle background image
  }

  // Function to toggle the background between two images
  function toggleBackground() {
      if (isBroken) {
          background.style.backgroundImage = 'url(../assets/images/brickwall.png)';
      } else {
          background.style.backgroundImage = 'url(../assets/images/brokenBrickwall.png)';
      }
      isBroken = !isBroken; // Flip state
  }

  // Initialize the preview and saved banners list when the document is ready
  updateBannerPreview();
  updateSavedBannerList();
});