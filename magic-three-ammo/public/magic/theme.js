import {setCssVar} from "./utility.js"

export class MagicTheme {

	Light() {
		setCssVar("--bg", "whitesmoke")
		setCssVar("--text", "hsl(0deg 0% 14.33%)")
		setCssVar("--text2", "unset")
		setCssVar("--err", "orangered")
		setCssVar("--bgBlocker", "rgba(150, 150, 150, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#ff6f00,#b5830f,#df494b,#fff,#fff,#e90b0f)")
		setCssVar("--mainFont", "Accuratist")

		setCssVar("--mainDivBorder", "inset 0 0 35px 5px rgba(0,0,0,0.25), inset 0 2px 1px 1px rgba(255,255,255,0.9), inset 0 -2px 1px rgba(0,0,0,0.25);")

		setCssVar("--strokeText", "black")
		setCssVar("--textFill", "unset")
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

		setCssVar("--mainDivBorder", "inset 0 0 35px 5px rgba(0,0,0,0.25), inset 0 2px 1px 1px rgba(255,255,255,0.9), inset 0 -2px 1px rgba(0,0,0,0.25);")

		setCssVar("--strokeText", "3px rgb(52, 52, 52)")
		setCssVar("--textFill", "rgb(255, 77, 0)")
	}

	Green() {
		setCssVar("--bg", "#000")
		setCssVar("--text", "hsl(107.39deg 82.83% 47.02%)")
		setCssVar("--text2", "rgb(42 199 49)")
		setCssVar("--err", "red")
		setCssVar("--bgBlocker", "rgba(10, 10, 10, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#10f30f,#fff,#10f30f,#000000,#10f30f,#000000)")
		setCssVar("--mainFont", "Accuratist")

		setCssVar("--mainDivBorder", "-1px 0px 19px 4px rgba(0,0,0,0.62) inset")

		setCssVar("--strokeText", "unset")
		setCssVar("--textFill", "unset")
	}

	Orange() {
		setCssVar("--bg", "#000")
		setCssVar("--text", "#fff")
		setCssVar("--text2", "rgb(255 122 0)")
		setCssVar("--err", "red")
		setCssVar("--bgBlocker", "rgba(10, 10, 10, 0.9)")
		setCssVar("--bgTransparent1", "rgba(0, 0, 0, 0.1)")
		setCssVar("--LG1", "linear-gradient(87deg,#f31a0f,#fff,#f31a0f,#000000,#f31a0f,#000000)")
		setCssVar("--mainFont", "closeness")

		setCssVar("--mainDivBorder", "-1px 0px 19px 4px rgba(0,0,0,0.62) inset")

		setCssVar("--strokeText", "3px rgb(255 122 0)")
		setCssVar("--textFill", "#000")

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

		setCssVar("--mainDivBorder", "-1px 0px 19px 4px rgba(0,0,0,0.62) inset")

		setCssVar("--strokeText", "3px black")
		setCssVar("--textFill", "#ff3322")

	}

	constructor() {
		addEventListener("theme", (e) => {
			this[e.detail]();
		})
	}

}