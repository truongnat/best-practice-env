# best-practice-env

## Motivation

Before I start, I want to talk about why this repo exists.

- When client-side projects have multiple envs of multiple environments, multiple files are needed for each of those environments, but env files adhere to the rule of not being pushed to git. So other programmers when entering the project need to ask for the env of the environment. Or alternatively, the alternative, for example, only 1 deployer who is on leave, must transfer all env files to the replacement. I found that extremely troublesome.

- Even if you have automated deployment, it is not necessary to write a lot of env

- I was thinking that the key of software development, back in the day when the web was developed in the direction of server side rendering, all parameters were configured at the backend, and then divided into client-server, so there was a new state. above


## Solution

- I am developing this method for RESTFul API, and one requirement is that backend applications need to implement apiKey, or end-to-end encryption.

- My idea is simply that all env configurations for the client will be stored in a table of the db, then there will be an api /get-config and the client has to be encrypted to get the config back. it is equivalent to env in client

## Benefits

Before coming to the benefits, I must remind first that the demo here is basic, you need end-to-end encryption to ensure hiding confidential information, the client is responsible for decrypting the information and saving it to the application when running.

- It is not necessary to save too much sensitive information to local-storage, session-storage...
- Can use any variable available in the client without any further configuration.
- When dividing multiple environments, you will have many db's, then you can configure multiple envs without creating as before, just edit in the db.
