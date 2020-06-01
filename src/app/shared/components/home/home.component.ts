import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FileService } from '../../services/file.service';
import { ApplicationFile } from '../../types/application-file';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  fileList: ApplicationFile[] = [];
  private serverUrl = environment.apiUrl;
  private subscriptions: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private fileService: FileService,
  ) { }

  ngOnInit() {
    const fileStreamSub = this.fileService.files.subscribe(files => this.fileList = files);

    this.fileService.requestFilesUpdate();
    this.subscriptions.push(fileStreamSub);
  }

  onDeleteButtonClick(removedFile: ApplicationFile) {
    this.http.post(this.serverUrl + `/files/remove/${removedFile.id}`, {}).subscribe(data => {
      this.fileList = this.fileList.filter(file => file.id !== removedFile.id);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
