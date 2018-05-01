import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-ext-icon',
  template: ``,
  styleUrls: ['extIcons.scss']
})
export class ExtIconComponent {
  @Input() fileName: string;
  @HostBinding('class.extIcon') true;
}
