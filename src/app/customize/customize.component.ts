import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss']
})
export class CustomizeComponent implements OnInit {

  themes = [{
    name: 'Cerulean',
    imgUrl: 'https://bootswatch.com/cerulean/thumbnail.png',
    styleUrl: 'https://bootswatch.com/4/cerulean/bootstrap.min.css'
  }, {
    name: 'Cosmo',
    imgUrl: 'https://bootswatch.com/cosmo/thumbnail.png',
    styleUrl: 'https://bootswatch.com/4/cosmo/bootstrap.min.css'
  }];

  constructor() { }

  ngOnInit() {
  }

}
