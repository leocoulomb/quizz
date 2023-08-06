import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unescape',
})
export class UnescapePipe implements PipeTransform {
  /**
   * Parse encoded char into readable values
   * @param value
   * @returns
   */
  transform(value: string | undefined): string | null {
    const doc = new DOMParser().parseFromString(value!, 'text/html');
    return doc.documentElement.textContent;
  }
}
