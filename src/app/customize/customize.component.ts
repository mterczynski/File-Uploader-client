import { Component } from '@angular/core';
import { Themer } from '../shared/services/themer.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent {

  themes = [{
    name: 'Cerulean',
    imgUrl: 'https://bootswatch.com/cerulean/thumbnail.png',
    themeUrl: './assets/bootstrap/cerulean.min.css'
  }, {
    name: 'Cosmo',
    imgUrl: 'https://bootswatch.com/cosmo/thumbnail.png',
    themeUrl: './assets/bootstrap/cosmo.min.css'
  }];

  constructor(
    private themer: Themer
  ) { }

  changeTheme(url) {
    this.themer.setTheme(url);
  }

}
