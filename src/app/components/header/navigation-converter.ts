import { CategoryView, HashNumberOfGroup } from '../../_model/category-view';
import { NavigationItem } from './navigation-item';

export class NavigationConverter {
    // private categories = [];
    private data:CategoryView[];

    constructor(data:CategoryView[]) {
        this.data = data;
    }

    public convert() {
        let childCount = 0;

        let root = [];
        let level2 = [];
        let level3 = [];

        for (let i = 0; i < this.data.length; i++) { // look for navigation level root (0)
            if (this.data[i].parent == null) {
                root.push(this.convertCategoryViewToLocalDTO(this.data[i]));
            } 
        }

        for (let i = 0; i < this.data.length; i++) { // look for navigation level root (0)
            if (this.data[i].parent != null) {
                let found = false;
                for(let j=0; j<root.length; j++) {
                    if(this.data[i].parent.id == root[j].id) {
                        level2.push(this.convertCategoryViewToLocalDTO(this.data[i]));
                        found = true;
                        break;
                    }
                }
    
                if(!found)
                    level3.push(this.convertCategoryViewToLocalDTO(this.data[i]));
            } 
        }

        for(let i=0; i<root.length; i++) {
            for(let j=0; j<level2.length; j++) {
                if(level2[j].parentid == root[i].id)
                    root[i].children.push(level2[j]);
                    
                for(let k=0; k<level3.length; k++) {
                    if(level3[k].parentid == level2[j].id && level2[j].parentid == root[i].id) {
                        level3[k].lastLevel = true;
                        root[i].children.push(level3[k]);
                    }
                }
            }
        }

        return root;
    }


    convertCategoryViewToLocalDTO(categoryView: CategoryView): NavigationItem {
        let result = new NavigationItem();
        result.id = categoryView.id;
        result.name = categoryView.name;
        result.categoryLogic = categoryView.categoryLogic;
        result.lastLevel = false;
        result.children = [];
        result.parentid = categoryView.parent != null ? categoryView.parent.id : -1;
        // if(categoryView.parent != null)
        return result;
    }
}