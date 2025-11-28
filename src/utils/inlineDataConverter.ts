// Helper function to fetch image and convert to Base64
// Basically, Gemini can't just "look" at the image from the link, so we manually convert it to data and remove the
// "data:image/jpeg;base64," prefix, because "The Gemini API hates that label." - Gemini

export const urlToInlineData = async (url: string) => {
	const response = await fetch(url);
	const blob = await response.blob();

	return new Promise<{ mimeType: string; data: string }>((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64data = reader.result as string;

			// Remove the "data:image/jpeg;base64," prefix
			const base64Content = base64data.split(",")[1];
			resolve({
				mimeType: blob.type,
				data: base64Content,
			});
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
};
