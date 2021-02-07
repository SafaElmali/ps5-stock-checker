const Crawler = require("crawler");
const player = require("play-sound")((opts = {}));

const checkProductListed = (err, res, done) => {
  if (err) console.log(err);
  else {
    // $ is Cheerio by default
    //a lean implementation of core jQuery designed specifically for the server
    const $ = res.$;
    // Get 'Add To Chart' button text
    const text = $(".btn-stock").text();

    if (text.includes("SEPETE EKLE")) {
      console.log("Product on SALE! GO GO GO!");
      player.play("ring.mp3", function (err) {
        if (err) throw err;
      });
    } else if (text.includes("ÇOK YAKINDA")) {
      console.log("Product not on sale still..");
    } else if (text.includes("TÜKENDİ")) {
      console.log("You missed it....");
    }else {
      console.log("Couldn't read it...");
    }
    console.log("Checking again...");
  }
  done();
};

const createCrawler = () => {
  const c = new Crawler({
    maxConnections: 10,
    callback: checkProductListed,
  });

  c.queue([
    {
      uri:
        "https://www.vatanbilgisayar.com/sony-playstation-5-digital-surum-oyun-konsolu.html",
    },
  ]);
};

module.exports = {
  createCrawler,
};
