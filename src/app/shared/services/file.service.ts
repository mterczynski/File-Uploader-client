import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicationFile } from '../types/application-file';
import {tap} from 'rxjs/operators';

interface FileFromServer {
  _id: string;
  name: string;
  tags: string[];
  size: number;
  uploadDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private readonly _files = new BehaviorSubject<ApplicationFile[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

  get files () {
    return this._files.asObservable();
  }

  requestFilesUpdate() {
    this.http.get<FileFromServer[]>(`${environment.apiUrl}/files`).subscribe(newFiles => {
      const parsedFiles = newFiles.map(file => ({
        ...file,
        id: file._id,
        uploadDate: new Date(new Date(file.uploadDate).getTime()),
      }));

      this._files.next(parsedFiles);
    });
  }

  removeFile(removedFile: ApplicationFile) {
    this.http.post(environment.apiUrl + `/files/remove/${removedFile.id}`, {}).subscribe(() => {
      const filesBeforeDeletion = this._files.getValue();
      const filteredFiles = filesBeforeDeletion.filter(file => file.id !== removedFile.id);

      this._files.next(filteredFiles);
    });
  }

  getUploadFilesRequest({tags, selectedFiles}: {
    tags: string[],
    selectedFiles: FileList,
  }) {
    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append('files[]', file, file.name);
    });
    formData.append('tags', JSON.stringify(tags));

    const req = new HttpRequest('POST', environment.apiUrl + '/fileUpload', formData, {
      reportProgress: true,
    });

    return this.http.request(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.requestFilesUpdate();
        }
      }),
    );
  }
}
