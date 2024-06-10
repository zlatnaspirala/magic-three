import {setCssVar} from "./utility.js"

export class MagicTheme {

	constructor() {

		addEventListener("theme", (e) => {
			// Threme
			console.log('THEME ', e)
			setCssVar("--bg", "red")
		})
	}

}