var Application;
(function (Application) {
    var ObjectRenderer = (function () {
        function ObjectRenderer(baseUrl) {
            var _this = this;
            this.objectRendererJQ = $("#objectRenderer");
            this.filter = null;
            this.baseUrl = baseUrl;
            $("#searchFieldDetails").on("input", function (e) {
                _this.onInput(e);
            });
        }
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


        ObjectRenderer.prototype.render = function () {
            this.objectRendererJQ.empty();
            for (var i = 0; i < this.entityMetadata.length; i++) {
                if (!this.filter || this.filter.length == 0 || this.entityMetadata[i].fieldLabel.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0)
                    this.renderField(this.entityMetadata[i], this.entityObject.getFieldValue(this.entityMetadata[i].fieldName));
            }
        };

        ObjectRenderer.prototype.renderField = function (field, fieldValue) {
            var strValue;
            if (field.dataType.toLowerCase().indexOf("date") >= 0)
                strValue = (new Date(fieldValue)).toLocaleDateString();
            else
                strValue = fieldValue;

            var strAppend = "<div class=\"labels\">" + field.fieldLabel + "</div>";
            strAppend += "<div class=\"values\">" + strValue + "</div>";

            this.objectRendererJQ.append(strAppend + "<br/>");
        };
        return ObjectRenderer;
    })();
    Application.ObjectRenderer = ObjectRenderer;
})(Application || (Application = {}));
//# sourceMappingURL=ObjectRenderer.js.map
