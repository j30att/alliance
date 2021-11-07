import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private SECTION_NAME = 'alliance';

  storage: any = {};

  constructor() {
    this.init();
  }

  init() {
    this.storage = JSON.parse(localStorage.getItem(this.SECTION_NAME)) || {};
  }

  set(key: string, value: any) {
    this.storage[key] = value;
    this.update();
  }

  get(key: string) {
    return this.storage[key];
  }

  update() {
    localStorage.setItem(this.SECTION_NAME, JSON.stringify(this.storage));
  }
}
