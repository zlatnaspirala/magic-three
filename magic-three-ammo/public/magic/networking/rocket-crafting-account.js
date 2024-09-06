

export class RCSAccount {

	apiDomain = "https://maximumroulette.com";

	createDOM = () => {
		var parent = document.createElement('div');

		parent.style = `
		  position: absolute;
			top: 20%;
			left: 35%;
			width: 30%;
			height: 30%;
			padding: 10px 10px 10px 10px;
		`;

		var title = document.createElement('div');
		title.innerHTML = `<h2>Rocket GamePlay Login Form</h2>`;

		var emailLabel = document.createElement('span');
		emailLabel.innerHTML = `Email:`;
		var email = document.createElement('input');
		email.id = 'arg-email';
		var passLabel = document.createElement('span');
		passLabel.innerHTML = `Passw:`;
		var pass = document.createElement('input');
		pass.id = 'arg-pass';

		var loginBtn = document.createElement('button');
		loginBtn.addEventListener('click', () => {
			this.login();
		})

		parent.appendChild(title)
		parent.appendChild(emailLabel)
		parent.appendChild(email)
		parent.appendChild(passLabel)
		parent.appendChild(pass)

		document.body.appendChild(parent)

	}

	async login() {
		let route = this.apiDomain || location.origin;

		let args = {
			emailField: (byID('arg-email') != null ? byID('arg-email').value : null),
			passwordField: (byID('arg-pass') != null ? byID('arg-pass').value : null)
		}

		// if(apiCallFlag == 'confirmation') {
		// 	delete args.passwordField;
		// 	args.tokenField = byID('arg-password').value
		// }

		// if(apiCallFlag == 'forgot-pass') {
		// 	delete args.passwordField;
		// 	console.log("TEST ARG ", args)
		// }

		// if(apiCallFlag == 'set-new-pass') {
		// 	args = {
		// 		emailField: byID('arg-username').value,
		// 		newPassword: byID('arg-new-password').value,
		// 		ftoken: byID('arg-ftoken').value
		// 	}
		// 	console.log("TEST SETNEWPASW ", args)
		// }

		// if(apiCallFlag == 'logout') {
		// 	args = {
		// 		email: LocalSessionMemory.load('my-body-email'),
		// 		token: LocalSessionMemory.load('my-body-token')
		// 	}
		// }

		var response = fetch(route + '/rocket/login', {
			method: 'POST',
			headers: JSON_HEADER,
			body: JSON.stringify(args)
		}).then((d) => {
			return d.json();
		}).then((r) => {
			this.exploreResponse(r);
		}).catch((err) => {
			alert('ERR', err)
			setTimeout(() => {
				this.preventDBLOG = false;
				this.preventDBREG = false;
				byID('loginBtn-real').disabled = false;
				byID('registerBtn-real').disabled = false;
			}, 500)
			return;
		})
	}
}