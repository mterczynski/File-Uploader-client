import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { FileService } from './services/file.service';
import { getFileTagList } from 'app/utils';

declare var $: any;

enum UploadState {
  before = 'before',
  uploading = 'uploading',
  finished = 'finished',
  error = 'error',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput;
  @ViewChild('tags') tagsInput;

  isUploadLinkHovered = false;
  selectedFiles: FileList | undefined;
  uploadState = UploadState.before;
  uploadPercentage = '0';
  authToken: AuthToken | null = null;
  authEventSubjectSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private fileService: FileService,
  ) {}

  ngOnInit() {
    $('#modal').on('hidden.bs.modal', () => {
      this.fileInput.nativeElement.value = '';
    });
    this.authToken = this.authService.getToken();
    this.authEventSubjectSubscription = this.authService.authEvents.subscribe(() => {
      this.authToken = this.authService.getToken();
    });
  }

  ngOnDestroy() {
    if (this.authEventSubjectSubscription) {
      this.authEventSubjectSubscription.unsubscribe();
    }
  }

  onFileInputChange(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length > 0) {
      this.showModal();
    }
  }

  logOut() {
    this.authService.logOut();
    this.authToken = null;
  }

  onUpload() {
    const tagString = this.tagsInput.nativeElement.value;
    const tags = getFileTagList(tagString);

    this.uploadState = UploadState.uploading;

    this.fileService.getUploadFilesRequest({tags, selectedFiles: this.selectedFiles})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadPercentage = (100 * event.loaded / event.total).toFixed(2);
        } else if (event instanceof HttpResponse) {
          this.uploadState = UploadState.finished;
        }
      }, (err) => {
        console.error(err);
        this.uploadState = UploadState.error;
      });
  }

  showModal() {
    $('#modal').modal();
    this.uploadState = UploadState.before;
    this.uploadPercentage = '0';
  }

  onUploadLinkMouseLeave() {
    this.isUploadLinkHovered = false;
  }

  onUploadLinkMouseOver() {
    this.isUploadLinkHovered = true;
  }

}
