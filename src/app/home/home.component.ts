import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
declare let $: any; // jquery for bootstrap

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('fileInput') fileInput;

  isModalVisible = false;
  isModalAnimationVisible = false;
  selectedFiles: File[] = [];
  selectedFileIndex = 3;
  fileList = [];
  serverUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.serverUrl + '/files').subscribe((data) => {
      this.fileList = <any[]>data;
      this.fileList.forEach((file) => {
        // const offset = 60000 * (new Date().getTimezoneOffset());
        file.uploadDate = new Date(new Date(file.uploadDate).getTime());
      });
    });
  }

  comparePaginatorIndex(index: number) {
    if (index === this.selectedFileIndex) {
      return true;
    } else {
      return false;
    }
  }

  showModal() {
    $('#modal').modal();
  }

  fileInputChange(event) {
    this.selectedFiles = event.target.files;
    this.showModal();
  }

  preventDefault(event) {
    event.preventDefault();
  }
}
