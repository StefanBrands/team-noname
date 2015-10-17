module Application {
    export interface EntityMetadataAdapterListener {
        EntityMetadataAdapterListener_entityMetadataReceived(entityMetadata: EntityMetadata[]);
    }
    
    export interface EntityMetadata {
    	fieldName: string;
    	fieldLabel:string;
    	dataType: string;
    }    
    
    export class EntityMetadataAdapter {
        private app: kendo.mobile.Application;
        private baseUrl: string;
        private listener: EntityMetadataAdapterListener;
        private runningCall: XMLHttpRequest;

        constructor(app: kendo.mobile.Application, baseUrl: string, listener: EntityMetadataAdapterListener) {
            this.app=app;
            this.baseUrl = baseUrl;
            this.listener = listener;
        }

        public get(entityUri: string): void {
             if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                 this.runningCall.abort();
             this.app.showLoading();
             this.runningCall = $.get(this.baseUrl+"/noname/entitymetadata?entityUri=" + entityUri, null, (res, code) => { this.onServicecallReturn(res, code); }, "json");
            
        }
        
        private onServicecallReturn(res, code) {
            if (this.listener)
                this.listener.EntityMetadataAdapterListener_entityMetadataReceived(<EntityMetadata[]>res);
            console.dir(res);
            this.runningCall=null;
            this.app.hideLoading();
        }
    }
}