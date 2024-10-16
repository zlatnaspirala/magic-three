/**
 * @description Hang3d reborn
 * @author Nikola Lukic
 * @email zlatnaspirala@gmail.com
 */

export var ROCK_RANK = {
	getRank : (points) => {
		points = parseInt(points);
		if (points < 1001) {
			return "junior";
		} else if (points < 2000) {
			return "senior";
		} else if (points < 3000) {
			return "captain";
		} else if (points < 5000) {
			return "general";
		} else {
			return "ultimate-killer";
		}
	},
	getRankMedalImg: (rank) => {
		if (rank == 'junior') {
			return `<img style="height: 60px" src="./assets/icons/medals/1.png" />`;
		} else if (points == 'senior') {
			return `<img style="height: 60px" src="./assets/icons/medals/2.png" />`;
		} else if (points == 'captain') {
			return `<img style="height: 60px" src="./assets/icons/medals/3.png" />`;
		} else if (points == 'general') {
			return `<img style="height: 60px" src="./assets/icons/medals/4.png" />`;
		} else {
			return `<img style="height: 60px" src="./assets/icons/medals/5.png" />`;
		}
	}
};


