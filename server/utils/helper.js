const generateAvatar = () => {
	const avatarArray = [
		"Ginger",
		"Lilly",
		"Casper",
		"Zoey",
		"Midnight",
		"Cleo",
		"Bandit",
		"Smokey",
	];
	const randomIndex = Math.floor(Math.random() * avatarArray.length);
	const avatarSrc = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${avatarArray[randomIndex]}&radius=50&backgroundColor=b6e3f4`;
	return avatarSrc;
};

export { generateAvatar };
