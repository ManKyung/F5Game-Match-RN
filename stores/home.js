import { observable } from "mobx";

const home = observable({
  height: 0,
  num: 0,
  increase() {
    this.num++;
  },
});

export default home;
