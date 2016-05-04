(function(){
  var searchInput;
  var searchClearIcon;
  var searchIcon;
  var footerSpacer;

  // Show/hide element
  function showElement(element, show, className) {
    element.className = className;

    if (!show) {
      element.className += " isHidden";
    }
  }

  function didChangeInput(value) {
    showHideClearIcon(value.length > 0);
    value = value.toLowerCase();
    var items = document.querySelectorAll(".List-item");
    var numberOfElementMatched = 0;

    for(var i=0; i < items.length; i++) {
      var item = items[i];
      var itemName = item.querySelector(".List-itemName");
      var itemText = itemName.innerHTML.toLowerCase();

      var dataAttribute = item.getAttribute("data-synonyms");

      var showItem = itemText.indexOf(value) > -1 ||
        (dataAttribute && dataAttribute.toLowerCase().indexOf(value) > -1);

      if (showItem) {
        numberOfElementMatched += 1;
      }

      showElement(item, showItem, "List-item");
    }(value);
  }

  function didFocusSearchInput() {
    scrollSearchInputToTop();
  }

  function scrollSearchInputToTop() {
    var searchInputTop = searchInput.getBoundingClientRect().top;
    var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;

    if (searchInputTop > 0 && Math.abs(searchInputTop) > 30) {
      window.scrollTo(0, searchInputTop + scrollTop - 10);
    }
  }

  function loadElements() {
    searchInput = document.querySelector(".Search-input");
    searchIcon = document.querySelector(".Search-icon");
    searchClearIcon = document.querySelector(".Search-clearIcon");
    footerSpacer = document.querySelector(".Footer-spacer");
  }

  function init() {
    loadElements();

    searchInput.addEventListener('input', function() {
      didChangeInput(searchInput.value);
    });

    searchInput.onfocus = didFocusSearchInput;

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