var Application;
(function (Application) {
    var Controller = (function () {
        function Controller() {
            var _this = this;
            this.navBar = $("#navbar");
            this.homeView = $("#home");
            this.detailsView = $("#details");
            this.searchField = new Application.SearchField(this);
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
})(Application || (Application = {}));
//# sourceMappingURL=Controller.js.map
