module Application {

    export class ObjectRenderer {
        private baseUrl: string;
        private objectRendererJQ: JQuery = $("#objectRenderer");
        private entityMetadata: EntityMetadata[];
        private entityObject: EntityObject;
        private filter: string = null;
        private objectTitle: string;
        
        constructor(baseUrl: string) {
            this.baseUrl = baseUrl;
            $("#searchFieldDetails").on("input", (e) => { this.onInput(e); });
        }

        private onInput(e: JQueryObject): void {
            this.filter=$("#searchFieldDetails").val();
            this.render();
        }
        
        public get MetaData(): EntityMetadata {
            return this.entityMetadata;
        }

        
        public set MetaData(value: EntityMetadata) {
            this.entityMetadata=value;
        }

        public get DataObject(): EntityObject {
            return this.entityObject;
        }
        
        public set DataObject(value: EntityObject) {
            this.entityObject=value;
        }
        
        public get ObjectTitle(): string {
            return this.objectTitle;
        }
        
        public set ObjectTitle(value: sring) {
            this.objectTitle=value;
        }
        
        private render() {
            this.objectRendererJQ.empty();
            if (this.objectTitle)
                $("#entityTypeDetails").text = "Details of " + this.objectTitle;
            
            for (var i: number = 0; i < this.entityMetadata.length; i++) {
                var fieldValue:any  = this.entityObject.getFieldValue(this.entityMetadata[i].fieldName)
                var cont: boolean = !this.filter || this.filter.length == 0 || this.entityMetadata[i].fieldLabel.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
                if (!cont)
                    cont = fieldValue && fieldValue.toString().toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
                if (cont)
                    this.renderField(this.entityMetadata[i],fieldValue);
            }
        }

        private renderField(field: EntityMetadata, fieldValue: any) {
            var strValue: string;
            if (field.dataType.toLowerCase().indexOf("date")>=0)
                strValue=(new Date(fieldValue)).toLocaleDateString();
            else
                strValue=fieldValue;

            var strAppend: string = "<div class=\"labels\">" + field.fieldLabel + "</div>";
            strAppend += "<div class=\"values\">" + strValue + "</div>";

            this.objectRendererJQ.append(strAppend + "<br/>");
        }
   }
}