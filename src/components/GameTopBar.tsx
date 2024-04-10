import { useEffect, useState } from "react";
import Game from "../game/Game";

const GameTopBar = (props: { game: Game; isMissionActive: Boolean; missions: Array<any> }): React.ReactElement => {
    const { game, isMissionActive, missions } = props;
    const [missionActive, setMissionActive] = useState(Object);

    useEffect(() => {
        const missionInProgress = missions.find(mission => mission.id === game.getMissionInProgress());

        if (missionInProgress) setMissionActive(missionInProgress);

    }, [isMissionActive])


    return (
        <>
            <div className="border-2 border-red-600 py-2">
                {game.getMissionInProgress() === 'none' ?
                    <p>Money: {game.money}</p>
                    :
                    <p>{missionActive.name}: {missionActive.goal - game.missionProgress}</p>
                }
            </div>
        </>
    );
};

export default GameTopBar;
