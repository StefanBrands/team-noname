module Application {

    export class ObjectRenderer {
        private app: kendo.mobile.Application;
        private baseUrl: string;
        private fieldsList: JQuery=$("#detailfields");
        private entityMetadata: EntityMetadata[];
        private entityObject: EntityObject;
        private filter: string = null;
        private objectTitle: string;
        
        constructor(app: kendo.mobile.Application,baseUrl: string) {
            this.app = app;
            this.baseUrl = baseUrl;
            $("#searchFieldDetails").on("input", (e) => { this.onInput(e); });
        }

        public get kendoMobileListView(): kendo.mobile.ui.ListView {
            return this.fieldsList.data("kendoMobileListView");
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
            var str = "";
            if (this.objectTitle)
                $("#entityTypeDetails").text("Details of " + this.objectTitle);
            
            for (var i: number = 0; i < this.entityMetadata.length; i++) {
                var fieldValue:any  = this.entityObject.getFieldValue(this.entityMetadata[i].fieldName)
                var cont: boolean = !this.filter || this.filter.length == 0 || this.entityMetadata[i].fieldLabel.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
                if (!cont)
                    cont = fieldValue && fieldValue.toString().toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
                if (cont)
                    str+=this.renderField(this.entityMetadata[i],fieldValue);
            }
             this.fieldsList.html(str);
        }

        private renderField(field: EntityMetadata, fieldValue: any): string {
            var strValue: string;
            if (field.dataType.toLowerCase().indexOf("date")>=0)
                strValue=(new Date(fieldValue)).toLocaleDateString();
            else
                strValue=fieldValue;

            var strAppend: string = "<li><b>" + field.fieldLabel + "</b>";
            strAppend += " : " + strValue + "</li><hr>";

            return strAppend;
        }
   }
}