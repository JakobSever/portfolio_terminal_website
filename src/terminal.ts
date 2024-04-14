interface MenuItem {
	name: string;
	fn: () => void;
}

export default class Terminal {
	private terminalElement: HTMLElement;
	private terminalContent: HTMLElement;
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
			this.terminalElement.innerHTML += '<div class="terminal-prompt">guest@Jakob-Sever-Portfolio~ %: <span class="terminal-cursor"></span></div>';
		}

		this.terminalContent = this.terminalElement.querySelector('.terminal-content') as HTMLElement;

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

			I am a self-taught programmer motivated by passion and personal projects.

				`;

			


		let screenText: string = "";
		screenText += this.centerText(this.formatText(textToDisplay));

		screenText += this.centerText(this.formatText(this.getMenu()));

		const lines = screenText.split('<br>').length;


		const allLines = Math.floor(window.innerHeight / this.charHeight);

		const linesToAdd = Math.floor((allLines - lines) / 2);
		this.drawText(screenText + '<br>'.repeat(linesToAdd));
	}

	private formatText(text: string): string {
		return text.replaceAll(' ', '&nbsp;').replaceAll('\n', '<br>');
	}

	private getMenu() {
		let menu = "\n#----------------#\n";
		this.menuItems.forEach((item, index) => {
			menu += `|   ${this.selectedMenuItem === index ? ">" : " "} ${item.name}` + " ".repeat(7 - item.name.length) + `    |\n`;
		});
		menu += "#----------------#\n\n";

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
}
