interface MenuItem {
	name: string;
	fn: () => void;
}

interface SkillItem {
	name: string;
	icon: string;
}

export default class Terminal {
	private terminalElement: HTMLElement;
	private terminalContent: HTMLElement;
	private terminalInput: HTMLElement;
	private fontSize: number = 20;
	private charHeight: number = this.fontSize * 1.2;
	private charWidth: number = this.fontSize * 0.6;
	private selectedMenuItem: number = 0;
	private menuItems: MenuItem[] = [
		{
			name: "Skills",
			fn: ()=>{ console.log('Skills'); }
		},
		{
			name: "About",
			fn: ()=>{ console.log('About'); }
		},
		{
			name: "Projects",
			fn: ()=>{ console.log('Projects'); }
		},
		{
			name: "CV",
			fn: ()=>{ console.log('CV'); }
		}
	];



	constructor(terminalSelector: string) {
		this.terminalElement = document.querySelector(terminalSelector) as HTMLElement;

		if(!this.terminalElement) {
			throw new Error('Terminal element not found');
		}

		if(!this.terminalElement.querySelector('.terminal-content')) {
			this.terminalElement.innerHTML += '<div class="terminal-content"></div>';
		}

		if(!this.terminalElement.querySelector('.terminal-prompt')) {
			this.terminalElement.innerHTML += '<div class="terminal-prompt">guest@Jakob-Sever-Portfolio~ %:&nbsp;<span class="terminal-input"></span><span class="terminal-cursor"></span></div>';
		}

		this.terminalContent = this.terminalElement.querySelector('.terminal-content') as HTMLElement;
		this.terminalInput = this.terminalElement.querySelector('.terminal-input') as HTMLElement;

	
		this.init();
	}

	init() {
		this.homeScreen();
	}

	private formatText(text: string): string {
		return text.replaceAll(' ', '&nbsp;').replaceAll('\n', '<br>').replaceAll('span&nbsp;', 'span ').replaceAll('div&nbsp;', 'div ')
	}

	private getMenu() {
		let menu = "\n<nav>#----------------#\n";
		this.menuItems.forEach((item, index) => {
			menu += `<span data-menu="${index}">|   ${this.selectedMenuItem === index ? ">" : " "} ${item.name}` + " ".repeat(8 - item.name.length) + `    |\n</span>`;
		});
		menu += "#----------------#</nav>\n\n";

		return menu;
	}

	private centerText(text: string): string {
		return `<span class='text-center'>${text}</span>`;
	}

	private getCenterSpaces(text: string): number {
		return Math.floor((window.innerWidth / this.charWidth - text.length) / 2 + 1); 
	}

	private clear() {
		this.terminalContent.innerHTML = '';
	}

	private drawText(text: string) {
		this.terminalContent.innerHTML += text;
	}

	private highlightMenuItem() {
		const menuItems = this.terminalContent.querySelectorAll('[data-menu]');
		menuItems.forEach((item, index) => {
			if(index === this.selectedMenuItem) {
				item.innerHTML = item.innerHTML.replace('&nbsp;&nbsp;' + this.menuItems[index].name, '&gt;&nbsp;' + this.menuItems[index].name);
			} else {
				item.innerHTML = item.innerHTML.replace('&gt;', '&nbsp;');
			}
		});
	}

	private clearTerminalInput() {
		this.terminalInput.innerHTML = '';
	}

	private typeInTerminal(text: string) {
		this.clearTerminalInput();
		const textArray = text.split('');
		let i = 0;
		const interval = setInterval(() => {
			if(i < textArray.length) {
				this.terminalInput.innerHTML += textArray[i];
				i++;
			} else {
				clearInterval(interval);
			}
		}, 50);
	}

	goToPage(page: string) {
		const cmd = page === "Home" ? 'cd ..' : 'cd ./' + page;
		this.typeInTerminal(cmd);
		setTimeout(() => {
		switch(page) {
			case 'Home':
				this.homeScreen();
				break;
			case 'Skills':
				this.skillsScreen();
				break;
			case 'About':
				this.aboutScreen();
				break;
			case 'Projects':
				this.projectsScreen();
				break;
			case 'CV':
				this.cvScreen();
				break;
		}
		this.addBackListener();
		}, 50 * ('cd ./' + page).length);
	}

	addBackListener() {
		const backButton = this.terminalContent.querySelector('#back-button');
		if(backButton) {
			backButton.addEventListener('click', () => {
				this.goToPage("Home");
			});
		}
	}

	getIcon(icon: string) {
		return `<i class="fab fa-${icon}"></i>`;
	}

