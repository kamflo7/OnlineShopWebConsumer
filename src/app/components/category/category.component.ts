import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { CategoryLogic } from '../../_model/category-logic';
import { ActivatedRoute } from '@angular/router';
import { NavigationConverter } from '../../_services/navigation-converter.service';
import { NavigationItem } from '../../_dto/navigation-item';
import { FeatureDefinition } from '../../_model/feature-definition';
import { Observable } from 'rxjs/Observable';
import { Product } from '../../_model/product';
import { OrderService } from '../../_services/order.service';
import { FeatureBag } from '../../_model/feature-bag';
import { FeatureValue } from '../../_model/feature-value';

@Component({
  selector: 'app-category',
  templateUrl: 'category.component.html'
})
export class CategoryComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private navigationConverter: NavigationConverter
  ) {
  }

  currentURL: string;
  currentURLFilterParams: string;
  categoryViewID: number;

  navigationItems: NavigationItem[];
  currentNavigationItem: NavigationItem;
  categoryLogic: CategoryLogic;
  filterableDefinitions = []; // {def, values, valuesNgModel}

  products: Product[] = [];
  sort: string;

  lowestPrice: number;
  highestPrice: number;

  selectedLowestPrice: number;
  selectedHighestPrice: number;

  ngOnInit(): void {
    document.title = "Kategoria";
    this.handleURLParams();

    this.route.params.subscribe(r => {
      this.currentURL = 'category/';
      this.currentURL += r.category != null ? r.category + '/' : '';
      this.currentURL += r.subcategory != null ? r.subcategory + '/' : '';
      this.currentURL += r.subcategory2 != null ? r.subcategory2 + '/' : '';
    });
  }

  handleURLParams() {
    this.route.params.subscribe((params) => {
      let param: string = params.subcategory2 != null ? params.subcategory2 : (params.subcategory != null ? params.subcategory : (params.category != null ? params.category : null));
      if (param == null)
        return;

      var idx = param.lastIndexOf("-");
      if (idx == -1)
        return

      param = param.substr(idx + 1);
      this.categoryViewID = Number(param);

      this.productService.getCategoryViews().then(r => {
        if (r.status == 'success') {
          this.navigationItems = this.navigationConverter.convert(r.data);
          this.currentNavigationItem = this.navigationConverter.searchNodeByID(this.categoryViewID, this.navigationItems);
          if (this.currentNavigationItem != null) {
            this.getCategoryLogicThen(this.currentNavigationItem.categoryLogic.id);
          }
        }
      });
    });
  }


  getCategoryLogicThen(id: number) {
    this.productService.getCategory(this.currentNavigationItem.categoryLogic.id).then(r2 => {
      if (r2.status == 'success') {
        this.categoryLogic = r2.data;
        this.filterableDefinitions = [];
        for (let i = 0; i < this.categoryLogic.featureDefinitions.length; i++) {
          if (this.categoryLogic.featureDefinitions[i].filterable) {
            this.filterableDefinitions.push({
              def: this.categoryLogic.featureDefinitions[i],
              values: this.categoryLogic.featureDefinitions[i].featureValueDefinitions,
              valuesNgModel: []
            });
          }
        }

        this.getPriceRange();
        this.getProducts();
      }
    });
  }

  getPriceRange() {
    this.productService.getPriceRange(this.categoryLogic.id).then(r => {
      if (r.status == 'success') {
        this.lowestPrice = Number(r.data['item1']);
        this.highestPrice = Number(r.data['item2']);

        this.selectedLowestPrice = this.selectedLowestPrice > 0 ? this.selectedLowestPrice : this.lowestPrice;
        this.selectedHighestPrice = this.selectedHighestPrice > 0 ? this.selectedHighestPrice : this.highestPrice;
        // console.log('[getPriceRange:] lowest: ' + this.lowestPrice + '; highest: ' + this.highestPrice);
      }
    });
  }

  readURLFiltersAndAssignToNGModel(): Promise<boolean> {
    return new Promise(resolve => {
      this.route.queryParams.subscribe(result => {
        if (result.f != null) {
          this.currentURLFilterParams = result.f;
          let urlFilters: string[] = result.f.split(","); // %d-%d,%d-%d.%d.%d,prc-100.0_5000.0
          for (let i = 0; i < urlFilters.length; i++) { // iterate over URL filter segments
            let loopFilter = urlFilters[i];

            let eachFilter: string[] = loopFilter.split("-");

            if (eachFilter[0] == 'prc') {
              let range:Array<string> = eachFilter[1].split("_");
              if(range.length == 2) {
                this.selectedLowestPrice = Number(range[0]);
                this.selectedHighestPrice = Number(range[1]);
                // console.log('[readURLFiltersAndAssignToNGModel:] lowest: ' + this.selectedLowestPrice + '; highest: ' + this.selectedHighestPrice);
              }
            } else {
              let filterDefID = Number(eachFilter[0]);

              for (let j = 0; j < this.filterableDefinitions.length; j++) { // iterate over FilterableDefinitions
                if (filterDefID == this.filterableDefinitions[j].def.id) {
                  let filterValues: string[] = eachFilter[1].split(".");
                  this.filterableDefinitions[j].valuesNgModel = [];

                  for (let k = 0; k < filterValues.length; k++) {  // iterate over URL filter segment assigned values
                    let valueID = Number(filterValues[k]);

                    for (let h = 0; h < this.filterableDefinitions[j].values.length; h++) { // iterate over current FilterableDefinition's values
                      if (valueID == this.filterableDefinitions[j].values[h].id) {
                        this.filterableDefinitions[j].valuesNgModel.push(valueID);
                      }
                    }
                  }
                }
              }
            }
            // end for
          }
        }

        if (result.s != null) {
          this.sort = (result.s == 'prc-asc' || result.s == 'prc-desc') ? result.s : null;
        }
        resolve(true);
      });
    });
  }

  getProducts() { // called automatically after fully loading page
    this.readURLFiltersAndAssignToNGModel().then(r => {
      let sortstr = this.sort == 'prc-asc' || this.sort == 'prc-desc' ? this.sort : null;
      this.productService.getProducts(this.categoryLogic.id, this.currentURLFilterParams, sortstr).then(r => {
        this.products = r.data;
      });
    });
  }

  doFilter() {
    let url = this.currentURL;
    let params = this.getFilterParamsQueryFromNGModel();
    // console.log('[btn::doFilter() params: ' + params);

    this.router.navigate([url], { queryParams: { f: params } }).then(r => {
      this.getProducts();
    });
  }

  doSort() {
    let url = this.currentURL;
    let params = this.getFilterParamsQueryFromNGModel();
    let sortParams = (this.sort == 'prc-asc' || this.sort == 'prc-desc') ? this.sort : null;

    let queryParams = sortParams ? { f: params, s: sortParams } : { f: params };
    this.router.navigate([url], { queryParams: queryParams }).then(r => {
      this.getProducts();
    });
  }

  doClearFilters() {
    let url = this.currentURL;
    this.router.navigate([url]).then(r => {
      for (let i = 0; i < this.filterableDefinitions.length; i++) {
        this.filterableDefinitions[i].valuesNgModel = [];
      }

      this.currentURLFilterParams = null;
      this.getProducts();
    });
  }

  getFilterParamsQueryFromNGModel() {
    let params: string = '';

    for (let i = 0; i < this.filterableDefinitions.length; i++) {
      let loopDef = this.filterableDefinitions[i];

      if (typeof loopDef.valuesNgModel === 'object') { // if selected filter values are ARRAY
        if (loopDef.valuesNgModel.length == 0) continue;
        params += loopDef.def.id + "-";
        for (let j = 0, max = loopDef.valuesNgModel.length; j < max; j++) {
          params += loopDef.valuesNgModel[j] + (j != max - 1 ? '.' : '');
        }
      } else {  // if just single value
        if (loopDef.valuesNgModel > 0) {
          params += loopDef.def.id + "-" + loopDef.valuesNgModel
        }
      }

      params += ',';
    }


    params += 'prc-' + this.selectedLowestPrice + '_' + this.selectedHighestPrice;
    // return params.substr(0, params.length - 1); // trim the last comma
    return params;
  }

}