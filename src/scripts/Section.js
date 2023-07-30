export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
    }
    renderItems() {
        this._items.forEach((item) => this.renderItem(item));
     }
     addItem(element) {
        this._container.append(element);
     }
     renderItem(item) {
        this.addItem(this._renderer(item));
     }
}