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
        var searchField: SearchField = new SearchField();
        searchField.initialize();
    }

    export class SearchField {
        private srchFld: JQuery;
        private sugList: JQuery;
        private runningCall: XMLHttpRequest;
        
        constructor() {
        }

        public initialize(): void {
            this.srchFld = $("#searchField");
            this.sugList = $("#suggestions");
            
            this.srchFld.bind("input", (e) => {
                this.onInput(e);
            });
            
            this.sugList.bind("click", (e) => {
                this.onClick(e);
            });
        }

        private onInput(e: JQueryObject): void {
            var text = this.srchFld.val();
            
             if(text.length < 1) {
                 this.sugList.html("");
             } else {
                 if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                     this.runningCall.abort();
                 this.runningCall = $.get("http://vmcip01.qad.com:22000/noname/quicksearch/ALL/" + text, { search: text }, (res, code) => { this.onServicecallReturn(res, code); }, "json");
             }
            
        }
        
        private onClick(e): void {
            this.srchFld.val(e.target.textContent);
            this.sugList.html("");
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
