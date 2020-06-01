import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApplicationFile } from '../types/application-file';

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
}
