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
	private menuItems: MenuItem[] = [
		{
			name: "Skills",
			fn: ()=>{ this.skillsScreen() }
		},
		{
			name: "About",
			fn: ()=>{ this.aboutScreen(); }
		},
		{
			name: "Projects",
			fn: ()=>{ this.projectsScreen(); }
		},
		{
			name: "CV",
			fn: ()=>{ this.cvScreen(); }
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
		return text.replaceAll(' ', '&nbsp;').replaceAll('\n', '<br>').replaceAll('span&nbsp;', 'span ').replaceAll('div&nbsp;', 'div ')
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
		const backButton = this.terminalContent.querySelector('.back-button');
		if(backButton) {
			this.terminalContent.addEventListener('click', (event) => {
				const target = event.target as HTMLElement;
				if (target.classList.contains('back-button')) {
					this.triggerMenuItem(-1);
				}
			});
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
		console.log(pageIndex);
		const cmd = pageIndex === -1 ? 'cd ..' : ('cd ./' + this.menuItems[pageIndex].name);
		this.typeInTerminal(cmd);
		setTimeout(() => {
			if(pageIndex === -1) {
				this.homeScreen();
				return;
			}
			this.menuItems[pageIndex].fn();
		}, 55 * (pageIndex === -1 ? 'cd ..' : 'cd ./' + this.menuItems[pageIndex].name).length);
	}


	private addText(text: string): void {
		this.terminalContent.innerHTML += `<div class="text-block">${text}</div>`;
	}

	private addSpace(): void {
		this.terminalContent.innerHTML += '<br>';
	}

	colorText(text: string, color: string): string {
		return `<span style="color:${color}">${text}</span>`;
	}

	addColumns(columns: string[]): void {
		let text = '<div class="gap flex flex-row justify-center">';
		columns.forEach(column => {
			text += `<div class="text-left">${column}</div>`;
		});
		this.addText(text + "</div>");
	}



	homeScreen(): void {
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
		this.addText("I am a self-taught programmer motivated by passion and personal projects.");
		this.addSpace();
 		this.addMenu(); 
	}


	skillsScreen(): void {
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

		const leftColumn: string = this.formatText(`* * * * * *
${this.colorText("FRONT-END:", "yellow")}	
HTML
CSS
JavaScript
React
Angular
Flutter
`);
		const middleColumn: string = this.formatText(`* * * * * *
${this.colorText("BACK-END:", "yellow")}
PHP
SQL
FireBase
Node.js
`);

const rightColumn: string = this.formatText(`* * * * * *
${this.colorText("TOOLS:", "yellow")}
NeoVim
Tmux
Git
Next.js
Smarty
TypeScript
`);

		this.addColumns([leftColumn, middleColumn, rightColumn]);
	}

	projectsScreen() {
		this.clear();
	}

	aboutScreen() {
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
this.addText("Hey, I'm Jakob Sever, the digital equivalent of a Swiss Army knife – I slice through frontend challenges with the finesse of a sushi chef and tackle backend tasks like a seasoned BBQ pitmaster. Whether it's HTML or Node.js, CSS or SQL, I've got the tools and the appetite for crafting web wonders. Let's code some magic together!");
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
