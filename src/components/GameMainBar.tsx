import Game from "../game/Game";

const GameMainBar = (props: { game: Game; }): React.ReactElement => {
    const { game, } = props;


    return (
        <>
            <div className="border-2 border-red-600 flex flex-col gap-2">
                <p>Hunger: {game.hunger}%</p>
                <p>Happy: {game.happiness}%</p>
                <div className="flex flex-row gap-3 justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded w-fit"
                    >
                        Work!
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 rounded w-fit"
                    >
                        M&E
                    </button>
                </div>
            </div>
        </>
    );
};

export default GameMainBar;
