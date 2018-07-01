import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';
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
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput;
  @ViewChild('tags') tagsInput;

  isModalVisible = false;
  isModalAnimationVisible = false;
  isUploadLinkHovered = false;
  selectedFiles: FileList;
  uploadState: uploadState = uploadState.before;
  uploadPercentage = '0';
  fileList: any[];
  authToken: string = null;
  authEventSubjectSubscription: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    $('#modal').on('hidden.bs.modal', () => {
      this.fileInput.nativeElement.value = '';
    });
    this.authToken = this.authService.getToken();
    this.authEventSubjectSubscription = this.authService.eventSubject.subscribe(() => {
      this.authToken = this.authService.getToken();
    });
  }

  ngOnDestroy() {
    if (this.authEventSubjectSubscription) {
      this.authEventSubjectSubscription.unsubscribe();
    }
  }

  fileInputChange(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0) {
      this.showModal();
    }
  }

  getParsedTagString(tagString: string) {
    return tagString.replace(new RegExp(' ', 'g'), '').split(',').filter((el) => el !== '');
  }

  logOut() {
    this.authService.logOut();
    this.authToken = null;
  }

  onUpload() {
    const tagString = this.tagsInput.nativeElement.value;
    const formData = new FormData();
    Array.from(this.selectedFiles).forEach((file) => {
      formData.append('files[]', file, file.name);
    });

    formData.append('tags', JSON.stringify(this.getParsedTagString(tagString)));

    this.uploadState = uploadState.uploading;

    const req = new HttpRequest('POST', environment.apiUrl + '/fileUpload', formData, {
      reportProgress: true
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
