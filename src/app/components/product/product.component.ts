import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_model/user';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { CategoryLogic } from '../../_model/category-logic';
import { ResponseDetails } from '../../_model/response-details';
import { Product } from '../../_model/product';
import { CategoryView } from '../../_model/category-view';
import { Globals } from '../../globals';

@Component({
  selector: 'app-product',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private globals:Globals
  ) {

    // this.authenticated = auth.isUserAuthenticated();
    // if(this.authenticated)
    //   this.user = auth.getUser();
  }

  authenticated: boolean;
  user: User;

  productID:number;
  product:Product = <Product>{ name: ""}
  imageUrl:string;

  categoryViewID:number;
  categoryView:CategoryView;
  categoryViewsInOrder = [];

  basicFeatures = [];
  productInstallment:number;

  categoryLogic:CategoryLogic;
  date:number = Date.now() + 2 * 24*60*60*1000;
  
  detailFeatureGroups = [];

  ngOnInit(): void {
    this.route.params.subscribe(r => {
      if (r.id == null)
        return;

      let idx = r.id.lastIndexOf("-");
      if(idx == -1)
        return;

      let idPart:string = r.id.substr(idx+1);

      let idTmp:string[] = idPart.split("_");
      if(idTmp.length != 2)
        return;

      this.productID = Number(idTmp[0]);
      this.categoryViewID = Number(idTmp[1]);

      this.getProduct().then(success => {
        if(success) {
          this.productService.getCategory(this.product.categoryLogic.id).then(r2 => {
            if(r2.status == 'success') {
              this.categoryLogic = r2.data;
              this.makeDetailFeatures();
            }
          })
        }
      });

      this.productService.getCategoryViewTreeForID(this.categoryViewID).then(r => {
        if(r.status == 'success') {
          this.categoryView = r.data;
          this.makeNavigationTree(this.categoryView);
        }
      })
    });
  }

  makeDetailFeatures() {
    //this.categoryLogic, this.product, this.detailFeatureGroups
    for(let i=0; i<this.categoryLogic.featureGroups.length; i++) {
      this.detailFeatureGroups.push({
        groupName: this.categoryLogic.featureGroups[i].name,
        groupID: this.categoryLogic.featureGroups[i].id,
        featureBags: []
      });
    }

    for(let i=0; i<this.categoryLogic.featureDefinitions.length; i++) {
      let fd = this.categoryLogic.featureDefinitions[i];

      if(!fd.visible) continue;

      for(let j=0; j<this.detailFeatureGroups.length; j++) {
        let g = this.detailFeatureGroups[j];

        if(g.groupID == fd.featureGroup.id) {
          let values = this.getValuesFromProductForGivenFeatureDefinition(fd.id);

          g.featureBags.push({
            definitionName: fd.name,
            definitionID: fd.id,
            values: values
          });
          break;
        }
      }
    }

    console.log(this.detailFeatureGroups);
  }

  getValuesFromProductForGivenFeatureDefinition(definitionID:number):string {
    var values = "";
    for(let i=0; i<this.product.featureBags.length; i++) {
      let bag = this.product.featureBags[i];

      if(bag.featureDefinition.id == definitionID) {
        for(let j=0; j<bag.featureValues.length; j++) {
          values += bag.featureValues[j].value + ", ";
        }
        values = values.substr(0, values.length-2);
        return values;
      }
    }
    return "not found";
  }

  makeNavigationTree(categoryView:CategoryView) {
    let tree:CategoryView[] = [];

    let node:CategoryView = categoryView;
    do {
      tree.push(node);
      node = node.parent;
    } while(node != null);


    this.categoryViewsInOrder.push({
      name: this.globals.shopNameWithDomain,
      url: "notReadyFeature"
    })

    for(let i=tree.length-1; i>=0; i--) {
      this.categoryViewsInOrder.push({
        name: tree[i].name,
        url: "notReadyFeature"
      });
    }
    console.log(this.categoryViewsInOrder);
  }

  getProduct(): Promise<boolean> {
    return new Promise(resolve => {
      this.productService.getProduct(this.productID).then(r => {
        if (r.status == 'success') {
          this.product = r.data;
          this.makeBasicFeatures();
          this.imageUrl = this.productService.getFullUrlForProductImage(this.product.image.name);

          this.productInstallment = Number(this.product.price) / 40;
          console.log(this.imageUrl);
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
  }

  makeBasicFeatures() {
    for(let i=0; i<this.product.featureBags.length; i++) {
      let loop = this.product.featureBags[i];
      if(!loop.featureDefinition.visible)
        return;

      if(loop.featureDefinition.visibleInList){
        let values = ""
        for(let j=0; j<loop.featureValues.length; j++) { // IS THIS ALWAYS ARRAY? NOT SURE
          values += loop.featureValues[j].value;
          if(j != loop.featureValues.length-1)
            values += ", ";
        }

        this.basicFeatures.push({
          defName: loop.featureDefinition.name,
          values: values
        });
      }
    }
  }
}