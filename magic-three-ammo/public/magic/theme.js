import {setCssVar} from "./utility.js"

export class MagicTheme {

	Light() {
		setCssVar("--bg", "#6b6b6b33")
		setCssVar("--text", "hsl(1, 20%, 100%)")
		setCssVar("--text2", "rgb(0, 0, 0)")
		setCssVar("--err", "orangered")
		setCssVar("--bgBlocker", "rgba(150, 150, 150, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#ff6f00,#b5830f,#df494b,#fff,#fff,#e90b0f)")
		setCssVar("--mainFont", "Accuratist")
	}

	Dark() {
		setCssVar("--bg", "#0d2d4e")
		setCssVar("--text", "hsl(9, 82%, 42%)")
		setCssVar("--text2", "orangered")
		setCssVar("--err", "red")
		setCssVar("--bgBlocker", "rgba(10, 10, 10, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#00b3ff,#510fb5,#49cbdf,#000000,#000000,#1d0be9)")
		setCssVar("--mainFont", "stormfaze")
	}

	Green() {
		setCssVar("--bg", "#000")
		setCssVar("--text", "hsl(107.39deg 82.83% 47.02%)")
		setCssVar("--text2", "rgb(42 199 49)")
		setCssVar("--err", "red")
		setCssVar("--bgBlocker", "rgba(10, 10, 10, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#10f30f,#fff,#10f30f,#000000,#10f30f,#000000)")
		setCssVar("--mainFont", "WARGAMES")
	}

	Orange() {
		setCssVar("--bg", "#000")
		setCssVar("--text", "#fff")
		setCssVar("--text2", "rgb(255 122 0)")
		setCssVar("--err", "red")
		setCssVar("--bgBlocker", "rgba(10, 10, 10, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#f31a0f,#fff,#f31a0f,#000000,#f31a0f,#000000)")
		setCssVar("--mainFont", "WARGAMES")
	}

	Blood() {
		setCssVar("--bg", "#ff3322")
		setCssVar("--text", "black")
		setCssVar("--text2", "rgb(255, 253, 192)")
		setCssVar("--err", "red")
		setCssVar("--bgBlocker", "rgba(10, 10, 10, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#00b3ff,#510fb5,#49cbdf,#000000,#000000,#1d0be9)")
		setCssVar("--mainFont", "stormfaze")
	}

	constructor() {
		addEventListener("theme", (e) => {
			this[e.detail]();
		})
	}

}