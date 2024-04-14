interface MenuItem {
	name: string;
	fn: () => void;
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
			name: "Home",
			fn: ()=>{ console.log('Home'); }
		},
		{
			name: "Skills",
			fn: ()=>{ console.log('Skills'); }
		},
		{
			name: "About",
			fn: ()=>{ console.log('About'); }
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
		this.mainScreen();
	}

	mainScreen() {
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
			item.addEventListener('click', () => {
				this.selectedMenuItem = index;
				this.highlightMenuItem();
				this.goToPage(this.menuItems[index].name);
			});
			item.addEventListener('mouseover', () => {
				this.selectedMenuItem = index;
				this.highlightMenuItem();
			});
		});

	}

	private formatText(text: string): string {
		return text.replaceAll(' ', '&nbsp;').replaceAll('\n', '<br>').replaceAll('span&nbsp;', 'span ')
	}

	private getMenu() {
		let menu = "\n<nav>#----------------#\n";
		this.menuItems.forEach((item, index) => {
			menu += `<span data-menu="${index}">|   ${this.selectedMenuItem === index ? ">" : " "} ${item.name}` + " ".repeat(7 - item.name.length) + `    |\n</span>`;
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
		this.typeInTerminal('cd ./' + page);
		setTimeout(() => {
		switch(page) {
			case 'Home':
				this.mainScreen();
				break;
			case 'Skills':
				break;
			case 'About':
				break;
			case 'CV':
				break;
		}
		}, 1000);
	}
}
