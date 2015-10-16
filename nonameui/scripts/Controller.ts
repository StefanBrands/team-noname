/// <reference path="./SearchField.ts" />
module Application {
    export class Controller implements SearchFieldSelectEventHandler, EntityMetadataAdapterListener,EntityObjectListener {
        private baseUrl: string = "http://localhost:8080";
        private app: kendo.mobile.Application;
        private navBar: JQuery = $("#navbar");
        private homeView: JQuery = $("#home");
        private detailsView: JQuery = $("#details");
        private searchField: SearchField = new SearchField(this.baseUrl,this);
        private entityMetadataAdapter: EntityMetadataAdapter = new EntityMetadataAdapter(this.baseUrl, this);
        private entityObject: EntityObject = new EntityObject(this.baseUrl,this);
        private objectRenderer: ObjectRenderer = new ObjectRenderer(this.baseUrl);
        private entityMetaDataReceived: EntityMetadata[] = null;
        private entityObjectReceived: boolean = false;

        constructor(app: kendo.mobile.Application) {
            this.app = app;
            this.TabStrip.bind("select", (e) => {
                this.onTabStripSelect(e);
            });
        }

        private get TabStrip(): kendo.mobile.ui.TabStrip {
            return this.navBar.data("kendoMobileTabStrip");
        }

        private get HomeView(): kendo.mobile.ui.View {
            return this.homeView.data("kendoMobileView");
        }

        private get DetailsView(): kendo.mobile.ui.View {
            return this.detailsView.data("kendoMobileView");
        }

        private onTabStripSelect(e: kendo.mobile.ui.TabStripSelectEvent): void {
            this.onViewSelected(e.item[0].hash)
        }

        private onSearchFieldSelect(): void {
            this.app.navigate("#details");
            this.onViewSelected("#details");
        }

        private onViewSelected(viewName: string): void {
            if (viewName == "#details") {
                this.entityMetaDataReceived = null;
                this.entityObjectReceived = false;
                this.entityMetadataAdapter.get("urn:be:" + this.searchField.Value.objectType);
                this.entityObject.get(this.searchField.Value);
            }
            else {
                $("#searchField").val("");
            }
        }

        private EntityMetadataAdapterListener_entityMetadataReceived(entityMetadata: EntityMetadata[]) {
            this.entityMetaDataReceived = entityMetadata;
            this.renderEntityObject();
        }

        private EntityObjectListener_dataReceived() {
            this.entityObjectReceived = true;
            this.renderEntityObject();
        }

        private renderEntityObject() {
            if (this.entityMetaDataReceived != null && this.entityObjectReceived) {
                if (this.entityMetaDataReceived.length > 0) {
                    var objType: string[] = this.searchField.Value.objectType.split(".");
                    this.objectRenderer.ObjectTitle = objType[objType.length - 1].substr(1) + " " + this.searchField.Value.objectDescription;
                    this.objectRenderer.MetaData = this.entityMetaDataReceived;
                    this.objectRenderer.DataObject = this.entityObject;
                    this.objectRenderer.render();
                }
            }
        }

    }
}