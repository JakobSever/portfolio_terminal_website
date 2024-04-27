interface MenuItem {
	name: string;
	cmd: string;
	fn: () => void;
}

export default class Terminal {
	private terminalElement: HTMLElement;
	private terminalContent: HTMLElement;
	private terminalInput: HTMLElement;
	private btnListenerAdded: boolean = false;
	private menuItems: MenuItem[] = [
		{
			name: "Skills",
			cmd: "cd ./Skills",
			fn: ()=>{ this.skillsScreen() }
		},
		{
			name: "About",
			cmd: "cd ./About",
			fn: ()=>{ this.aboutScreen(); }
		},
		{
			name: "CV",
			cmd: "cd ./CV",
			fn: ()=>{ this.cvScreen(); }
		},
		{
			name: " ",
			cmd: "",
			fn: ()=>{ }
		},
		{ 
			name: "LinkedIn",
			cmd: "open LinkedIn",
			fn: ()=>{ window.open('https://www.linkedin.com/in/jakob-sever-954051293/', '_blank'); }
		},
		{
			name: "GitHub",
			cmd: "open GitHub",
			fn: ()=>{ window.open('https://github.com/JakobSever', '_blank'); }
		}
	];



	public constructor(terminalSelector: string) {
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

		this.homeScreen();	
	}

	private formatText(text: string): string {
		return this.formatNewLines(text).replaceAll(' ', '&nbsp;').replaceAll('span&nbsp;', 'span ').replaceAll('div&nbsp;', 'div ')
	}

	private formatNewLines(text: string): string {
		return text.replaceAll('\n', '<br>');
	}

	private addMenu(): void {
		this.addText("<nav>#----------------#");
		this.menuItems.forEach((item, index) => {
			this.addText(this.formatText(`<span data-menu="${index}">|   ${0 === index ? ">" : " "} ${item.name}` + " ".repeat(8 - item.name.length) + `   |\n</span>`));
		});
		this.addText("#----------------#</nav>");


		const menuItems = this.terminalContent.querySelectorAll('[data-menu]');
		menuItems.forEach((item, index) => {
			item.addEventListener('click', () => {
				this.triggerMenuItem(index);
			});

			item.addEventListener('mouseover', () => {
				this.highlightMenuItem(index);
			});
		});
	}


	private addBackButton(): void {
		this.addText("<div class='back-button'>< Back</div>");
		if(!this.btnListenerAdded) {
			const backButton = this.terminalContent.querySelector('.back-button');
			if(backButton) {
				this.terminalContent.addEventListener('click', (event) => {
					const target = event.target as HTMLElement;
					if (target.classList.contains('back-button')) {
						this.triggerMenuItem(-1);
					}
				});
			}
			this.btnListenerAdded = true;
		}
	}

	private highlightMenuItem(selectedIndex: number): void {
		const menuItems = this.terminalContent.querySelectorAll('[data-menu]');
		menuItems.forEach((item, index) => {
			if(index === selectedIndex) {
				item.innerHTML = item.innerHTML.replace('&nbsp;&nbsp;' + this.menuItems[index].name, '&gt;&nbsp;' + this.menuItems[index].name);
			} else {
				item.innerHTML = item.innerHTML.replace('&gt;', '&nbsp;');
			}
		});
	}

	private clear(): void {
		this.terminalContent.innerHTML = '';
	}


	private clearTerminalInput(): void {
		this.terminalInput.innerHTML = '';
	}

