module Application {
    export interface SearchFieldSelectEventHandler {
        onSearchFieldSelect(secondClick:boolean): void;
    }
    
    export class SearchField {
        private app: kendo.mobile.Application;
        private baseUrl: string;
        private sugList: JQuery=$("#suggestions");
        private runningCall: XMLHttpRequest;
        private searchFieldSelectEventHandler: SearchFieldSelectEventHandler;
        private searchResultObjects: SearchResultObject[];
        
        constructor(app: kendo.mobile.Application,baseUrl: string, searchFieldSelectEventHandler: SearchFieldSelectEventHandler) {
            this.app = app;
            this.baseUrl = baseUrl;
            this.searchFieldSelectEventHandler = searchFieldSelectEventHandler;
            this.initialize();
        }
        
        public get kendoMobileListView(): kendo.mobile.ui.ListView {
            return this.sugList.data("kendoMobileListView");
        }

        public get Value(): SearchResultObject {
            var objectCode: string = this.selectedItemCode;
            
            if (this.searchResultObjects) {
                for (var i: number = 0; i < this.searchResultObjects.length; i++) {
                    if (this.searchResultObjects[i].objectCode == objectCode)
                        return this.searchResultObjects[i];
                }
            }
            return null;
        }

        private selectedItemCode: string;
        private onClick(e): void {
            this.selectedItemCode = $(e.item).attr("objectCode");
            var secondClick: boolean = $(e.item).hasClass("listview-selected");
            $(".listview-selected").toggleClass("listview-selected");
            e.item.toggleClass("listview-selected");

            if (this.searchFieldSelectEventHandler != null)
                this.searchFieldSelectEventHandler.onSearchFieldSelect(secondClick);
        }
        
        private initialize(): void {
            this.kendoMobileListView.bind("click", (e) => {
                this.onClick(e);
            });
            $("#searchField").on("input", (e) => { this.onInput(e); });
        }

        private onInput(e: JQueryObject): void {
             var text = $("#searchField").val();
             if(text.length < 1) {
                 this.sugList.html("");
             } else {
                 if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                     this.runningCall.abort();
                 this.app.showLoading();
                 this.runningCall = $.get(this.baseUrl+"/noname/quicksearch/ALL/" + text, { search: text }, (res, code) => { this.onServicecallReturn(res, code); }, "json");
             }
            
        }
        
        private onServicecallReturn(res,code) {
            var str = "";

            if (res.length > 0) {
                this.searchResultObjects = <SearchResultObject[]>res;
                for (var i = 0, len = res.length; i < len; i++) {
                    var searchResultObject: SearchResultObject = <SearchResultObject>res[i];
                    var objType: string[] = searchResultObject.objectType.split(".");
                    str += "<li objectCode=\"" + searchResultObject.objectCode + "\"><b>" + objType[objType.length - 1].substr(1) + " " + searchResultObject.objectCode + "</b>";
                    str += " - " + searchResultObject.objectDescription + "</li><hr>";
                }
            }
            this.sugList.html(str);
            console.dir(res);
            this.runningCall=null;
            this.app.hideLoading();
        }
    }

    export interface SearchResultObject {
        objectCode: string;
        objectDescription: string;
        objectKey: string;
        objectType: string;
        entityURI: string;
    }
}