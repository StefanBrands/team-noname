module Application {

    export class ObjectRenderer {
        private baseUrl: string;
        private objectRendererLabelsJQ: JQuery = $("#objectRendererLabels");
        private objectRendererValuesJQ: JQuery = $("#objectRendererValues");
        private entityMetadata: EntityMetadata[];
        private entityObject: EntityObject;
        
        constructor(baseUrl: string) {
            this.baseUrl = baseUrl;
        }

        private render(entityMetadata: EntityMetadata[],entityObject: EntityObject) {
            for (var i: number = 0; i < entityMetadata.length; i++) {
                this.renderField(entityMetadata[i],entityObject.getFieldValue(entityMetadata[i].fieldName));
            }
        }

        private renderField(field: EntityMetadata, fieldValue: any) {
            this.objectRendererLabelsJQ.append(field.fieldLabel + "<br/>");
            
            if (field.dataType.toLowerCase().indexOf("date")>=0)
                this.objectRendererValuesJQ.append((new Date(fieldValue)).toLocaleDateString() + "<br/>");
            else
                this.objectRendererValuesJQ.append(fieldValue + "<br/>");
        }
   }
}