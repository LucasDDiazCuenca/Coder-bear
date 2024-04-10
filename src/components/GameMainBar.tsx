import Game from "../game/Game";

const GameMainBar = (props: { game: Game; onWorkClick: Function; onMenuClick: Function }): React.ReactElement => {
    const { game, onWorkClick, onMenuClick } = props;


    return (
        <>
            <div className="border-2 border-red-600 flex flex-col gap-2">
                <p>Hunger: {game.hunger}%</p>
                <p>Happy: {game.happiness}%</p>
                <div className="flex flex-row gap-3 justify-center">
                    <button
                        onClick={game?.hunger > 0 ? () => onWorkClick() : () => null}
                        className={`${game?.hunger > 0 ? 'bg-blue-500 hover:bg-blue-400 text-white' : 'bg-blue-100 text-red-500 pointer-events-none'} font-bold py-2 px-6 w-fit`}
                    >
                        Work!
                    </button>
                    <button
                        onClick={() => onMenuClick()}
                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6  w-fit"
                    >
                        M&E
                    </button>
                </div>
            </div>
        </>
    );
};

export default GameMainBar;
