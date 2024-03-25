//Componente de prueba para probar el testing en front con algo que no sea three related

const HelloWorld = (): React.ReactElement => {
	const hello = (): void => {
		console.log("hello world");
	};

	return (
		<div className="w-full mt-2 flex justify-center">
			<button
				onClick={hello}
				className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-6 border-b-4 border-blue-700 hover:border-blue-500 rounded"
			>
				Work!
			</button>
		</div>
	);
};

export default HelloWorld;