	private typeInTerminal(text: string): void {
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

	triggerMenuItem(pageIndex: number): void {
		const cmd = pageIndex === -1 ? 'cd ..' : (this.menuItems[pageIndex].cmd);
		this.typeInTerminal(cmd);
		setTimeout(() => {
			if(pageIndex === -1) {
				this.homeScreen();
				return;
			}
			this.menuItems[pageIndex].fn();
		}, 55 * (pageIndex === -1 ? 'cd ..'.length : this.menuItems[pageIndex].cmd.length));
	}


	private addText(text: string, classes: string = ""): void {
		this.terminalContent.innerHTML += `<div class="text-block ${classes}">${text}</div>`;
	}

	private addSpace(): void {
		this.terminalContent.innerHTML += '&nbsp;<br>';
	}

	private colorText(text: string, color: string): string {
		return `<span style="color:${color}">${text}</span>`;
	}

	private addColumns(columns: string[], classes: string = ""): void {
		let text = `<div class="gap flex flex-row justify-center">`;
		columns.forEach(column => {
			text += `<div class="text-left">${column}</div>`;
		});
		this.addText(text + "</div>", classes);
	}

	private textRight(text: string): string {
		return `<div class="text-right">${text}</div>`;
	}

	private textLeft(text: string): string {
		return `<div class="text-left">${text}</div>`;
	}

	private calculateAge(birthDate: Date): number {
		const currentDate = new Date();
		const birthYear = birthDate.getFullYear();
		const birthMonth = birthDate.getMonth();
		const birthDay = birthDate.getDate();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth();
		const currentDay = currentDate.getDate();

		let age = currentYear - birthYear;

		if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
			age--;
		}

		return age;
	}

	private addInfoBlock(infoObject: Object): void {
		const leftColumn = this.textLeft(Object.keys(infoObject).map(key => key).join('<br>'));
		const rightColumn = this.textRight(Object.values(infoObject).join('<br>'));

		this.addColumns([leftColumn, rightColumn], "info-block-container");
	}


	private homeScreen(): void {
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
				`;

		this.addSpace();
		this.addText(this.formatText(textToDisplay));
		this.addSpace();
		this.addText("Hello World!");	
		this.addSpace();
		this.addText("I am a self-taught programmer motivated by passion and personal projects.", "force-center");
		this.addSpace();
 		this.addMenu(); 
	}


	private skillsScreen(): void {
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

		this.addBackButton();
		this.addText(this.formatText(textToDisplay));
		this.addSpace();

		const leftColumn: string = this.formatNewLines(`* * * * * *
${this.colorText("FRONT-END:", "yellow")}	
HTML
CSS
JavaScript
React
Angular
Flutter
`);
		const middleColumn: string = this.formatNewLines(`* * * * * *
${this.colorText("BACK-END:", "yellow")}
PHP
SQL
FireBase
Node.js
`);

const rightColumn: string = this.formatNewLines(`* * * * * *
${this.colorText("TOOLS:", "yellow")}
NeoVim
Tmux
Git

${this.colorText("OTHER:", "yellow")}
Next.js
TypeScript
Phaser
Smarty
`);

		this.addColumns([leftColumn, middleColumn, rightColumn]);
	}

	private aboutScreen() {
		this.clear();

		const textToDisplay: string = 
			`#--------------------------------------#
			|      ___    ____  ____  __  ________ |
			|     /   |  / __ )/ __ \\/ / / /_  __/ |
			|    / /| | / __  / / / / / / / / /    |
			|   / ___ |/ /_/ / /_/ / /_/ / / /     |
			|  /_/  |_/_____/\\____/\\____/ /_/      |
			|                                      |
			#--------------------------------------#
					`;

			

					this.addBackButton();
					this.addText(this.formatText(textToDisplay));
this.addSpace();
this.addText("Hey, I'm Jakob Sever, the digital equivalent of a Swiss Army knife – I slice through frontend challenges with the finesse of a sushi chef and tackle backend tasks like a seasoned BBQ pitmaster. Whether it's PHP or Node.js, HTML or React, I've got the tools and the appetite for crafting web wonders. Let's code some magic together!");
this.addSpace();
		const pictureAscii = `
		<div class="ascii-pic">

