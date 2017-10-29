import { CategoryView } from '../../_model/category-view';
import { NavigationItem } from './navigation-item';

export class NavigationConverterCopy {
    private categories = [];
    private data:CategoryView[];

    constructor(data:CategoryView[]) {
        this.data = data;
    }

    public convert() {
        let childCount = 0;

        for (let i = 0; i < this.data.length; i++) {
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
        return this.categories;
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
        // result.filters = categoryView.filters;
        result.children = [];
        return result;
    }
}