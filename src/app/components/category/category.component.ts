import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Category } from '../../model/category';
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

  category: string;

  ngOnInit(): void {
    document.title = "Kategoria";
    this.route.params.subscribe((params) => {
      this.category = params.category;
      console.log("Kategoria to " + this.category);
      // this.username = params.username
    });
  }
}