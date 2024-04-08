# Rules for Coder Bear

This is an explicative list of all the logic behind the coder bear game.

## Game Stats and Update Values

The game contains different stats and update values that interact with each other during gameplay. Those are the following:

### Game Stats
- **Hunger** (0-100).
- **Happiness** (0-100).
- **Money** (>0).

### Update Values
- **Lose Hunger** affects <u>negatively</u> to the hunger stat when <u>clicking</u>.
- **Lose Happiness** affects <u>negatively</u> to the happiness stat when <u>clicking</u>.
- **Recover Hunger** affects <u>positively</u> to the hunger stat when <u>idle</u>.
- **Recover Happiness** affects <u>positively</u> to the happiness stat when <u>idle</u>.
- **Click money** determines how much money do you earn by <u>clicking</u>.
- **Idle money** determines how much money do you earn when <u>idle</u>.

## Gameplay

While playing coder bear you can find your self in different situations.

### No mission active

- **Clicking**

When you are working with no mission active every click you make will be extra intensive work, so it will give you money but make you loose happiness and hunger.

If **happiness** reaches 0% you can still work, but you will make half the money for every click.

If **hunger** reaches 0% you won't be able to work, so click will be disabled.

- **Idle**

In the same situation, if you are working with no mission active, while you are idle you will recover happiness and hunger.

Besides, if you have unlock the necesary enhancements, you will also won money while idle.

### Mission active

- **Clicking**

While you have a mission active every click you make will be focused on this mission, so you **won't earn** money but you will progress in said mission. You will still **loose happiness and hunger**, and those have the same effect on mission progress that clicking has on money.

- **Idle**

In oposition with working, being in a mission while idle will only recover stats, no matter what your usual effects on money are while idle. **The only way to complete missions is clicking**.

## Missions and Enhancements

Missions and enhancements give different objectives to the game and are there to create a progression. If you want to add new missions or enhancements to the game, check this [guidelines](./missions-and-enhancements.md).

## Missions

Activating missions and completing them will give you different rewards focused on gaining happiness points or money.

## Enhancements

Buying enhancements with money will improve the different updating values so you recover faster while idle, loose less while clicking, and make more money in general.



