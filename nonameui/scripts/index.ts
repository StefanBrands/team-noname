/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

module Application {
    export function initialize() {
        document.addEventListener('deviceready', onDeviceReady, false);
    }

    function onDeviceReady() {
        var app = new kendo.mobile.Application();
        var controller: Controller = new Controller();
        navigator.splashscreen.hide();
    }
    export class Controller implements SearchFieldSelectEventHandler {
        private navBar: JQuery = $("#navbar");
        private homeView: JQuery = $("#home");
        private detailsView: JQuery = $("#details");
        
        private searchField: SearchField = new SearchField(this);

        constructor() {
            /*
            this.DetailsView.bind("show", (e) => {
                this.onDetailsViewShow(e);
            });
            */
            this.TabStrip.bind("select", (e) => {
                this.onTabStripSelect(e);
            });
        }

        private get TabStrip(): kendo.mobile.ui.TabStrip {
            return this.navBar.data("kendoMobileTabStrip");
        }

        private get HomeView(): kendo.mobile.ui.View {
            return this.homeView.data("kendoMobileView");
        }

        private get DetailsView(): kendo.mobile.ui.View {
            return this.detailsView.data("kendoMobileView");
        }

        private onDetailsViewShow(e: kendo.mobile.ui.ViewShowEvent): void {
            
        }

        private onTabStripSelect(e: kendo.mobile.ui.TabStripSelectEvent): void {
            if (e==null || e.item[0].hash == "#details"){
            }
        }

        private onSearchFieldSelect(): void {
            this.TabStrip.switchTo("#details");
            this.onTabStripSelect(null);
        }

    }

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
