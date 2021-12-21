import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    this._loading = document.querySelector(".progress");

    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = this._render({
      name: "Placeholder",
      terrain: "placeholder",
      population: 0,
    });

    this._load();

    document.body.querySelector(".main").appendChild(box);

    this.emit(Application.events.READY);
  }

  _render({ name, terrain, population }) {
    return `
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64">
          <img src="${image}" alt="planet">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
        <h4>${name}</h4>
          <p>
            <span class="tag">${terrain}</span> <span class="tag">${population}</span>
            <br>
          </p>
        </div>
      </div>
    </article>
    `;
  }

  async _load() {
    let urls = [
      `https://swapi.boom.dev/api/planets`,
      `https://swapi.boom.dev/api/planets?page=2`,
      `https://swapi.boom.dev/api/planets?page=3`,
      `https://swapi.boom.dev/api/planets?page=4`,
      `https://swapi.boom.dev/api/planets?page=5`
    ]; 

    const responses = await Promise.all(
      urls.map(url => fetch(url).then(res => res.json()))
    );
  }

  _create() {

  }

  _startLoading() {

  }

  _stopLoading() {

  }
}
