import { sleep } from 'k6';
import { Rate } from 'k6/metrics';
import { Api } from './resourceObjectModel/api/Api.js';
import { Character } from './resourceObjectModel/api/character/Character.js';
import { Location } from './resourceObjectModel/api/location/Location.js';
import { Episode } from './resourceObjectModel/api/episode/Episode.js';
import { testConfig } from './config.js';

export const options = testConfig.testScenario.stages20vus;
const environment = testConfig.environment.dev;

var api = new Api(environment.url);
var characters = new Character(environment.url);
var locations = new Location(environment.url);
var episodes = new Episode(environment.url);

export let errorRate = new Rate('Failed Requests');

export function setup() {
    console.log(">>>>>>>>>> STARTING <<<<<<<<<<<<");
}

export default function () {
    api.getEndpoints();
    errorRate.add(!api.getResult());
    sleep(1);
    
    characters.getAllCharacters();
    errorRate.add(!characters.getResult());
    sleep(1);

    characters.getFirstCharacter();
    errorRate.add(!characters.getResult());
    sleep(1);

    locations.getAllLocations();
    errorRate.add(!locations.getResult());
    sleep(1);

    locations.getFirstLocation();
    errorRate.add(!locations.getResult());
    sleep(1);

    episodes.getAllEpisodes();
    errorRate.add(!episodes.getResult());
    sleep(1);

    episodes.getFirstEpisode();
    errorRate.add(!episodes.getResult());
    sleep(1);
}

export function teardown(data) {
    console.log(">>>>>>>>>> TESTING COMPLETED <<<<<<<<<<<<");
}
