module Application {

    export interface EntityObjectListener {
        EntityObjectListener_dataReceived();
    }

    export class EntityObject {
        private baseUrl: string;
        private listener: EntityObjectListener;
        private objectData;

        constructor(baseUrl: string,listener: EntityObjectListener) {
            this.baseUrl = baseUrl;
            this.listener=listener;
        }

        public get(searchResultObject: SearchResultObject): void {
            if (this.runningCall != null && this.runningCall.status != XMLHttpRequest.DONE)
                this.runningCall.abort();

            var objType: string[] = searchResultObject.objectType.split(".");
            this.runningCall = $.get(this.baseUrl + "/noname/" + objType[objType.length - 1].toLowerCase().substr(1) + "?" + searchResultObject.objectKey.replace("|", "&"), null, (res, code) => { this.onServicecallReturn(res, code); }, "json");
        }
        
        private onServicecallReturn(res, code) {
            this.objectData=res;
            console.dir(res);
            this.runningCall = null;
            if (this.listener)
                this.listener.EntityObjectListener_dataReceived();
        }

        public getFieldValue(fieldName: string): any {
            if (this.objectData) {
                for (var property in this.objectData) {
                    if (property.toLowerCase()==fieldName && this.objectData.hasOwnProperty(property)){
                        return this.objectData[property];
                    }
                }
            }
        }
    }
}