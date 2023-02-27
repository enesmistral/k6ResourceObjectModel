import http from 'k6/http';
import { check } from 'k6';
import { BaseClass } from './../../helpers/BaseClass.js'

export class Episode extends BaseClass{
    constructor(endpoint){
        super(endpoint)
        this.url = this.url.concat('episode/')
    }

    getAllEpisodes(){
        console.log(`Sending GET ${this.url}`);
        this.result = http.get(this.url)
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );
        this.checkResponseStatus();
    }

    getFirstEpisode(){
        var firstEpisodeId = this.getFirstEpisodeId();
        if(isNaN(firstEpisodeId))
        {
            throw new Error('Missing character ID');
        }
        console.log(`Sending GET ${this.url.concat(firstEpisodeId)}`);
        this.result = http.get(this.url.concat(firstEpisodeId))
        check(this.result, 
            { 
                'status was 200': (r) => r.status == 200 
            }
        );

        if(this.result.status != 200){
            console.error(`GET ${this.url.concat(firstEpisodeId)} failed with HTTP code ${this.result.status}`);
        }
    }

    getFirstEpisodeId(){
        return this.result.json().results[0].id
    }
}