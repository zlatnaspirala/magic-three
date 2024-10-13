import {mobileAdaptation} from "../../mobile.js";
import {byId, HeaderTypes, isMobile, jsonHeaders, notify, REDLOG} from "../utility.js";

export class RCSAccount {

	apiDomain = "https://maximumroulette.com";

	constructor() {
		this.visitor()

		addEventListener('F12', (e) => {
			console.log(`%c[Debbuger] ${e.detail}`, REDLOG)
			localStorage.removeItem("visitor");
			this.visitor(e.detail)
		})
		mobileAdaptation.testExperimental.catchHacker();

		// 
		// leaderboardBtn
		const leaderboardBtn = document.getElementById('leaderboardBtn');
		leaderboardBtn.addEventListener("click", (e) => {
			e.preventDefault();
		})
	}

	createDOM = () => {
		var parent = document.createElement('div');

		parent.style = `
		  position: absolute;
			top: 20%;
			left: 35%;
			width: 30%;
			height: 36.6%;
			padding: 10px 10px 10px 10px;
			box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
		`;
		if(isMobile) {
			parent.style = `
		position: absolute;
    top: 20%;
    left: 0%;
    width: 100%;
    height: 30%;
    padding: 10px;`;
		}

		parent.id = 'myAccountLoginForm';

		var title = document.createElement('div');
		title.innerHTML = `<h2>Rocket GamePlay Login Form</h2>`;

		var content = document.createElement('div');
		content.style.display = 'flex';
		content.style.flexDirection = 'column';
		content.style.background = 'transparent';

		var emailLabel = document.createElement('span');
		emailLabel.innerHTML = `Email:`;
		var email = document.createElement('input');
		email.id = 'arg-email';
		var passLabel = document.createElement('span');
		passLabel.innerHTML = `Passw:`;
		var pass = document.createElement('input');
		pass.id = 'arg-pass';

		var loginBtn = document.createElement('button');
		loginBtn.id = 'loginRCSBtn'
		loginBtn.innerHTML = `LOGIN`;
		loginBtn.classList.add('btn')
		loginBtn.addEventListener('click', () => {
			this.login();
		})

		var hideLoginMyAccount = document.createElement('button');
		hideLoginMyAccount.classList = `btn`;
		hideLoginMyAccount.innerHTML = `NO LOGIN -> FREE PLAY`;
		hideLoginMyAccount.addEventListener('click', () => {
			byId('myAccountLoginForm').remove();
		})

		var logo = document.createElement('img');
		logo.id = 'logologin';
		logo.style = 'width: max-content;'
		logo.src = './assets/icons/icon96.png';

		parent.appendChild(title)
		parent.appendChild(content)
		content.appendChild(emailLabel)
		content.appendChild(email)
		content.appendChild(passLabel)
		content.appendChild(pass)
		content.appendChild(loginBtn)
		content.appendChild(hideLoginMyAccount)
		content.appendChild(logo)
		document.body.appendChild(parent)
	}

	async login() {
		let route = this.apiDomain || location.origin;
		byId('loginRCSBtn').disabled = true;
		let args = {
			emailField: (byId('arg-email') != null ? byId('arg-email').value : null),
			passwordField: (byId('arg-pass') != null ? byId('arg-pass').value : null)
		}
		fetch(route + '/rocket/login', {
			method: 'POST',
			headers: jsonHeaders,
			body: JSON.stringify(args)
		}).then((d) => {
			return d.json();
		}).then((r) => {
			console.log(r.message);
			notify.show(`${r.message}`)
			if(r.message == "User logged") {
				byId('myAccountLoginForm').style.display = 'none';
				sessionStorage.setItem('RocketAcount', JSON.stringify(r.flag))
			}
		}).catch((err) => {
			console.log('[My Account Error]', err)
			setTimeout(() => {
				this.preventDBLOG = false;
				this.preventDBREG = false;
				byId('loginRCSBtn').disabled = false;
			}, 1000)
			return;
		})
	}

	async visitor(isRegular) {
		if(typeof isRegular === 'undefined') isRegular = 'Yes';
		if(localStorage.getItem("visitor") == 'welcome') return;
		let route = this.apiDomain;
		let args = {
			email: (byId('arg-email') != null ? byId('arg-email').value : 'no-email'),
			userAgent: navigator.userAgent.toString(),
			fromUrl: location.href.toString(),
			isRegular: isRegular
		}
		fetch(route + '/rocket/visitors', {
			method: 'POST',
			headers: jsonHeaders,
			body: JSON.stringify(args)
		}).then((d) => {
			return d.json();
		}).then(() => {
			localStorage.setItem("visitor", "welcome")
		}).catch((err) => {console.log('ERR', err)})
	}
}