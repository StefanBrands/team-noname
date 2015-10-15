/// <reference path="./SearchField.ts" />
var Application;
(function (Application) {
    var Controller = (function () {
        function Controller(app) {
            var _this = this;
            this.baseUrl = "http://localhost:8080";
            this.navBar = $("#navbar");
            this.homeView = $("#home");
            this.detailsView = $("#details");
            this.searchField = new Application.SearchField(this.baseUrl, this);
            this.entityMetadataAdapter = new Application.EntityMetadataAdapter(this.baseUrl, this);
            this.entityObject = new Application.EntityObject(this.baseUrl, this);
            this.objectRenderer = new Application.ObjectRenderer(this.baseUrl);
            this.entityMetaDataReceived = null;
            this.entityObjectReceived = false;
            this.app = app;
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

        Controller.prototype.onTabStripSelect = function (e) {
            this.onViewSelected(e.item[0].hash);
        };

        Controller.prototype.onSearchFieldSelect = function () {
            this.app.navigate("#details");
            this.onViewSelected("#details");
        };

        Controller.prototype.onViewSelected = function (viewName) {
            if (viewName == "#details") {
                this.entityMetaDataReceived = null;
                this.entityObjectReceived = false;
                this.entityMetadataAdapter.get("urn:be:" + this.searchField.Value.objectType);
                this.entityObject.get(this.searchField.Value);
            } else {
                $("#searchField").val("");
            }
        };

        Controller.prototype.EntityMetadataAdapterListener_entityMetadataReceived = function (entityMetadata) {
            this.entityMetaDataReceived = entityMetadata;
            this.renderEntityObject();
        };

        Controller.prototype.EntityObjectListener_dataReceived = function () {
            this.entityObjectReceived = true;
            this.renderEntityObject();
        };

        Controller.prototype.renderEntityObject = function () {
            if (this.entityMetaDataReceived != null && this.entityObjectReceived) {
                if (this.entityMetaDataReceived.length > 0) {
                    this.objectRenderer.MetaData = this.entityMetaDataReceived;
                    this.objectRenderer.DataObject = this.entityObject;
                    this.objectRenderer.render();
                }
            }
        };
        return Controller;
    })();
    Application.Controller = Controller;
})(Application || (Application = {}));
//# sourceMappingURL=Controller.js.map
