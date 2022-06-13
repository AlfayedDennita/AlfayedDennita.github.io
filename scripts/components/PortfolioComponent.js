class PortfolioComponent {
  constructor ({
    title, container, data, maxItem = 3
  }) {
    this._title = title;
    this._container = container;
    this._data = data;
    this._maxItem = maxItem;
    this._totalItemOnList = maxItem;

    this.init();
  }

  init() {
    const heading = document.createElement('h3');
    heading.innerText = `${this._title} Portfolio`;
    this._container.appendChild(heading);

    this._list = document.createElement('ul');
    this._list.classList.add('no-list');
    this._container.appendChild(this._list);

    this.render();
  }

  render() {
    this._list.innerHTML = '';

    for (const [index, item] of this._data.entries()) {
      this._list.innerHTML += this.itemTemplate(item);

      if (index + 1 === this._totalItemOnList) {
        break;
      }
    }

    this._totalItemOnList < this._data.length ? this.renderMoreButton() : this.removeMoreButton();
  }

  itemTemplate(item) {
    let template = `
      <a class="item" href="${item.url}" title="${item.name}">
        <div class="image-container">
          <img src="${item.image_url}" alt="${item.name} Screenshot">
        </div>
        <p>${item.name}</p>
      </a>
    `;

    if (item.reference_url && item.reference_icon) {
      template += `
        <a class="btn-icon" href="${item.reference_url}" rel="nofollow" title="${item.name} Reference">
          <i class="${item.reference_icon}"></i><span>Reference</span>
        </a>
      `;
    }

    return `<li>${template}</li>`;
  }

  renderMoreButton() {
    this.removeMoreButton();

    this._moreButton = document.createElement('button');
    this._moreButton.classList = 'more-button btn';
    this._moreButton.title = 'More Portfolio';
    this._moreButton.innerText = 'More';

    this._container.appendChild(this._moreButton);

    this._moreButton.addEventListener('click', () => {
      this._totalItemOnList += this._maxItem;
      this.render();
    });
  }

  removeMoreButton() {
    if (this._moreButton) {
      this._moreButton.remove();
    }
  }
}

export default PortfolioComponent;
