import { Injectable } from '@angular/core';

@Injectable()
export class Themer {

  setTheme(url) {
    const linkTag = document.documentElement.querySelector('#theme') as HTMLLinkElement;
    linkTag.href = url;

    // TODO: update user theme on server - put request?
  }

}
