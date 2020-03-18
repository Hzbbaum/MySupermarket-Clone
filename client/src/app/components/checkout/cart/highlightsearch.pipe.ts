import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlightsearch"
})
export class HighlightsearchPipe implements PipeTransform {
  transform(value: string, args: string): any {
    if (!args) {
      return value;
    }
    var re = new RegExp(args, "gi"); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.replace(re, "<mark>$&</mark>");
  }
}
