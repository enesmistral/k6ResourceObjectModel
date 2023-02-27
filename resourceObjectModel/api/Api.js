import http from 'k6/http';
import { check } from 'k6';
import { BaseClass } from './../../helpers/BaseClass.js'

export class Api extends BaseClass {
    constructor(endpoint){
        super(endpoint)
    }

    getEndpoints(){
        console.log(`Sending GET ${this.url}`);
        this.result = http.get(this.url)
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );
        this.checkResponseStatus();
    }
}