	homeScreen() {
		this.clear();
		const textToDisplay: string = 
			`#--------------------------------------#
			|         _______                      |
			|        / / ___/___ _   _____  _____  |
			|   __  / /\\__ \\/ _ \\ | / / _ \\/ ___/  |
			|  / /_/ /___/ /  __/ |/ /  __/ /      |
			|  \\____//____/\\___/|___/\\___/_/       |
			|                                      |
			#--------------------------------------#

			Hello World!


				`;

			


		let screenText: string = "";
		screenText += this.centerText(this.formatText(textToDisplay));

		screenText += this.centerText('I am a self-taught programmer motivated by passion and personal projects.');
  
		screenText += this.centerText(this.formatText(this.getMenu()));

		const lines = screenText.split('<br>').length;


		const allLines = Math.floor(window.innerHeight / this.charHeight);

		const linesToAdd = Math.floor((allLines - lines) / 2);
		if(linesToAdd > 0) {
			screenText += '<br>'.repeat(linesToAdd);
		}

		this.drawText(screenText);


		const menuItems = this.terminalContent.querySelectorAll('[data-menu]');
		menuItems.forEach((item, index) => {
			if(this.menuItems[index].name !== "Home") {
			item.addEventListener('click', () => {
				this.selectedMenuItem = index;
				this.highlightMenuItem();
				this.goToPage(this.menuItems[index].name);
			});
			}
			item.addEventListener('mouseover', () => {
				this.selectedMenuItem = index;
				this.highlightMenuItem();
			});
		});

	}


	skillsScreen() {
		this.clear();

		const textToDisplay: string = 
			`#--------------------------------------#
			|    _____ __ __ ______    __   _____  |
			|   / ___// //_//  _/ /   / /  / ___/  |
			|   \\__ \\/ ,<   / // /   / /   \\__ \\   |
			|  ___/ / /| |_/ // /___/ /______/ /   |
			| /____/_/ |_/___/_____/_____/____/    |
			|                                      |
			#--------------------------------------#

					`;

			


		let screenText: string = "";

		screenText += this.centerText(this.formatText("<span id='back-button'>< Back</span>"));

		screenText += this.centerText(this.formatText(textToDisplay));


		const leftColumn: string = this.formatText(`${this.colorText("FRONT-END:", "yellow")}	
HTML
CSS
		JavaScript
React
Angular
Flutter
`);
		const middleColumn: string = this.formatText(`${this.colorText("BACK-END:", "yellow")}
PHP
SQL
FireBase
		Node.js
`);

const rightColumn: string = this.formatText(`${this.colorText("TOOLS:", "yellow")}
											NeoVim
											Tmux
Git
		Next.js
Smarty
TypeScript
`);


		screenText += this.centerText(this.addColumns([leftColumn, middleColumn, rightColumn]));

		const lines = screenText.split('<br>').length;


		const allLines = Math.floor(window.innerHeight / this.charHeight);

		const linesToAdd = Math.floor((allLines - lines) / 2) + 7;
		if(linesToAdd > 0) {
			screenText += '<br>'.repeat(linesToAdd);
		}

		this.drawText(screenText);


	}

	colorText(text: string, color: string) {
		return `<span style="color:${color}">${text}</span>`;
	}

	addColumns(columns: string[]) {
		let text = '<div class="gap flex flex-row justify-between">';
		columns.forEach(column => {
			text += `<div class="text-left">${column}</div>`;
		});
		return text + "</div>";
	}

	projectsScreen() {
		this.clear();
	}

	aboutScreen() {
		this.clear();
	}

	cvScreen() {
		this.clear();
	}

}


/*


    __________  ____  _   ________    _______   ______ 
   / ____/ __ \/ __ \/ | / /_  __/   / ____/ | / / __ \
  / /_  / /_/ / / / /  |/ / / /_____/ __/ /  |/ / / / /
 / __/ / _, _/ /_/ / /|  / / /_____/ /___/ /|  / /_/ / 
/_/   /_/ |_|\____/_/ |_/ /_/     /_____/_/ |_/_____/  





    ____  ___   ________ __      _______   ______ 
   / __ )/   | / ____/ //_/     / ____/ | / / __ \
  / __  / /| |/ /   / ,< ______/ __/ /  |/ / / / /
 / /_/ / ___ / /___/ /| /_____/ /___/ /|  / /_/ / 
/_____/_/  |_\____/_/ |_|    /_____/_/ |_/_____/  




    ____  ___  _________    ____  ___   _____ ______
   / __ \/   |/_  __/   |  / __ )/   | / ___// ____/
  / / / / /| | / / / /| | / __  / /| | \__ \/ __/   
 / /_/ / ___ |/ / / ___ |/ /_/ / ___ |___/ / /___   
/_____/_/  |_/_/ /_/  |_/_____/_/  |_/____/_____/   





   _____ __ __ ______    __   _____
  / ___// //_//  _/ /   / /  / ___/
  \__ \/ ,<   / // /   / /   \__ \ 
 ___/ / /| |_/ // /___/ /______/ / 
/____/_/ |_/___/_____/_____/____/  
                                   



    ___    ____  ____  __  ________
   /   |  / __ )/ __ \/ / / /_  __/
  / /| | / __  / / / / / / / / /   
 / ___ |/ /_/ / /_/ / /_/ / / /    
/_/  |_/_____/\____/\____/ /_/     
                                   




   ____  ________  ____________ 
  / __ \/_  __/ / / / ____/ __ \
 / / / / / / / /_/ / __/ / /_/ /
/ /_/ / / / / __  / /___/ _, _/ 
\____/ /_/ /_/ /_/_____/_/ |_|  



*/
