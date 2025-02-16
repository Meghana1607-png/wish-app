import { Component } from '@angular/core';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {
  searchTerm : string = '';
  items : string[] = ['Rohit','Lohith','042','049'];
  filteredItems: any;

getfilteredItems() {
  return this.items.filter(item =>
    item.toLowerCase().includes(this.searchTerm.toLowerCase()));
}
}
