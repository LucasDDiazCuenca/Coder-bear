/*TODO: Add documentation, check tests for guideline*/
export const MISSIONS: { id: string, name: string, description: string, objective: number, reward: { type: string, value: number } }[] = [
    {
        id: "T001",
        name: "Tutorial",
        description: "Welcome to the game, let's see how do you play",
        objective: 20,
        reward: {
            type: "happiness",
            value: 10
        }
    },
    {
        id: "T002",
        name: "First job",
        description: "You may be new, but any client expects the best!",
        objective: 120,
        reward: {
            type: "money",
            value: 500
        }
    },
];

export const ENHANCEMENTS: { id: string, name: string, description: string, effect: { type: string, value: number } }[] = [
    {
        id: "001",
        name: "Microwave",
        description: "Cooking is easier and faster if you don't really cook at all.",
        effect: {
            type: "lose-hunger",
            value: 0.2
        }
    },
    {
        id: "002",
        name: "Nice plant",
        description: "Looking at it fills you with joy (and determination).",
        effect: {
            type: "recover-happiness",
            value: 2
        }
    },
    {
        id: "003",
        name: "New Computer",
        description: "Work better, earn more",
        effect: {
            type: "idle-money",
            value: 5
        }
    },
];

export const startingUpdateValues: { [key: string]: number } = {
    'recover-hunger': 0.2,
    'lose-hunger': 2,
    'recover-happiness': 5,
    'lose-happiness': 0.5,
    'click-money': 2,
    'idle-money': 0,
}

export const maxUpdateValues: { [key: string]: number } = {
    'recover-hunger': 99.99,
    'lose-hunger': 0.01,
    'recover-happiness': 99.99,
    'lose-happiness': 0.01,
}