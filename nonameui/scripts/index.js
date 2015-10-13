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
/// <reference path="./typings/jquery.d.ts" />
var Application;
(function (Application) {
    function initialize() {
        var searchField = new SearchField();
        searchField.initialize();

        document.addEventListener('deviceready', onDeviceReady, false);
    }
    Application.initialize = initialize;

    function onDeviceReady() {
        receivedEvent('deviceready');
        navigator.splashscreen.hide();
    }

    function receivedEvent(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

    var SearchField = (function () {
        function SearchField() {
            this.sugList = $("#suggestions");
        }
        SearchField.prototype.initialize = function () {
            var _this = this;
            $("#searchField").on("input", function () {
                return _this.onInput;
            });
        };

        SearchField.prototype.onInput = function (e) {
            var _this = this;
            var text = $(this).val();
            if (text.length < 1) {
                this.sugList.html("");
                this.sugList.listview("refresh");
            } else {
                $.get("service.cfc?method=getSuggestions", { search: text }, function () {
                    return _this.onServicecallReturn;
                }, "json");
            }
        };

        SearchField.prototype.onServicecallReturn = function (res, code) {
            var str = "";
            for (var i = 0, len = res.length; i < len; i++) {
                str += "<li>" + res[i] + "</li>";
            }
            this.sugList.html(str);
            this.sugList.listview("refresh");
            console.dir(res);
        };
        return SearchField;
    })();
    Application.SearchField = SearchField;
})(Application || (Application = {}));
//# sourceMappingURL=index.js.map
