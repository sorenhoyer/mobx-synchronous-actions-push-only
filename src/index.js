import React from "react";
import { render } from "react-dom";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class AppState {
  @observable arr = [];

  constructor() {
    let self = this;
    let i = 0;
    const keys = ["key1", "key2", "key3", "key4", "key5"];
    setInterval(() => {
      for (let key of keys) {
        if (i < 100) {
          i++;
          self.pushToArr(key);
        }
      }
    }, 1000);
  }

  @action
  pushToArr(key) {
    let self = this;
    setTimeout(function() {
      self.arr.push(key);
      console.log(self.arr);
    }, (Math.floor(Math.random() * 6) + 1) * 1000);
  }
}

const appState = new AppState();

const MyComponent = observer(({ appState }) => {
  return (
    <ul>
      {appState.arr.map(item => {
        return <li>{item}</li>;
      })}
    </ul>
  );
});

render(
  <div>
    <MyComponent appState={appState} />
    <DevTools />
  </div>,
  document.getElementById("root")
);
