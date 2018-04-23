import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

  afterModalClose() {
    console.log('after modal close');
    console.log(this.fileInput.nativeElement);
  }

  comparePaginatorIndex(index: number) {
    if (index === this.selectedFileIndex) {
      return true;
    } else {
      return false;
    }
  }

  // triggerInputClick() {
  //   const event = new MouseEvent('click', {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true
  //   });
  //   // event.eventName = 'click';

  //   var cancelled = !this.fileInput.nativeElement.dispatchEvent(event);
  //   if (cancelled) {
  //     // A handler called preventDefault.
  //     alert("cancelled");
  //   } else {
  //     // None of the handlers called preventDefault.
  //     alert("not cancelled");
  //   }
  // }

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
