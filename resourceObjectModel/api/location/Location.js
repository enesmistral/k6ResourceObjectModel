import http from 'k6/http';
import { check } from 'k6';
import { BaseClass } from './../../helpers/BaseClass.js'

export class Location extends BaseClass{
    constructor(endpoint){
        super(endpoint)
        this.url = this.url.concat('location/')
    }

    getAllLocations(){
        console.log(`Sending GET ${this.url}`);
        this.result = http.get(this.url)
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );
        this.checkResponseStatus();
    }

    getFirstLocation(){
        var firstLocationId = this.getFirstLocationId();
        if(isNaN(firstLocationId))
        {
            throw new Error('Missing location ID');
        }
        console.log(`Sending GET ${this.url.concat(firstLocationId)}`);
        this.result = http.get(this.url.concat(firstLocationId))
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );

        if(this.result.status != 200){
            console.error(`GET ${this.url.concat(firstLocationId)} failed with HTTP code ${this.result.status}`);
        }
    }

    getFirstLocationId(){
        return this.result.json().results[0].id
    }
}