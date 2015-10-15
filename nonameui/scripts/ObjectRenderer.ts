module Application {

    export class ObjectRenderer {
        private baseUrl: string;
        private objectRendererJQ: JQuery = $("#objectRenderer");
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

        private renderField(field: EntityMetadata,fieldValue: any) {
            this.objectRendererJQ.append(field.fieldLabel + ": " + fieldValue + "<br/>");
        }
        
        
   }
}