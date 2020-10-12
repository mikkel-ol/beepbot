import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  @Input()
  multiple = true;

  @Input()
  disabled = false;

  private onChange?: (files: FileList) => void;
  private onTouched?: () => void;

  setFiles(files: FileList) {
    if (this.onChange) {
      this.onChange(files);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }

  registerOnChange(fn: (files: FileList) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(files: FileList): void {
    // HTML file inputs are readonly
  }
}
