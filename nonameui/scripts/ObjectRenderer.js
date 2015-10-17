var Application;
(function (Application) {
    var ObjectRenderer = (function () {
        function ObjectRenderer(app, baseUrl) {
            var _this = this;
            this.fieldsList = $("#detailfields");
            this.filter = null;
            this.app = app;
            this.baseUrl = baseUrl;
            $("#searchFieldDetails").on("input", function (e) {
                _this.onInput(e);
            });
        }
        Object.defineProperty(ObjectRenderer.prototype, "kendoMobileListView", {
            get: function () {
                return this.fieldsList.data("kendoMobileListView");
            },
            enumerable: true,
            configurable: true
        });

        ObjectRenderer.prototype.onInput = function (e) {
            this.filter = $("#searchFieldDetails").val();
            this.render();
        };

        Object.defineProperty(ObjectRenderer.prototype, "MetaData", {
            get: function () {
                return this.entityMetadata;
            },
            set: function (value) {
                this.entityMetadata = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ObjectRenderer.prototype, "DataObject", {
            get: function () {
                return this.entityObject;
            },
            set: function (value) {
                this.entityObject = value;
            },
            enumerable: true,
            configurable: true
        });


        Object.defineProperty(ObjectRenderer.prototype, "ObjectTitle", {
            get: function () {
                return this.objectTitle;
            },
            set: function (value) {
                this.objectTitle = value;
            },
            enumerable: true,
            configurable: true
        });


        ObjectRenderer.prototype.render = function () {
            var str = "";
            if (this.objectTitle)
                $("#entityTypeDetails").text("Details of " + this.objectTitle);

            for (var i = 0; i < this.entityMetadata.length; i++) {
                var fieldValue = this.entityObject.getFieldValue(this.entityMetadata[i].fieldName);
                var cont = !this.filter || this.filter.length == 0 || this.entityMetadata[i].fieldLabel.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
                if (!cont)
                    cont = fieldValue && fieldValue.toString().toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
                if (cont)
                    str += this.renderField(this.entityMetadata[i], fieldValue);
            }
            this.fieldsList.html(str);
        };

        ObjectRenderer.prototype.renderField = function (field, fieldValue) {
            var strValue;
            if (field.dataType.toLowerCase().indexOf("date") >= 0)
                strValue = (new Date(fieldValue)).toLocaleDateString();
            else
                strValue = fieldValue;

            var strAppend = "<li><b>" + field.fieldLabel + "</b>";
            strAppend += " : " + strValue + "</li><hr>";

            return strAppend;
        };
        return ObjectRenderer;
    })();
    Application.ObjectRenderer = ObjectRenderer;
})(Application || (Application = {}));
//# sourceMappingURL=ObjectRenderer.js.map
