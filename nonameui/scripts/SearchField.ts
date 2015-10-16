module Application {
    export interface SearchFieldSelectEventHandler {
        onSearchFieldSelect(): void;
    }
    
    export class SearchField {
        private baseUrl: string;
        private sugList: JQuery=$("#suggestions");
        private runningCall: XMLHttpRequest;
        private searchFieldSelectEventHandler: SearchFieldSelectEventHandler;
        private searchResultObjects: SearchResultObject[];
        
        constructor(baseUrl: string, searchFieldSelectEventHandler: SearchFieldSelectEventHandler) {
            this.baseUrl = baseUrl;
            this.searchFieldSelectEventHandler = searchFieldSelectEventHandler;
            this.initialize();
        }
        
        public get kendoMobileListView(): kendo.mobile.ui.ListView {
            return this.sugList.data("kendoMobileListView");
        }

        public get Value(): SearchResultObject {
            var objectCode: string = $("#searchField").val().split("(")[0].trim();
            
            if (this.searchResultObjects) {
                for (var i: number = 0; i < this.searchResultObjects.length; i++) {
                    if (this.searchResultObjects[i].objectCode == objectCode)
                        return this.searchResultObjects[i];
                }
            }
            return null;
        }

        private onClick(e): void {
            $("#searchField").val(e.target.textContent);
            this.sugList.html("");
            if (this.searchFieldSelectEventHandler != null)
                this.searchFieldSelectEventHandler.onSearchFieldSelect();
        }
        
        private initialize(): void {
            this.sugList.bind("click", (e) => {
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
                 this.runningCall = $.get(this.baseUrl+"/noname/quicksearch/ALL/" + text, { search: text }, (res, code) => { this.onServicecallReturn(res, code); }, "json");
             }
            
        }
        
        private onServicecallReturn(res,code) {
            var str = "";

            if (res.length == 0)
                return;
            
            this.searchResultObjects = <SearchResultObject[]>res;
            for (var i = 0, len = res.length; i < len; i++) {
                 var searchResultObject : SearchResultObject = <SearchResultObject>res[i];
                 var objType: string[] = searchResultObject.objectType.split(".");
                 str += "<li>" + searchResultObject.objectCode + " (" + objType[objType.length - 1].substr(1) + ")</li>";
             }
             this.sugList.html(str);
            console.dir(res);
            this.runningCall=null;
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