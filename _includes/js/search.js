(function(){

  function didChangeInput(value) {
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

  function init() {
    var searchInput = document.querySelector(".Search-input");

    // User updates mass in simulation
    searchInput.addEventListener('input', function() {
      didChangeInput(searchInput.value);
    });
  }

  init();

})();