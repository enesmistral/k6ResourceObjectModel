import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate } from 'k6/metrics';

export const options = {
    vus: 10000,
    //duration: '10s',
};

export let errorRate = new Rate('errors');

export function setup() {
    console.log(">>>>>>>>>> STARTING <<<<<<<<<<<<");
}

export default function () {
    check(http.get('https://rickandmortyapi.com/api'), 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);
    
    let allCharacters = http.get('https://rickandmortyapi.com/api/character');
    check(allCharacters, 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);

    check(http.get('https://rickandmortyapi.com/api/character/'.concat(allCharacters.json().results[0].id)), 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);

    let allLocations = http.get('https://rickandmortyapi.com/api/location/')
    check(allLocations, 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);

    check(http.get('https://rickandmortyapi.com/api/location/'.concat(allLocations.json().results[0].id)), 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);

    var allEpisodes = http.get('https://rickandmortyapi.com/api/episode/');
    check(allEpisodes, 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);

    check(http.get('https://rickandmortyapi.com/api/episode/'.concat(allEpisodes.json().results[0].id)), 
        { 
            'status was 200': (r) => r.status == 200 
        }
    );
    sleep(1);
}

export function teardown(data) {
    console.log(">>>>>>>>>> TESTING COMPLETED <<<<<<<<<<<<");
}
