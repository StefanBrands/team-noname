var Application;
(function (Application) {
    var EntityMetadataAdapter = (function () {
        function EntityMetadataAdapter(baseUrl, listener) {
            this.baseUrl = baseUrl;
            this.listener = listener;
        }
        EntityMetadataAdapter.prototype.get = function (entityUri) {
            var _this = this;
            if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                this.runningCall.abort();
            this.runningCall = $.get(this.baseUrl + "/noname/entitymetadata?entityUri=" + entityUri, null, function (res, code) {
                _this.onServicecallReturn(res, code);
            }, "json");
        };

        EntityMetadataAdapter.prototype.onServicecallReturn = function (res, code) {
            if (this.listener)
                this.listener.EntityMetadataAdapterListener_entityMetadataReceived(res);
            console.dir(res);
            this.runningCall = null;
        };
        return EntityMetadataAdapter;
    })();
    Application.EntityMetadataAdapter = EntityMetadataAdapter;
})(Application || (Application = {}));
//# sourceMappingURL=EntityMetadataAdapter.js.map
