import { useEffect, useState } from "react";
import Game from "../game/Game";

const MissionsMenu = (props: { game: Game; isMissionActive: Boolean; missions: Array<any>, onClose: Function; onEnhancements: Function, onActivateMission: Function }): React.ReactElement => {
    const { game, isMissionActive, missions, onClose, onEnhancements, onActivateMission } = props;
    const [missionActive, setMissionActive] = useState('');

    useEffect(() => {
        const missionInProgress = game.getMissionInProgress();
        if (missionInProgress) setMissionActive(missionInProgress);

    }, [isMissionActive, onActivateMission])


    return (
        <>
            <section className="border-2 border-red-600 py-2 px-2 h-screen w-full flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <button onClick={() => onClose()} className="rounded-full text-2xl border px-3 border-red-500 text-red-500">x</button>
                    <button onClick={() => onEnhancements()} className="rounded-full text-2xl border px-3 border-white text-white">To Enhancements</button>
                </div>
                <h1 className="text-3xl font-bold">Missions:</h1>
                {
                    missions.map((mission) => (
                        <article key={mission.id} className="flex flex-col gap-0.5">
                            <h2 className="text-xl font-bold">{mission.name}:</h2>
                            <p className="flex flex-row justify-between">
                                {mission.description}- GOAL {mission.goal} - REWARD {mission.reward.value} {mission.reward.type}
                                {
                                    game.missions[mission.id] === true ? <b>COMPLETED</b> :
                                        <button onClick={() => onActivateMission(mission.id)} className="hover:text-blue-500">{mission.id === missionActive ? 'Cancel' : 'Activate'}</button>
                                }
                            </p>
                        </article>
                    ))
                }

            </section>
        </>
    );
};

export default MissionsMenu;
