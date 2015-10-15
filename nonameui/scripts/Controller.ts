/// <reference path="./SearchField.ts" />
module Application {
    export class Controller implements SearchFieldSelectEventHandler {
        private app: kendo.mobile.Application;
        private navBar: JQuery = $("#navbar");
        private homeView: JQuery = $("#home");
        private detailsView: JQuery = $("#details");
        private searchField: SearchField = new SearchField(this);

        constructor(app: kendo.mobile.Application) {
            this.app = app;
            /*
            this.DetailsView.bind("show", (e) => {
                this.onDetailsViewShow(e);
            });
            */
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

        private onDetailsViewShow(e: kendo.mobile.ui.ViewShowEvent): void {
            
        }

        private onTabStripSelect(e: kendo.mobile.ui.TabStripSelectEvent): void {
            if (e==null || e.item[0].hash == "#details"){
            }
        }

        private onSearchFieldSelect(): void {
            this.app.navigate("#details");
            //this.TabStrip.switchTo("#details");
            //this.onTabStripSelect(null);
        }

    }
}