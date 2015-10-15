module Application {
    export interface SearchFieldSelectEventHandler {
        onSearchFieldSelect(): void;
    }
    
    export class SearchField {
        private sugList: JQuery=$("#suggestions");
        private runningCall: XMLHttpRequest;
        private searchFieldSelectEventHandler: SearchFieldSelectEventHandler;
        
        constructor(searchFieldSelectEventHandler: SearchFieldSelectEventHandler) {
            this.searchFieldSelectEventHandler = searchFieldSelectEventHandler;
            this.initialize();
        }
        
        public get kendoMobileListView(): kendo.mobile.ui.ListView {
            return this.sugList.data("kendoMobileListView");
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
                 this.runningCall = $.get("http://localhost:8080/noname/quicksearch/ALL/" + text, { search: text }, (res, code) => { this.onServicecallReturn(res, code); }, "json");
             }
            
        }
        
        private onServicecallReturn(res,code) {
            var str = "";
            for (var i = 0, len = res.length; i < len; i++) {
                 var searchResultObject : SearchResultObject = <SearchResultObject>res[i];
                 str += "<li>"+searchResultObject.objectCode+"</li>";
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