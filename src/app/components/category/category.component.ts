import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryLogic } from '../../model/category-logic';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }


  ngOnInit(): void {
    document.title = "Kategoria";
    this.route.params.subscribe((params) => {
      console.log("Category: " + params.category + "; Sub: " + params.subcategory + "; Sub2: " + params.subcategory2);
      // this.username = params.username
    });
  }
}