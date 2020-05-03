import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  fileList = [];
  private serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(this.serverUrl + '/files').subscribe((data) => {
      this.fileList = data;

      this.fileList.forEach((file) => {
        file.uploadDate = new Date(new Date(file.uploadDate).getTime());
      });
    });
  }

  onDeleteButtonClick(removedFile: any) {
    this.http.post(this.serverUrl + `/files/remove/${removedFile._id}`, {}).subscribe(data => {
      this.fileList = this.fileList.filter(file => file._id !== removedFile._id);
    });
  }
}
