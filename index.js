const Crawler = require("crawler");

const c = new Crawler({
  maxConnections: 10,
  callback: (error, res, done) => {
    if (error) console.log(error);
    else {
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      const $ = res.$;

      // Get 'Add To Chart' button's parent div
      const buttonParentDiv = $(
        "body > main > div.container-fluid.wrapper-linear > div > div > div > div > div.col-xs-12.col-sm-12.col-md-12.col-lg-6.pd-right > div.container-fluid > div > div > div.d-table.hidden-xs > div.d-cell.product-button--cell"
      );

      // Get 'Add To Chart' button
      const productButton = buttonParentDiv[0].childNodes.find(
        (node) => node.name === "button"
      );

      /*
       * Check button has basket class
       * If it has basket class that means it is on sale
       * Otherwise, the product not listed for sale still..
       */
      const hasBasketBTNclass = productButton.attribs.class.includes(
        "basketBTN"
      );
      if (hasBasketBTNclass) console.log("Product on SALE! GO GO GO!");
      else console.log("Still coming soon....");
    }
    done();
  },
});

c.queue([
  {
    uri:
      "https://www.vatanbilgisayar.com/sony-playstation-5-digital-surum-oyun-konsolu.html",
  },
]);