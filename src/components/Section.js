export default class Section {
    constructor({ items, renderer }, cardSelector) {  
      this._items = items;    
      this._renderer = renderer;
      this._container = document.querySelector(cardSelector);
    }
  
    addItems(items) {
        items.append().forEach(item => this.addItem(item));
    }
  
    addItem(item) {
      this._container.prepend(this._renderer(item));
    }
  }
