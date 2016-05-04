(function(){
  var searchInput,
    searchClearIcon,
    searchIcon,
    footerSpacer;


  // Replace accent characters with normal ones
  function removeDiacriticMarks(text) {
    return text.replace('ё', 'е');
  }

  // Comverts text to lower case and removes diacritic marks
  function prepareTextForCompare(text) {
    return removeDiacriticMarks(text).toLowerCase().trim();
  }


  // Show/hide element
  function showElement(element, show, className) {
    element.className = className;

    if (!show) {
      element.className += " isHidden";
    }
  }

  function itemSynonyms(item) {
    var dataAttribute = item.getAttribute('data-synonyms');

    if (dataAttribute !== null) {
      return prepareTextForCompare(dataAttribute);
    }

    return null;
  }



  function doSearch(value) {
    showHideClearIcon(value.length > 0);
    value = prepareTextForCompare(value);
    var items = document.querySelectorAll(".List-item");

    for(var i=0; i < items.length; i++) {
      var item = items[i],
        itemName = item.querySelector(".List-itemName"),
        itemText = prepareTextForCompare(itemName.innerHTML),
        synonyms = itemSynonyms(item);

      var showItem = itemText.indexOf(value) > -1 ||
        (synonyms !== null && synonyms.indexOf(value) > -1);

      showElement(item, showItem, "List-item");
    }
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
      doSearch(searchInput.value);
    });

    searchInput.onfocus = didFocusSearchInput;

    searchClearIcon.onclick = didClickClear;
    searchIcon.onclick = didClickSearchIcon;

    document.onkeydown = didPressKey;
  }

  function didPressKey(evt) {
    // Clear the search text box when Escape is pressed
    evt = evt || window.event;
    if (evt.keyCode == 27) { didClickClear(); }
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
    doSearch('');
  }

  init();

})();