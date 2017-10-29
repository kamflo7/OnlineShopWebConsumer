import { CategoryView } from '../_model/category-view';
import { NavigationItem } from '../_dto/navigation-item';

export class NavigationConverter {
    // private categories = [];
    private data:CategoryView[];
    private root = [];

    public convert(data:CategoryView[]):NavigationItem[] {
        this.data = data;
        this.root = [];
        let level2 = [];
        let level3 = [];

        for (let i = 0; i < this.data.length; i++) { // look for navigation level root (0)
            if (this.data[i].parent == null) {
                this.root.push(this.convertCategoryViewToLocalDTO(this.data[i], 0));
            } 
        }

        for (let i = 0; i < this.data.length; i++) { // look for navigation level 1 and 2
            if (this.data[i].parent != null) {
                let found = false;
                for(let j=0; j<this.root.length; j++) {
                    if(this.data[i].parent.id == this.root[j].id) {
                        level2.push(this.convertCategoryViewToLocalDTO(this.data[i], 1));
                        found = true;
                        break;
                    }
                }
    
                if(!found)
                    level3.push(this.convertCategoryViewToLocalDTO(this.data[i], 2));
            } 
        }

        for(let i=0; i<this.root.length; i++) { // merge level 1 with level 2 and assert correct order
            for(let j=0; j<level2.length; j++) {
                if(level2[j].parentid == this.root[i].id)
                    this.root[i].children.push(level2[j]);
                    
                for(let k=0; k<level3.length; k++) {
                    if(level3[k].parentid == level2[j].id && level2[j].parentid == this.root[i].id) {
                        level3[k].lastLevel = true;
                        this.root[i].children.push(level3[k]);
                    }
                }
            }
        }
        return this.root;
    }

    public convertForNavigationTemplate(data:CategoryView[]) {
        this.data = data;

        this.root = [];
        let level2 = [];
        let level3 = [];

        for (let i = 0; i < this.data.length; i++) { // look for navigation level root (0)
            if (this.data[i].parent == null) {
                this.root.push(this.convertCategoryViewToLocalDTO(this.data[i], 0));
            } 
        }

        for (let i = 0; i < this.data.length; i++) { // look for navigation level 1 and 2
            if (this.data[i].parent != null) {
                let found = false;
                for(let j=0; j<this.root.length; j++) {
                    if(this.data[i].parent.id == this.root[j].id) {
                        level2.push(this.convertCategoryViewToLocalDTO(this.data[i], 1));
                        found = true;
                        break;
                    }
                }
    
                if(!found)
                    level3.push(this.convertCategoryViewToLocalDTO(this.data[i], 2));
            } 
        }

        for(let i=0; i<this.root.length; i++) { // merge level 1 with level 2 and assert correct order
            for(let j=0; j<level2.length; j++) {
                if(level2[j].parentid == this.root[i].id)
                    this.root[i].children.push(level2[j]);
                    
                for(let k=0; k<level3.length; k++) {
                    if(level3[k].parentid == level2[j].id && level2[j].parentid == this.root[i].id) {
                        level3[k].lastLevel = true;
                        this.root[i].children.push(level3[k]);
                    }
                }
            }
        }

        for(let i=0; i<this.root.length; i++) {
            this.generateURL(this.root[i]);
            if(this.root[i].children != null) {
                for(let j=0; j<this.root[i].children.length; j++) {
                    this.generateURL(this.root[i].children[j]);
                }
            }
        }
        // console.log(this.root);
        return this.root;
    }

    generateURL(node:NavigationItem) {
        if(node.categoryLogic != null) {
            let catBlocks = [];
            catBlocks.push(node.name.replace(/ /g, "-") + "-" + node.id);

            let parent:NavigationItem;
            parent = node.parentid != -1 ? this.searchNodeByID(node.parentid, this.root) : null;
            while(parent != null) {
                catBlocks.push(parent.name.replace(/ /g, "-"));
                parent = parent.parentid != -1 ? this.searchNodeByID(parent.parentid, this.root) : null;
            }
            let finalQuery = "";
            for(let i=catBlocks.length-1; i >= 0; i--) {
                finalQuery += catBlocks[i] + "/";
            }
            node.url = finalQuery;
            // console.log("url for node " + node.name + ": " + node.url);
        }
    }

    public searchNodeByID(id:number, source:NavigationItem[]):NavigationItem {
        for(let i=0; i<source.length; i++) {
            if(source[i].id == id)
                return source[i];
            if(source[i].children != null) {
                for(let j=0; j<source[i].children.length; j++) {
                    if(source[i].children[j].id == id)
                        return source[i].children[j];
                }
            }
        }
        return null;
    }

    convertCategoryViewToLocalDTO(categoryView: CategoryView, level:number): NavigationItem {
        let result = new NavigationItem();
        result.id = categoryView.id;
        result.name = categoryView.name;
        result.categoryLogic = categoryView.categoryLogic;
        result.lastLevel = false;
        result.children = [];
        result.parentid = categoryView.parent != null ? categoryView.parent.id : -1;
        result.level = level;
        result.url = null;
        // if(categoryView.parent != null)
        return result;
    }
}