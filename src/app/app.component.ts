import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
declare var $: any;

enum uploadState {
  before = 'before',
  uploading = 'uploading',
  finished = 'finished',
  error = 'error'
}

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
  uploadState: uploadState = uploadState.before;
  uploadPercentage = '0';

  constructor(private http: HttpClient) {}

  fileInputChange(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0) {
      this.showModal();
    }
  }

  onUpload() {
    const formData = new FormData();
    Array.from(this.selectedFiles).forEach((file) => {
      formData.append('files[]', file, file.name);
    });

    this.uploadState = uploadState.uploading;

    const req = new HttpRequest('POST', 'http://localhost/fileUpload', formData, {
      reportProgress: true,
    });

    this.http.request(req).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadPercentage = (100 * event.loaded / event.total).toFixed(2);
      } else if (event instanceof HttpResponse) {
        this.uploadState = uploadState.finished;
      }
    }, (err) => {
      console.error(err);
      this.uploadState = uploadState.error;
    });
  }

  preventDefault(event) {
    event.preventDefault();
  }

  showModal() {
    $('#modal').modal();
    this.uploadState = uploadState.before;
    this.uploadPercentage = '0';
  }

  uploadLinkMouseleave() {
    this.isUploadLinkHovered = false;
  }

  uploadLinkMouseover() {
    this.isUploadLinkHovered = true;
  }

}