		                                 */(&%&(*                                                           
                             &@@&@%&@@&@&&@@&@/                                                     
                          (@@&#%#&&##@@@&&&@@@&@@(                                                  
                         @@@@%@(&@#&&#(@@@@@@@&&@@@%                                                
                        @%#%@#&#&#&@#&&@&&%#/&&@@%@@@&                                              
                       &&@&#@&&#&(&&%(@@@&%#######%#%%%%#&@@&.,,                                    
                      *&@@%%&#@%%%##%##%%###%%%%#%%%%%%%%&&&&&&#&&&&&&&&(*                          
                      &&&%%#&#%#%##%####%###%###/#####%%%%#&%#%%%#&&%&%%&&%%%@,                     
                  ,&%%&%#%%#%(%#%##(,..,,,,,,,,,,,,..    (###%#%%%%%%%%&%(&&%%&%#,                  
              /&%#&%&#&#&#%#(%#, ..,.,,**************,..    *#(%(%%&#%&%%%%%&&%#&&%%                
           /&%%%##%%%#&##%##  ..,.....   .*(((((/*..    .     ,#(#%##%##%%((%&&&%#&%#*              
        *&%&%##&#%#%##%%#    .,,...,,*///((//**((/**////*..   .,//((#%&%%%&%%%&%#%%%%&              
      %%%&#%%%%#&#%%#/,     .,,*//***.    ,****//. *   */(/    *,//(#%%&&#%&#%#&#&%&%&.             
    (%#&&%#%%#&#%##/#*     .,****,,*,,,,..*///(((#,,**/***//   ./(/(&(&%&##%%%%##%&&&&              
   &%&#%#&#%#%%(&(*/,      ,////////////**((%%%#%%%(((((((/(.  *//%((#&&%#&#&(&(%##&%(              
  &%&#&#%&#%#&#&/((,/     ./((((((((((((//#( (((( .###%###%%#  ,(*%#&&#&%%/&(%#%%%&&#               
 &%&%&#&#%#%#%(#((*/      *(#########(((//*,       ,###%%%%%#  .#/#&(&(%%%%#&#&&%&&,                
 %%%(&/%%#%%/%#%(#**. ****/###%%%#####,   .,*//(///,  ,#%%%#,,, *%(&/&%&&*%/%%/%#%                  
@%&%(%(%#%#&(%#(#/(/.,,(*##%#%%%%%%#/*.,*,.*//////(*.,..%%###*/  #%%*#%#%#%%*%%%.                   
/&#&#%#%%(#(&###((/.#/(,.,*%%%%%%%%##(/(###(,.  //#@@@@&@@@#*./../##(%#%%#(#%#*                     
 /&&%#%#%#/&#(%#/%/*#* (%##/#%%%%%%%%#(**(((/*/#%%&@@@@&@@@&%*. .%&%#&/(%%&/                        
  .%#&%##/#(/%%/#(#,/((..##,,%&&%%%%%/*/.**,/,/(//(#%###&@@ ,( . %#((%%%/                           
    /%%&%(%#(%#//%(*,*(**..  %%&%&%%%/.,,..... .,.....**%& (..,/##%%(/                              
      %&%%&#/#%#*/%(/*/(#**  %%%&%#%%#*.. .     .    ,(/#  */ ..&                                   
          #%%%#%(#//%###(,*. #%%%%%%%####,..,.  .((((%&@@. ,.  /                                    
               ,&&%%###%(#/ /(%%%%%%%#####((((((##%%&&&@@#**.                                       
                        @&%%(#%%%%%%%##((///(((#%&%%&&&@@&////&                                     
                             %%%#%%%%#((///((((#%%%%&&@@@@#, .@                                     
                              &%%%&&%%((((#(((#####%&&&@@@/*/*                                      
                             #/&#%%&%&%#((//(((#(##%%%&&@. , %                                      
                          ##/,..&%%&&&%#(((((#(((#((#%#%,/,.,@@@%*                                  
                          *,/,%/&%%%%%####(((((((((((#(,/,**&@@@@@@@(                               
                       /%&@%@%*&&&%%%%#####((((((((((/*  *.(%%&&@@@@@@@@/                           
                /@%%%&%&&&&@/,%&&%%#####((((((((((//**,    ##%%%&@&@@@@@@@@#                        
           &&@&%&&&&&&&&@&@,./#%&%%#((((#(###((((///**//*/*#%@@@&@@@@@@&@@@@@@%                     
        %&&@&&&&&&&&&&&@@@&/*#%%%&%#(((((##(##((((#%&(((*.&@&@@@@@@@@@@%@@&&@@@@@@/                 
      (@%&&&&&&&&&&&&&&@@@@&((##%%#((((#######%%%%%%/(%((/&@@@@@@@@@@@&%&@@&&@@@@@@@@@#             
     #@&&&&&&&&&&&@&@&&@@@@@&&&#/(((######%%%%%&&#%   ../#%%%#%#%%#%####( *,*/%&@@@@@@@@@(          
    #@@&&&&&&&&&&&@@&@@&@&@&&&&%&&&%%%&&&&&&&&#%##.      %%%%###%#% ......(%%%%%&@@@@@@@@@@@@       
   #@@&&&&&&&@@&&&@&&&&&@@@&&&&&&&&&%%%%%%&%%%%%##*///*/#%%%%#%(   .(.*%.%%%%%%%%#%&@@@@@@@@@@@#    
   @@@&&&&&&&&&&&&&&&&&&&&&&&&&&&%&%%%%%&%%%%%###. ..,,*%%%*%..#%.#... &&&%%%%%#%%&&@@@@@@@@@@@@/   
  &@@@@&&&&&&&@&&&&&&&&&&&&&&&&&&&&%%&&%%%%%%%%%. .   .#%..(. .#,/( /&%&&&%%%%%%%%%&&@@@@@@@@@@@@   
 *@@@@@@&&&&&@&&&&&&&&&&&&&&&&&%&%%&&%%%%%%%%%%## ,***#..(#..*#%  .,.&%&&&./&%#%&%%##%&&@@@@@@@@@@  
 @@@@@@@@@&@@&&@&&&&&&&&&&&&%&&&%%%%%&&&&%%%%%&,   %.,...#..,%&.&,. &&%&(/(&&%%%%%#%#%@@&&@@@@@@@@@ 
/@@@@@&&@@@@&&&&@&&&&&&&&&&&&%&&&%%&&%%%%%%%./.%%&..,/.*(%*.(&..(. &%#*%%(&%&&&%#%%#%%%@&@&@@@@@@@@&
&@@@@@&&@@@&&&&&&&@@&&&&&&&&&&&&&&&%&&&%%/../&..%./,**//.(,@& & & %&%.( ((%%%&&%%%%%%%%@@@@&&&@@@@@@

		</div>`;

		this.addText(this.formatText(pictureAscii));

	}

	private cvScreen() {
		this.clear();

		const textToDisplay: string = 
			`#--------------------------------------#
			|               _______    __          | 
			|              / ____/ |  / /          | 
			|             / /    | | / /           | 
			|            / /___  | |/ /            | 
			|            \\____/  |___/             |
			|                                      |
			#--------------------------------------#
`;

		this.addBackButton();
		this.addText(this.formatText(textToDisplay));
		this.addSpace();
		this.addInfoBlock({
			"Name": "Jakob Sever",
			"Age": this.calculateAge(new Date(1995, 11, 16)).toString(),
			"Location": "Koper, Slovenia",
			"Email": "jakob1.sever@gmail.com",
		});
		this.addSpace();
		this.addSpace();
		this.addText("As a budding full stack developer, I'm fueled by my passion for learning and my relentless drive for growth. My insatiable thirst for knowledge constantly propels me to seek out new opportunities for learning and skill development. (The programmer's curse).");

		this.addSpace();
		this.addSpace();
		this.addText(this.colorText("Work experience", "yellow"));
		
		this.addText(this.textLeft(this.formatNewLines(`

		<div class="horizontal-line"></div>

		Apr 2024 - present
		${this.colorText("Software engineer, Tronius Gaming", "lightseagreen")}
		${this.colorText("Node.js, Angular, React, Typescript, Phaser", "lightslategray")}

		- Development and maintenance of applications
		- Game development

		
		<div class="horizontal-line"></div>

		Oct 2020 - Apr 2024
		${this.colorText("Full-stack developer, NGN MEDIA", "lightseagreen")}
		${this.colorText("PHP, SQL, JavaScript, HTML, CSS, Smarty, Flutter, Firebase", "lightslategray")}

		- Development, optimization, and maintenance of websites and applications 
		- Development of custom CMS and CRM systems
		- Mobile applications in Flutter environment
		`)));
	

		this.addSpace();
	}

}
