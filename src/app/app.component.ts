import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('fileInput') fileInput;

  isModalVisible = false;
  isModalAnimationVisible = false;
  isUploadLinkHovered = false;
  selectedFiles: FileList;

  constructor(private http: HttpClient) {}

  fileInputChange(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0) {
      this.showModal();
    }
  }

  onUpload() {
    const formData = new FormData();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    Array.from(this.selectedFiles).forEach((file) => {
      formData.append('files[]', file, file.name);
    });
    this.http.post('http://localhost/fileUpload', formData, httpOptions).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.error(err);
    });
  }

  preventDefault(event) {
    event.preventDefault();
  }

  showModal() {
    $('#modal').modal();
  }

  uploadLinkMouseleave() {
    this.isUploadLinkHovered = false;
  }

  uploadLinkMouseover() {
    this.isUploadLinkHovered = true;
  }

}
