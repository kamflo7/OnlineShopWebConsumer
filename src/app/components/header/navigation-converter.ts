import { CategoryView, HashNumberOfGroup } from '../../_model/category-view';
import { NavigationItem } from './navigation-item';

export class NavigationConverter {
    private categories = [];
    private data:CategoryView[];

    constructor(data:CategoryView[]) {
        this.data = data;
    }

    /*
        Ugly, no clean code, writed in a hurry.
        Firstly it converts relationship [CHILD having PARENT] from backend
        to [Parent having children], consequently creating as many levels as we need,
        but suddenly turns out that I need:
        MainLevel + SecondaryLevel with merged whole tree levels of each SecondaryLevel,
        finally as each 3, 4, 5... levels is level 2.
        Furthermore, such deep levels must be in correct order next to real level 2.
        So it is it, in a hurry, not the best
    */
    public convert() {
        let childCount = 0;

        for (let i = 0; i < this.data.length; i++) { // look for navigation level root (0)
            if (this.data[i].parent == null) {
                this.categories.push(this.convertCategoryViewToLocalDTO(this.data[i]));
            } else {
                childCount++;
            }
        }

        while (childCount > 0) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.findAndAssignChildNode(this.data[i], this.categories)) {
                    if (--childCount == 0) {
                        break;
                    }
                }
            }
        }

        let cat = [];
        let catFinal = [];
        for(let i=0; i<this.categories.length; i++) {
            let loopCategory = this.categories[i];
            if(loopCategory.children != null) {
                for(let j=0; j<loopCategory.children.length; j++) {
                    cat.push(loopCategory.children[j]);
                }
            }
        }

        for(let i=0; i<cat.length; i++) {
            let catLocalFinal = [];

            catLocalFinal.push(cat[i]);
            if(cat[i].children != null) {
                for(let j=0; j<cat[i].children.length; j++) {
                    cat[i].children[j].lastLevel = true;
                    catLocalFinal.push(cat[i].children[j]);
                }
            }
            catFinal.push(catLocalFinal);
        }

        for(let i=0, c=0; i<this.categories.length; i++) {
            if(this.categories[i].children != null) {
                this.categories[i].children = catFinal[c++];
            } 
        }

        for(let i=0; i<this.categories.length; i++) {
            if(this.categories[i].filters != null) 
                this.categories[i].filterParams = this.makeFilterParamsQuery(this.categories[i].filters);
            
            if(this.categories[i].children != null) {
                for(let j=0; j<this.categories[i].children.length; j++) {
                    if(this.categories[i].children[j].filters != null) 
                        this.categories[i].children[j].filtersParams = this.makeFilterParamsQuery(this.categories[i].children[j].filters);
                }
            }
        }

        return this.categories;
    }

    makeFilterParamsQuery(group:Map<number, any>):string {
        // let query:string = "";
        // console.log("ok, co pokaze mapa: ");
        // console.log(JSON.stringify(group));
        

        return null;
    }

    findAndAssignChildNode(child: CategoryView, parentNode: Array<any>): boolean {
        for (let i = 0; i < parentNode.length; i++) {
            if (child.parent == null)
                continue;

            if (child.parent.id == parentNode[i].id) {
                parentNode[i].children.push(this.convertCategoryViewToLocalDTO(child));
                return true;
            } else { // we have to go deeper [tt1375666]
                if (parentNode[i].children.length > 0) {
                    return this.findAndAssignChildNode(child, parentNode[i].children);
                } else {
                    return false;
                }
            }
        }
    }

    convertCategoryViewToLocalDTO(categoryView: CategoryView): NavigationItem {
        let result = new NavigationItem();
        result.id = categoryView.id;
        result.name = categoryView.name;
        result.categoryLogic = categoryView.categoryLogic;
        result.filters = categoryView.filters;
        result.lastLevel = false;
        result.children = [];
        result.filterParams = null;
        return result;
    }
}