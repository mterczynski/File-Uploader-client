import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExtensionService {

  constructor() { }

  getLongestExtension(fileName: string) {
    return '';
  }

  getShortestExtension(fileName: string) {
    return '';
  }

  getFileIconPath(fileName: string) {
    return '';
  }
}
