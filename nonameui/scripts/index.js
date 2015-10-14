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
        document.addEventListener('deviceready', onDeviceReady, false);
    }
    Application.initialize = initialize;

    function onDeviceReady() {
        var app = new kendo.mobile.Application();
        var controller = new Controller();
        navigator.splashscreen.hide();
    }
    var Controller = (function () {
        function Controller() {
            var _this = this;
            this.navBar = $("#navbar");
            this.homeView = $("#home");
            this.detailsView = $("#details");
            this.searchField = new SearchField(this);
            /*
            this.DetailsView.bind("show", (e) => {
            this.onDetailsViewShow(e);
            });
            */
            this.TabStrip.bind("select", function (e) {
                _this.onTabStripSelect(e);
            });
        }
        Object.defineProperty(Controller.prototype, "TabStrip", {
            get: function () {
                return this.navBar.data("kendoMobileTabStrip");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Controller.prototype, "HomeView", {
            get: function () {
                return this.homeView.data("kendoMobileView");
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(Controller.prototype, "DetailsView", {
            get: function () {
                return this.detailsView.data("kendoMobileView");
            },
            enumerable: true,
            configurable: true
        });

        Controller.prototype.onDetailsViewShow = function (e) {
        };

        Controller.prototype.onTabStripSelect = function (e) {
            if (e == null || e.item[0].hash == "#details") {
            }
        };

        Controller.prototype.onSearchFieldSelect = function () {
            this.TabStrip.switchTo("#details");
            this.onTabStripSelect(null);
        };
        return Controller;
    })();
    Application.Controller = Controller;

    var SearchField = (function () {
        function SearchField(searchFieldSelectEventHandler) {
            this.sugList = $("#suggestions");
            this.searchFieldSelectEventHandler = searchFieldSelectEventHandler;
            this.initialize();
        }
        Object.defineProperty(SearchField.prototype, "kendoMobileListView", {
            get: function () {
                return this.sugList.data("kendoMobileListView");
            },
            enumerable: true,
            configurable: true
        });

        SearchField.prototype.onClick = function (e) {
            $("#searchField").val(e.target.textContent);
            this.sugList.html("");
            if (this.searchFieldSelectEventHandler != null)
                this.searchFieldSelectEventHandler.onSearchFieldSelect();
        };

        SearchField.prototype.initialize = function () {
            var _this = this;
            this.sugList.bind("click", function (e) {
                _this.onClick(e);
            });
            $("#searchField").on("input", function (e) {
                _this.onInput(e);
            });
        };

        SearchField.prototype.onInput = function (e) {
            var _this = this;
            var text = $("#searchField").val();
            if (text.length < 1) {
                this.sugList.html("");
            } else {
                if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                    this.runningCall.abort();
                this.runningCall = $.get("http://localhost:8080/noname/quicksearch/ALL/" + text, { search: text }, function (res, code) {
                    _this.onServicecallReturn(res, code);
                }, "json");
            }
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
