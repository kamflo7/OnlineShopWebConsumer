import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductService } from '../../../../_services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ProductDTO, HashNumberOfListNumbers } from '../../../../_dto/product-dto';
import { Product } from '../../../../_model/product';
import { FeatureBag } from '../../../../_model/feature-bag';
import { CategoryLogic } from '../../../../_model/category-logic';
import { Observable } from 'rxjs/Observable';
import { Globals } from '../../../../globals';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public dialog: MatDialog,
    private globals: Globals,
    public snackBar: MatSnackBar
  ) {

  }

  staticTitle: string;

  mode: Mode;
  productid: number;
  productDTO: ProductDTO;
  categoryLogic: CategoryLogic;

  features;
  categories;
  category;


  base64textString: string = "";
  base64ToSend: string;

  imageChanged: boolean;

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    // this.base64textString= btoa(binaryString);
    this.base64ToSend = btoa(binaryString);
    this.base64textString = "data:image/jpeg;base64," + this.base64ToSend;
    this.imageChanged = true;
    // console.log(btoa(binaryString));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id != 'createNew') { // if URL has productid:number - edit mode
        this.mode = 0;
        this.productid = params.id;
        this.staticTitle = "Edit product";

        this.productService.getProduct(this.productid).then(r => {
          if (r.status == 'success') {
            let product: Product = r.data;
            if (r.data.image != null) {
              this.base64textString = this.globals.resourceImgsUrl + r.data.image.id;
            }
            this.productDTO = this.convertProductToProductDTO(product);
            this.loadCategory(product.categoryLogic.id, r.data);
          }
        });
      } else {                      // else creating mode [two similar operations (same data) in one component]
        this.mode = 1;
        this.staticTitle = "Create a product";
        this.productDTO = <ProductDTO>{};
        this.productDTO.features = <HashNumberOfListNumbers>{};
        this.loadCategories();
      }
    });
  }

  loadCategory(categoryid: number, product: Product) { // called from 2 places in 2 cases
    this.productService.getCategory(categoryid).then(r2 => {
      if (r2.status == 'success') {
        this.categoryLogic = r2.data;
        this.features = this.makeFeaturesDTO(this.categoryLogic, product);
      } else {
        alert("There was a problem with getting data (CategoryLogic");
      }
    });
  }

  loadCategories() {
    this.productService.getCategories().then(r => {
      if (r.status == 'success') {
        this.categories = r.data;
        console.log(this.categories);
      } else {
        this.snackBar.open('There was a problem with getting categories', null, {duration: 4000});
      }
    });
  }

  categoryLogic_Change() {
    this.loadCategory(this.category, null);
  }

  submit_Click() {
    for (let i = 0; i < this.features.length; i++) {
      let loopFeature = this.features[i];

      let featureValues = [];
      if (loopFeature.multipleValues) {
        for (let j = 0; j < loopFeature.checked.length; j++) {
          featureValues.push(loopFeature.checked[j]);
        }
      } else {
        if (typeof loopFeature.checked === "object") {
          featureValues.push(loopFeature.checked[0]);
        } else {
          featureValues.push(loopFeature.checked);
        }
      }
      this.productDTO.features[loopFeature.featureDefID] = featureValues;
    }

    if (this.imageChanged) {
      this.productDTO.image = this.base64ToSend;
    }

    if (this.mode == Mode.CREATE) {
      this.productService.createProduct(this.category, this.productDTO).then(r => {
        if (r.status == 'success') {
          this.snackBar.open('You have successfully created the Product.', null, {duration: 4000});
        } else {
          this.snackBar.open('There was a problem with creating the Product.', null, {duration: 4000});
        }
      })
    } else {
      this.productService.editProduct(this.productid, this.productDTO).then(r => {
        if (r.status == 'success') {
          this.snackBar.open('You have successfully edited the Product.', null, {duration: 4000});
        } else {
          this.snackBar.open('There was a problem with editing the Product.', null, {duration: 4000});
        }
      });
    }
  }

  goBack_Click() {
    this.router.navigate(["admin/products"]);
  }

  makeFeaturesDTO(category: CategoryLogic, product: Product) {
    let features = [];

    for (var i = 0; i < category.featureDefinitions.length; i++) {
      let loopDef = category.featureDefinitions[i];

      let feature = { featureDefID: loopDef.id, featureDefName: loopDef.name, multipleValues: loopDef.multipleValues, values: [], checked: [] }
      for (var j = 0; j < loopDef.featureValueDefinitions.length; j++) {
        let loopValue = loopDef.featureValueDefinitions[j];

        let value = { id: loopValue.id, name: loopValue.value }
        if (product != null) {
          for (var k = 0; k < product.featureBags.length; k++) {
            if (loopDef.id == product.featureBags[k].featureDefinition.id) {
              for (var p = 0; p < product.featureBags[k].featureValues.length; p++) {
                let loopProductValue = product.featureBags[k].featureValues[p];
                if (loopProductValue.id == loopValue.id) {
                  feature.checked.push(loopValue.id);
                }
              }
              break;
            }
          }
        }
        feature.values.push(value);
      }
      features.push(feature);
    }
    return features;
  }

  convertProductToProductDTO(product: Product): ProductDTO {
    let dto = <ProductDTO>{};
    dto.name = product.name;
    dto.description = product.description;
    dto.price = product.price;
    dto.amount = product.amount;
    dto.features = <HashNumberOfListNumbers>{};
    return dto;
  }
}

enum Mode {
  EDIT = 0,
  CREATE = 1
}


