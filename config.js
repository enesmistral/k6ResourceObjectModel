export const testConfig =
{
    testScenario: {
        singleRun: {
            vus: 1
        },
        stages20vus: {
            maxVUs: 20,
            stages:[
                {
                    duration: '1m',
                    target: 10
                },
                {
                    duration: '30s',
                    target: 20
                }
            ]
        },
        ramping20vus: {
            startVUs: 0,
            stages: [
                {
                    duration: '30s',
                    target: 20
                }
            ],
            gracefulRampDown: '10s' 
        }
    },
    environment: {
        prod: {
            url: 'https://rickandmortyapi.com'
        },
        dev: {
            url: 'https://qa.rickandmortyapi.com'
        },
        staging: {
            url: 'https://stage.rickandmortyapi.com'
        }
    }
}