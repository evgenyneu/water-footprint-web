(function(){
  var searchInput;
  var searchClearIcon;
  var searchIcon;


  function didChangeInput(value) {
    showHideClearIcon(value.length > 0);
    value = value.toLowerCase();
    var items = document.querySelectorAll(".List-item");

    for(var i=0; i < items.length; i++) {
      var item = items[i];
      var itemName = item.querySelector(".List-itemName");
      var itemText = itemName.innerHTML.toLowerCase();

      var dataAttribute = item.getAttribute("data-synonyms");

      if (itemText.indexOf(value) > -1 ||
        (dataAttribute && dataAttribute.toLowerCase().indexOf(value) > -1)) {

        item.className = "List-item";
      } else {
        item.className = "List-item isHidden";
      }
    }
  }



  function loadElements() {
    searchInput = document.querySelector(".Search-input");
    searchIcon = document.querySelector(".Search-icon");
    searchClearIcon = document.querySelector(".Search-clearIcon");
  }

  function init() {
    loadElements();

    // User updates mass in simulation
    searchInput.addEventListener('input', function() {
      didChangeInput(searchInput.value);
    });


    searchClearIcon.onclick = didClickClear;
    searchIcon.onclick = didClickSearchIcon;
  }

  // Search icon
  // --------------

  function didClickSearchIcon() {
    searchInput.focus();
  }

  // Clear icon
  // --------------

  function showHideClearIcon(show) {
    searchClearIcon.className = "Search-clearIcon";

    if (!show) {
      searchClearIcon.className += " isVisibilityHidden";
    }
  }

  function didClickClear() {
    searchInput.value = '';
    didChangeInput('');
  }

  init();

})();