import http from 'k6/http';
import { check } from 'k6';
import { BaseClass } from './../../helpers/BaseClass.js'

export class Character extends BaseClass{
    constructor(endpoint){
        super(endpoint)
        this.url = this.url.concat('character/')
    }

    getAllCharacters(){
        console.log(`Sending GET ${this.url}`);
        this.result = http.get(this.url)
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );
        this.checkResponseStatus();
    }

    getFirstCharacter(){
        var firstCharacterId = this.getFirstCharacterId();
        if(isNaN(firstCharacterId))
        {
            throw new Error('Missing character ID');
        }
        console.log(`Sending GET ${this.url.concat(firstCharacterId)}`);
        this.result = http.get(this.url.concat(firstCharacterId))
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );
        
        if(this.result.status != 200){
            console.error(`GET ${this.url.concat(firstCharacterId)} failed with HTTP code ${this.result.status}`);
        }
    }

    getFirstCharacterId(){
        return this.result.json().results[0].id
    }
}