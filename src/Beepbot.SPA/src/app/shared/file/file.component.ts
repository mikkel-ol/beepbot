import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnChanges {
  @Input()
  file: File;

  fileUrl = '';

  constructor() {}

  ngOnChanges() {
  }
}
