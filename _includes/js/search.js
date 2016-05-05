(function(){
  var searchInput,
    searchClearIcon,
    searchIcon,
    footerSpacer;

  var searchModule = (function() {
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
        element.className += ' isHidden';
      }
    }

    function itemSynonyms(item) {
      var dataAttribute = item.getAttribute('data-synonyms');

      if (dataAttribute !== null) {
        return prepareTextForCompare(dataAttribute);
      }

      return null;
    }

    // Returns true if the given word matches the item text or a synonym
    function doesWordMatch(itemText, synonyms, word) {
      return itemText.indexOf(word) > -1 || (synonyms !== null && synonyms.indexOf(word) > -1);
    }

    // Returns true if ALL words are present in the item.
    function doesItemMatch(item, words) {
      var itemName = item.querySelector('.List-itemName'),
        itemText = prepareTextForCompare(itemName.innerHTML),
        synonyms = itemSynonyms(item);

      for (var i = 0; i < words.length; ++i) {
        var word = words[i];
        if (word === '') { continue; }
        if (!doesWordMatch(itemText, synonyms, word)) { return false; }
      }

      return true;
    }

    // Goes through all the product items and hides those that do not match the search text
    function doSearch(searchText) {
      showHideClearIcon(searchText.length > 0);
      searchText = prepareTextForCompare(searchText);

      var words = searchText.split(' '),
        items = document.querySelectorAll('.List-item');

      for(var i=0; i < items.length; i++) {
        var item = items[i];
        var showItem = doesItemMatch(item, words);
        showElement(item, showItem, 'List-item');
      }
    }

    return {
      doSearch: doSearch
    };
  })();

  function loadElements() {
    searchInput = document.querySelector('.Search-input');
    searchIcon = document.querySelector('.Search-icon');
    searchClearIcon = document.querySelector('.Search-clearIcon');
    footerSpacer = document.querySelector('.Footer-spacer');
  }

  function init() {
    loadElements();

    searchInput.addEventListener('input', function() {
      searchModule.doSearch(searchInput.value);
    });

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
    searchClearIcon.className = 'Search-clearIcon';

    if (!show) {
      searchClearIcon.className += ' isVisibilityHidden';
    }
  }

  function didClickClear() {
    searchInput.value = '';
    searchModule.doSearch(''); // Search for empty string to show all the items
  }

  init();

})();