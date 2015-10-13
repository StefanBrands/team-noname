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
var Application;
(function (Application) {
    function initialize() {
        var searchField = new SearchField();
        searchField.initialize();
    }
    Application.initialize = initialize;

    var SearchField = (function () {
        function SearchField() {
        }
        SearchField.prototype.initialize = function () {
            var _this = this;
            this.srchFld = $("#searchField");
            this.sugList = $("#suggestions");

            this.srchFld.bind("input", function (e) {
                _this.onInput(e);
            });

            this.sugList.bind("click", function (e) {
                _this.onClick(e);
            });
        };

        SearchField.prototype.onInput = function (e) {
            var _this = this;
            var text = this.srchFld.val();

            if (text.length < 1) {
                this.sugList.html("");
            } else {
                if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                    this.runningCall.abort();

                this.runningCall = $.get("http://vmcip01.qad.com:22000/noname/quicksearch/ALL/" + text, { search: text }, function (res, code) {
                    _this.onServicecallReturn(res, code);
                }, "json");
            }
        };

        SearchField.prototype.onClick = function (e) {
            this.srchFld.val(e.target.textContent);
            this.sugList.html("");
        };

        SearchField.prototype.onServicecallReturn = function (res, code) {
            var str = "";

            for (var i = 0, len = res.length; i < len; i++) {
                var searchResultObject = res[i];
                str += "<li>" + searchResultObject.objectCode + "</li>";
            }

            this.sugList.html(str);
            console.dir(res);
            this.runningCall = null;
        };
        return SearchField;
    })();
    Application.SearchField = SearchField;
})(Application || (Application = {}));
//# sourceMappingURL=index.js.map
