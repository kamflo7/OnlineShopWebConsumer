import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../_services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryLogic } from '../../../../_model/category-logic';

@Component({
  selector: 'app-admin-category-edit',
  templateUrl: './admin-category-edit.component.html',
  styleUrls: ['./admin-category-edit.component.css']
})
export class AdminCategoryEditComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  id: number;
  category: CategoryLogic;

  editingName: boolean;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.loadCategory(this.id);
    });
  }

  loadCategory(id: number): void {
    this.productService.getCategory(id).then(r => {
      if (r.status == 'success') {
        this.category = r.data;
      } else {
        alert("There was a problem with loading the CategoryLogic")
      }
    });
  }

  nameChange(newName) {
    console.log("start updating name");
    this.productService.updateCategory(this.id, newName).then(r => {
      if(r.status == 'success') {
        this.category.name = newName;
      } else {
        alert("There was a problem with editing category name");
      }
    });
  }
}
