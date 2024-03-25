import { OrbitControls } from "@react-three/drei";
import { BearExperience } from "./BearExperience";
import { useRef } from "react";
import * as THREE from "three";

const ScenarioExperience = (): React.ReactElement => {
	const floor = useRef<THREE.Mesh | null>(null);

	return (
		<>
			<OrbitControls
				maxAzimuthAngle={Math.PI / 4}
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 2.5}
				minDistance={2}
			/>

			<directionalLight castShadow position={[5, 2, 3]} intensity={0.5} />

			<ambientLight intensity={0.4} />

			<mesh ref={floor} position-y={0} rotation-x={-Math.PI * 0.5} scale={10} receiveShadow>
				<planeGeometry args={[1.5, 1]} />
				<meshStandardMaterial color="#31cc9a" />
			</mesh>

			<BearExperience position-x={0} position-y={0} position-z={0} scale={0.5} floor={floor} />
		</>
	);
};

//si cambiamos la sacale del oso podemos ajustar el tamaño del oso en la escena
export default ScenarioExperience;
