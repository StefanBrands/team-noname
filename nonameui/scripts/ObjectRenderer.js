var Application;
(function (Application) {
    var ObjectRenderer = (function () {
        function ObjectRenderer(baseUrl) {
            this.objectRendererLabelsJQ = $("#objectRendererLabels");
            this.objectRendererValuesJQ = $("#objectRendererValues");
            this.baseUrl = baseUrl;
        }
        ObjectRenderer.prototype.render = function (entityMetadata, entityObject) {
            for (var i = 0; i < entityMetadata.length; i++) {
                this.renderField(entityMetadata[i], entityObject.getFieldValue(entityMetadata[i].fieldName));
            }
        };

        ObjectRenderer.prototype.renderField = function (field, fieldValue) {
            this.objectRendererLabelsJQ.append(field.fieldLabel + "<br/>");

            if (field.dataType.toLowerCase().indexOf("date") >= 0)
                this.objectRendererValuesJQ.append((new Date(fieldValue)).toLocaleDateString() + "<br/>");
            else
                this.objectRendererValuesJQ.append(fieldValue + "<br/>");
        };
        return ObjectRenderer;
    })();
    Application.ObjectRenderer = ObjectRenderer;
})(Application || (Application = {}));
//# sourceMappingURL=ObjectRenderer.js.map
