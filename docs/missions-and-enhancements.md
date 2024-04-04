# Missions and Enhancements

To add missions or enhancements you need to add the `object` to its array in the file `constants.ts` in the folder `game`.

```
└── src
    └── game
        └── constant.ts
```

Those new missions and enhancements need to follow the rules or the tests will fail on push. To check if you are applying all the tests you can have them running while working. So, thanks to vitest, every time you save will test if everything is alright.

```sh
npm run test
```

## Missions

All new missions should have the following structure:
```js
    {
        id: "" /*should be unique*/,
        name: "" /*short and descriptive*/,
        description: "" /*relevant, fun details*/,
        goal: 0 /*the higher, the harder the mission is*/,
        reward: {
            type: "" /*what variable updates*/,
            value: 0 /*how much does update it updates*/
        }
    }
```
### ID

The mission id has the structure of an uppercase letter and three numbers, as the following:
- **T###** marks a mission as part of the tutorial.
- **M###** marks a mission as main, relevant.
- **S###** masrks a mission as secundary.

### Goal

The goal should always be higher than the default click-money value, to ensure it requires to at least click twice.

### Reward
The reward is always a positive number that will be added to a stat, and its type should be one of those:
- happiness
- money

## Enhancements

All new enhancements should have the following structure:
```js
    {
        id: "" /*should be unique*/,
        name: "" /*short and descriptive*/,
        description: "" /*relevant, fun details*/,
        effect: {
            type: "" /*what variable updates*/,
            value: 0 /*how much does update it updates*/
        }
    }
```
### ID

The enhancements id is a unique number between **000** and **999** (both included).

### Effect
The effect is always a positive number that will be added to an update value, and its type should be one of those:
- recover-hunger
- lose-hunger
- recover-happiness
- lose-happiness
- click-money
- idle-money

The complete add up of all this effects has to respect the "max-values" set in game constats:

```js
    {
    'recover-hunger': 99.99,
    'lose-hunger': 0.01,
    'recover-happiness': 99.99,
    'lose-happiness': 0.01,
    }
```

