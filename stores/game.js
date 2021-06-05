import { observable, runInAction } from "mobx";

const loadImage = [
  require("../assets/images/0.png"),
  require("../assets/images/1.png"),
  require("../assets/images/2.png"),
  require("../assets/images/3.png"),
  require("../assets/images/4.png"),
  require("../assets/images/5.png"),
  require("../assets/images/6.png"),
  require("../assets/images/7.png"),
  require("../assets/images/8.png"),
  require("../assets/images/9.png"),
  require("../assets/images/10.png"),
  require("../assets/images/11.png"),
  require("../assets/images/12.png"),
  require("../assets/images/13.png"),
  require("../assets/images/14.png"),
  require("../assets/images/15.png"),
  require("../assets/images/16.png"),
  require("../assets/images/17.png"),
  require("../assets/images/18.png"),
  require("../assets/images/19.png"),
  require("../assets/images/20.png"),
  require("../assets/images/21.png"),
  require("../assets/images/22.png"),
  require("../assets/images/23.png"),
  require("../assets/images/24.png"),
];

const items = [];
for (let i = 0; i < 16; i += 1) {
  items.push({
    id: i,
    image: require("../assets/favicon.png"),
    active: false,
    number: 0,
  });
}

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getRandomNumber = (min, max) => {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
};

const getImage = () => {
  let imageItems = [];
  while (imageItems.length !== 8) {
    const randomNumber = getRandomNumber(0, 25);
    if (!imageItems.includes(randomNumber)) {
      imageItems.push(randomNumber);
    }
  }

  return imageItems;
};

const game = observable({
  items: items,

  setActive(key, active) {
    this.items[key].active = active;
  },

  setNumber(key, number) {
    this.items[key].number = number;
  },

  setImageAndShuffle() {
    const randomImageItems = getImage();
    const length = this.items.length;
    let j = 0;
    for (let i = 0; i < length; i++) {
      this.items[i].image = loadImage[randomImageItems[j]];
      this.setNumber(i, randomImageItems[j]);
      j++;
      if (randomImageItems.length - 1 === i) {
        j = 0;
      }
    }
    this.items = shuffle(this.items);
  },

  getItems() {
    this.setImageAndShuffle();
    return this.items;
  },

  isClear() {
    const e = this.items.filter((item) => item.active === false);
    return e.length === 0 ? true : false;
  },
});

export default game;
