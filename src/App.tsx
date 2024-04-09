import ScenarioExperience from "./components/ScenarioExperience";
import { Canvas } from "@react-three/fiber";
import useGame from "./game/useGame";
import GameTopBar from "./components/GameTopBar";
import { useEffect, useState } from "react";
import GameMainBar from "./components/GameMainBar";
import MissionsMenu from "./components/MissionsMenu";

const App = (): React.ReactElement => {
	const { game, missionsList, saveGame /*enhancementsList*/ } = useGame();
	const [missionActivated, setMissionActivated] = useState<boolean>(false);
	const [clicksCounter, setClicksCounter] = useState(0);
	const [secondsPassed, setSecondsPassed] = useState(0);
	const [view, setView] = useState('main')

	useEffect(() => {
		game?.getMissionInProgress() !== 'none' ? setMissionActivated(true) : setMissionActivated(false);

		const interval = setInterval(() => {
			setSecondsPassed(prevSeconds => prevSeconds + 1);
		}, 1000);
		return () => clearInterval(interval);

	}, [])

	const handleActivateMissions = (id: string) => {
		const missionInProgress = game?.getMissionInProgress();
		const isCancelNeeded = missionInProgress !== 'none' && missionInProgress !== id;
		let missionToStop = id;
		if (missionInProgress && isCancelNeeded) missionToStop = missionInProgress;
		try {
			game?.deleteMission(missionToStop)
			setMissionActivated(false);
			if (isCancelNeeded) {
				game?.updateMissions(id)
				setMissionActivated(true);
			}
		} catch {
			game?.updateMissions(id)
			setMissionActivated(true);
		}

		saveGame();
	}

	useEffect(() => {
		if (secondsPassed % 1 === 0) {
			game?.gameOnIdle();
			saveGame();
		}
	}, [secondsPassed]);

	const handleGameClick = (): void => {
		const missionProgressControl = game?.missionProgress;
		game?.gameOnClick();
		if (missionProgressControl !== 0 && game?.missionProgress === 0) setMissionActivated(false);
		setClicksCounter(clicksCounter + 1);
		saveGame();
	}

	const handleToMissionsClick = (): void => {
		setView('missions')
	}

	const handleToEnhancementsClick = (): void => {
		setView('enhance')
	}

	const handleToMainClick = (): void => {
		setView('main')
	}

	return (
		<>
			{
				view === 'main' && <div className="w-screen h-screen text-center text-3xl">
					{game && <GameTopBar game={game} isMissionActive={missionActivated} missions={missionsList} />}
					<div className="h-4/6">
						<Canvas
							dpr={[1, 2]}
							shadows
							orthographic
							camera={{
								//fov: 80,
								zoom: 90,
								near: 0.1,
								far: 200,
								position: [8, 4, 8],
							}}
						>
							<ScenarioExperience />
						</Canvas>
					</div>
					{game && <GameMainBar game={game} onWorkClick={handleGameClick} onMenuClick={handleToMissionsClick} />}
				</div>
			}
			{
				(game && view === 'missions') && <MissionsMenu game={game} isMissionActive={missionActivated} missions={missionsList} onClose={handleToMainClick} onEnhancements={handleToEnhancementsClick} onActivateMission={handleActivateMissions} />
			}

		</>
	);
};

export default App;
