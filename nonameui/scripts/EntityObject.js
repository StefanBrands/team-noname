var Application;
(function (Application) {
    var EntityObject = (function () {
        function EntityObject(baseUrl, listener) {
            this.baseUrl = baseUrl;
            this.listener = listener;
        }
        EntityObject.prototype.get = function (searchResultObject) {
            var _this = this;
            if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                this.runningCall.abort();

            var objType = searchResultObject.objectType.split(".");
            this.runningCall = $.get(this.baseUrl + "/noname/" + objType[objType.length - 1].toLowerCase().substr(1) + "?" + searchResultObject.objectKey.replace("|", "&").replace("|", "&"), null, function (res, code) {
                _this.onServicecallReturn(res, code);
            }, "json");
        };

        EntityObject.prototype.onServicecallReturn = function (res, code) {
            this.objectData = res;
            console.dir(res);
            this.runningCall = null;
            if (this.listener)
                this.listener.EntityObjectListener_dataReceived();
        };

        EntityObject.prototype.getFieldValue = function (fieldName) {
            if (this.objectData) {
                for (var property in this.objectData) {
                    if (property.toLowerCase() == fieldName && this.objectData.hasOwnProperty(property)) {
                        return this.objectData[property];
                    }
                }
            }
        };
        return EntityObject;
    })();
    Application.EntityObject = EntityObject;
})(Application || (Application = {}));
//# sourceMappingURL=EntityObject.js.map
