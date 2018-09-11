import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Themer {

  setTheme(url) {
    const linkTag = document.querySelector('#theme') as HTMLLinkElement;
    linkTag.href = url;

    // TODO: save user settings on server (put request?)
  }

}
