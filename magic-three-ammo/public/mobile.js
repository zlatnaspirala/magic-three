import {byId} from "./magic/utility.js";

export const mobileAdaptation = {
	testExperimental: {
		testBT: async function() {
			navigator.permissions.query({name: "bluetooth"}).then((e) => {
				// alert('ok ' + e)
				console.log('[bluetooth] ', e)
			}).catch((err) => {
				// alert('err ' + err)
				console.log('[bluetooth] ', err)
			})
		},
		catchHacker: async () => {
			// console.log(`iW: ${window.innerWidth}  oW: ${window.outerWidth}`)
			if(window.outerWidth != window.innerWidth) {
				var delta = window.outerWidth - window.innerWidth
				if(delta > 18) {
					// console.log('RISK LEVEL')
					dispatchEvent(new CustomEvent(`F12`, {detail: 'OPENED_DEBBUGER_BEFORE_LOAD'}))
				}
			} else {
				// console.log('NORMAL SCREEN')
			}
			window.addEventListener("keydown", (event) => {
				if(event.code == 'F12' || event.key == 'F12') {
					// console.log('RISK F12', event)
					dispatchEvent(new CustomEvent(`F12`, {detail: 'OPENED_DEBBUGER_KEYBOARD'}))
				}
			});
		}
	},
	fixStyle: () => {
		// App.label.get.about = '🛈';
		byId('desktopAbout').remove();
		// App.label.update()
	}
}