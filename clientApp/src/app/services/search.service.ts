import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  filterItemsWithName(items, searchTerm) {
    return items.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  filterItemsWithCategory(items, searchTerm) {
    return items.filter(item => {
      return item.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
