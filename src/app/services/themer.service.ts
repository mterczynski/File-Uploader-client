import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Themer {
  setTheme(url: string) {
    const linkTag = document.querySelector('#theme') as HTMLLinkElement;
    linkTag.href = url;

    // TODO: save user settings in local storage and on server if user is logged in
  }
}
