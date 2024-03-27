/*TODO: Add documentation*/
export const MISSIONS: { id: string, name: string, description: string, reward: { type: string, value: number } }[] = [
    {
        id: "T001",
        name: "Tutorial",
        description: "Welcome to the game, let's see how do you play",
        reward: {
            type: "happiness",
            value: 10
        }
    },
    {
        id: "T002",
        name: "First job",
        description: "You may be new, but any client expects the best!",
        reward: {
            type: "money",
            value: 20
        }
    },
];