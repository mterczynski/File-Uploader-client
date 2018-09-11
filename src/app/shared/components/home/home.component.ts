import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  private fileList = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(environment.apiUrl + '/files').subscribe((data) => {
      this.fileList = data;
      this.fileList.forEach((file) => {
        file.uploadDate = new Date(new Date(file.uploadDate).getTime());
      });
    });
  }
}
