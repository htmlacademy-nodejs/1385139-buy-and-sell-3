'use strict';
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const {ExitCode} = require(`../../const`);

const DEFAULT_COUNT = 1;
const MAX_OFFERS_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16
};

const getPictureFileName = (number) => number >= 10 ? `item${number}.jpg` : `item0${number}.jpg`;

const getRandomCategory = () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: [...new Set(Array(getRandomInt(1, CATEGORIES.length)).fill({}).map(getRandomCategory))],
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > MAX_OFFERS_COUNT) {
      console.info(chalk.red(`No more than ${MAX_OFFERS_COUNT} offers.`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
