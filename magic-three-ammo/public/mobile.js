import {byId} from "./magic/utility.js";

export const mobileAdaptation = {

	testExperimental: {
		testBT: async function() {
			navigator.permissions.query({name: "bluetooth"}).then((e) => {
				alert('ok , '+ e)
				console.log('WHAT ', e)
			}).catch((err) => {
				alert('err , '+ err)
				console.log('WHAT ', err)
			});

			// if(btPermission.state !== "denied") {
			// 	// Do something
			// 	alert('Test BT', btPermission)
			// } else {
			// 	alert('Test BT', btPermission)
			// }
		}
	},
	fixStyle: () => {




		// App.label.get.about = '🛈';

		byId('desktopAbout').remove();

		// App.label.update()
	}
}