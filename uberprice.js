

class UberPrice {
  constructor() {
    this.interval = null;
    this.prices = [];
    this.pages = 0;
    this.lastTrip = null;
  }

  getNextButton() {
    return $('.btn.pagination__next');
  }

  getLastTrip() {
    return $('#trips-table tbody tr:nth-last-child(2)')
      .children()
      .map((i, e) => e.innerHTML)
      .toArray()
      .join();
  }

  getSum(currency = 'UAH') {
    return this.prices.filter(p => p.indexOf(currency) !== -1)
      .map(p => p.slice(3)).map(parseFloat)
      .reduce((acc, x) => acc + x, 0);
  }

  parse() {
    const currentPrices = $('td.text--right')
      .map((i, e) => e.innerHTML)
      .filter((k,e) => e.indexOf('Canceled') === -1)
      .toArray()
      .map(price => price.match(/[A-Z]{3}.*/g))
      .filter(e => e)
      .map(p => p[0]);

    this.lastTrip = this.getLastTrip();
    this.prices = this.prices.concat(currentPrices);
  }

  nextPage() {
    const page = window.location.href;
    const $button = this.getNextButton();

    $button.click();

    console.log('PAGE: ', page);

    this.interval = setInterval(
      () => {
        if (window.location.href !== page) {
          clearInterval(this.interval);
          setTimeout(() => {
            this.run();
          }, 1000);
        }
      }, 300);
  }

  incrementPages() {
    this.pages += 1;
  }

  run() {
    this.parse();
    this.incrementPages();
    this.nextPage();
  }
}

const p = new UberPrice();

p.run();
