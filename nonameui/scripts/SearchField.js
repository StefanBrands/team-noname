var Application;
(function (Application) {
    var SearchField = (function () {
        function SearchField(baseUrl, searchFieldSelectEventHandler) {
            this.sugList = $("#suggestions");
            this.baseUrl = baseUrl;
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

        Object.defineProperty(SearchField.prototype, "Value", {
            get: function () {
                var objectCode = $("#searchField").val().split("(")[0].trim();

                if (this.searchResultObjects) {
                    for (var i = 0; i < this.searchResultObjects.length; i++) {
                        if (this.searchResultObjects[i].objectCode == objectCode)
                            return this.searchResultObjects[i];
                    }
                }
                return null;
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
                this.runningCall = $.get(this.baseUrl + "/noname/quicksearch/ALL/" + text, { search: text }, function (res, code) {
                    _this.onServicecallReturn(res, code);
                }, "json");
            }
        };

        SearchField.prototype.onServicecallReturn = function (res, code) {
            var str = "";
            this.searchResultObjects = res;
            for (var i = 0, len = res.length; i < len; i++) {
                var searchResultObject = res[i];
                var objType = searchResultObject.objectType.split(".");
                str += "<li>" + searchResultObject.objectCode + " (" + objType[objType.length - 1].substr(1) + ")</li>";
            }
            this.sugList.html(str);
            console.dir(res);
            this.runningCall = null;
        };
        return SearchField;
    })();
    Application.SearchField = SearchField;
})(Application || (Application = {}));
//# sourceMappingURL=SearchField.js.map
