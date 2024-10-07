import {byId, HeaderTypes, jsonHeaders} from "../utility.js";

export class RCSAccount {

	apiDomain = "https://maximumroulette.com";

	constructor() {
		this.visitor()
	}

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
			emailField: (byId('arg-email') != null ? byId('arg-email').value : null),
			passwordField: (byId('arg-pass') != null ? byId('arg-pass').value : null)
		}

		var response = fetch(route + '/rocket/login', {
			method: 'POST',
			headers: JSON_HEADER,
			body: JSON.stringify(args)
		}).then((d) => {
			return d.json();
		}).then((r) => {
			this.exploreResponse(r);
		}).catch((err) => {
			console.log('ERR', err)
			setTimeout(() => {
				this.preventDBLOG = false;
				this.preventDBREG = false;
				byId('loginBtn-real').disabled = false;
				byId('registerBtn-real').disabled = false;
			}, 500)
			return;
		})
	}

	async visitor() {
		if (localStorage.getItem("visitor") == 'welcome') return;
		let route = this.apiDomain;
		let args = {
			email: (byId('arg-email') != null ? byId('arg-email').value : 'no-email'),
			userAgent: navigator.userAgent.toString(),
			fromUrl: location.href.toString()
		}
		var response = fetch(route + '/rocket/visitors', {
			method: 'POST',
			headers: jsonHeaders,
			body: JSON.stringify(args)
		}).then((d) => {
			return d.json();
		}).then((r) => {
			console.log('.................' + r);
			// localStorage.getItem("visitor")
		}).catch((err) => {console.log('ERR', err)})
	}
}