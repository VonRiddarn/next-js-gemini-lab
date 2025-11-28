"use client";
import { queryGemini } from "@/utils/gemini";
import { useState } from "react";

export default function Home() {
	const [prompt, setPrompt] = useState("");
	const [ans, setAns] = useState("NO ANSWER");
	const [img, setImg] = useState("");

	return (
		<div>
			<h1>Clothing describer!</h1>
			<input
				type="text"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
				placeholder="Additional instructions"
			/>
			<br />
			<input
				type="text"
				value={img}
				onChange={(e) => setImg(e.target.value)}
				placeholder="Image link..."
			/>
			<br />
			{img && <img src={img} alt="No image linked" style={{ width: "150px" }} />}
			<br />
			<button
				onClick={async () => {
					try {
						setAns("Generating...");
						if (img) {
							const result = await queryGemini(prompt, img);
							setAns(result ?? "NO ANSWER");
						} else setAns("NO IMAGE PROVIDEDD!");
					} catch (error) {
						console.error(error);
						setAns("Error: Check console (Likely CORS or API Key issue)");
					}
				}}
			>
				Generate
			</button>
			<hr />
			<div dangerouslySetInnerHTML={{ __html: ans }} />
		</div>
	);
}
