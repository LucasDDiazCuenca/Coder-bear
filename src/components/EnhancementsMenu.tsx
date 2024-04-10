import { useEffect } from "react";
import Game from "../game/Game";

const EnhancementsMenu = (props: { game: Game; onClose: Function; onMissions: Function; enhancements: Array<any>, save: Function }): React.ReactElement => {
    const { game, onClose, onMissions, enhancements, save } = props;
    const updateValues = game.getGameUpdateValues();

    const onUnlockEnhancement = (id: string): void => {
        game.updateEnhancements(id);
        save();
    }

    useEffect(() => { }, [onUnlockEnhancement])

    return (
        <section className="border-2 border-red-600 py-2 px-2 h-screen w-full flex flex-col gap-2">
            <div className="flex flex-row justify-between">
                <button onClick={() => onClose()} className="rounded-full text-2xl border px-3 border-red-500 text-red-500">x</button>
                <button onClick={() => onMissions()} className="rounded-full text-2xl border px-3 border-white text-white">To Missions</button>
            </div>
            <div>
                <h1 className="text-3xl font-bold">Current stats:</h1>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(updateValues).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
            <h1 className="text-3xl font-bold">Enhancements:</h1>
            {
                enhancements.map((enhancement) => (
                    <article key={enhancement.id} className="flex flex-col gap-0.5">
                        <h2 className="text-xl font-bold">{enhancement.name}:</h2>
                        <p className="flex flex-row justify-between">
                            {enhancement.description}- PRICE {enhancement.price} -  {enhancement.effect.value} {enhancement.effect.type}
                            {
                                game.enhancements.includes(enhancement.id) ? <b>UNLOCKED</b> : enhancement.price > game.money ? <b className="text-red-500">Too expensive</b> :
                                    <button onClick={() => onUnlockEnhancement(enhancement.id)} className="hover:text-blue-500">Buy</button>
                            }
                        </p>
                    </article>
                ))
            }
        </section>
    );
};

export default EnhancementsMenu;
