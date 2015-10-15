var Application;
(function (Application) {
    var ObjectRenderer = (function () {
        function ObjectRenderer(baseUrl) {
            this.objectRendererJQ = $("#objectRenderer");
            this.baseUrl = baseUrl;
        }
        ObjectRenderer.prototype.render = function (entityMetadata, entityObject) {
            for (var i = 0; i < entityMetadata.length; i++) {
                this.renderField(entityMetadata[i], entityObject.getFieldValue(entityMetadata[i].fieldName));
            }
        };

        ObjectRenderer.prototype.renderField = function (field, fieldValue) {
            this.objectRendererJQ.append(field.fieldLabel + ": " + fieldValue + "<br/>");
        };
        return ObjectRenderer;
    })();
    Application.ObjectRenderer = ObjectRenderer;
})(Application || (Application = {}));
//# sourceMappingURL=ObjectRenderer.js.map
