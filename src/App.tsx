import HelloWorld from "./components/HelloWorld";
import ScenarioExperience from "./components/ScenarioExperience";
import { Canvas } from "@react-three/fiber";
import useGame from "./game/useGame";
import GameTopBar from "./components/GameTopBar";
import { useEffect, useState } from "react";

const App = (): React.ReactElement => {
	const { game, missionsList, enhancementsList, saveGame } = useGame();
	const [missionsActivated, setMissionsActivated] = useState<boolean>(false);

	useEffect(() => {
		if (game?.getMissionInProgress() !== 'none') setMissionsActivated(true)
	}, [])

	/*const handleActivateMissions = (id: string) => {
		game?.updateMissions(id)
		saveGame();
		setMissionsActivated(true);
	}*/

	return (
		<>
			<div className="w-screen h-screen text-center text-3xl">
				{game && <GameTopBar game={game} isMissionActive={missionsActivated} missions={missionsList} />}
				<div className="h-5/6">
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
				<HelloWorld />
			</div>
		</>
	);
};

export default App;
