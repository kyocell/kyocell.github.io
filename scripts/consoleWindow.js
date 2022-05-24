let fieldCount = [0];
let fieldNumber = fieldCount[fieldCount.length-1];
let consoleUserInput = document.querySelector('.console-input-'+fieldNumber);

const consoleContainer = document.querySelector('.console');
const consoleOutputContainer = document.querySelector('.console-output-content-container');
const loadingSpinner = document.querySelector('.sk-chase');
const runBtn = document.querySelector('.close-btn');
const terminalAutoScroll = document.querySelector('.console-output-container');
const minimizedWindowBox = document.querySelector('.minimized-window-container');
const minimizeBtn = document.querySelector('.minimize-btn');
const backgroundContent = document.querySelector('.background-information-container');
const backgroundInformationHeading = document.querySelector('.background-information-heading');
const backgroundInformationContent = document.querySelector('.background-information-content');

consoleContainer.style.display = 'none';
backgroundContent.style.display = 'none';

let allCommands = {
    commandContent: ['cat portfolio.txt'],
    responseObj: [
        {
            aboutResponse: "Hi, I'm <b>Kyocell</b>, a Software developer, Fullstack web developer & Systems admin based off India.<br>I'm currently a <b>sophomore</b>.<br>I love working on both frontend & backend projects using <b><u>Javascript</b></u>, <b><u>Typescript</b></u>, <b><u>Node.js</b></u> etc. & with frameworks like <b><u>ReactJS</b></u> & <b><u>Express.js</b></u>.<br>I also wish to explore & implement various other frameworks & languages in my upcoming projects soon.<br>The core idea of this portfolio design is based off linux' interactive terminal & is written from scratch using <b><u>Javascript</b></u>, <b><u>Bootstrap</b></u> & some basic <b><u>CSS</b></u>.<br>You can also use the '<span style='color: cyan'>help</span>' command for the allowed list of commands on this terminal!<br>Enjoy your stay.",
            startResponse: "Hey there! <br>My name is Kyocell.<br>Welcome to my portfolio.<br>Use the '<span style='color: cyan'>help</span>' command for more information.",
            helpResponse: "|---- '<span style='color: cyan'>help</span>' - list all commands.<br>|---- '<span style='color: cyan'>about</span>' - more about the Developer.<br>|---- '<span style='color: cyan'>contact</span>' - links to my Socials.<br>|---- '<span style='color: cyan'>projects</span>' - my <a href='https://github.com/kyocell'><u>GitHub</u></a> page.<br>|---- '<span style='color: cyan'>clear</span>' - clears the terminal window.<br>|---- '<span style='color: cyan'>exit</span>' - closes the terminal.",
            projectsResponse: "|---- <a href='https://github.com/kyocell/disccrypto' style='color: white;''><b>#1</b></a> - A static and simple Discord bot that monitors cryptocurrencies. Built &emsp;using <b><u>discordpy</b></u> & <b><u>Coingeko</b></u> API(s).<br>|---- <a href='https://github.com/kyocell/Dankmemer_Minigame' style='color: white;'><b><u>#2</b></u></a> - The famous Dankmemer discord bot's minigame in web format using <b><u>Javascript</b></u>, <b><u>HTML</b></u> & <b><u>CSS</b></u>.<br>|---- <a href='https://github.com/kyocell/proxyscraper' style='color: white;'><b><u>#3</b></u></a> - A very simple proxyscraper coded in <b><u>Python</b></u>.<br>|---- <a href='https://github.com/kyocell' style='color: white;'><b><u>#4</b></u></a> - More coming soon.",
            contactResponse: "|---- <a href='https://twitter.com/kyocell3k' style='color: white;''><u>Twitter</u></a> - Kyocell3k<br>|---- <a href='' style='color: white;'><u>Discord</u></a> - Kyocell#1491<br>|---- <a href='https://github.com/kyocell' style='color: white;'><u>Github</u></a> - kyocell<br>|---- <span style='color: 'white';'><u>Email</u></span> - kyocell2k@gmail.com",
            lsResponse: "|---- <span style='color: greenyellow'><u>nothing.txt</span></u><br>|---- <span style='color: greenyellow'><u>to.txt</span></u><br>|---- <span style='color: greenyellow'><u>see.txt</span></u><br>|---- <span style='color: greenyellow'><u>here.txt</span></u>",
            cdResponse: "Permission denied.<br>",
        },
    ],
    // keyboardInterruptResponse: ['<br>CTRL ^C<br>'],
    invalidCommandResponse: ['Command entered is invalid!<br>Use "help" command for a list of commands.']
}

function loadingSpinnerTimeout() {
    setTimeout( () => {
        minimizedWindowBox.style.display = 'none';
        loadingSpinner.style.display = 'none';
        consoleContainer.style.display = '';
        let initialConsoleResponse = allCommands.responseObj[0].startResponse
        let initialConsoleCommand = allCommands.commandContent[0]
        animatedTextGen(consoleUserInput, initialConsoleCommand, initialConsoleResponse)
        setTimeout(function() {
            setInterval(function() {
                if (loadingSpinner.style.display != 'none') {
                    loadingSpinner.style.display = 'none';
                } else {
                    return
                }
            })
        }, 5000)
    }, 13000);
}


function controlFlow(keyEvent) {
    if (keyEvent.key == "Enter") {
        if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "help") {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.responseObj[0].helpResponse)
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "about") {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.responseObj[0].aboutResponse)
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "clear") {
            clearTerminal();
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "ls") {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.responseObj[0].lsResponse)
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase().includes("cd")) {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.responseObj[0].cdResponse)
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "projects") {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.responseObj[0].projectsResponse)
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "contact") {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.responseObj[0].contactResponse)
        } else if (document.querySelector('.'+consoleUserInput.classList[0]).value.toLowerCase() == "exit") {
            consoleMinimizeBackgroundInitializer();
            clearTerminal();
        } else {
            animatedTextGen(consoleUserInput, consoleCommand='', allCommands.invalidCommandResponse[0]);
        }
    }
}


function consoleResponseFieldGen(responseContent) {
    newResponseField = document.createElement('div');
    responseFieldClassName = 'response-div-'+fieldNumber;
    newResponseField.classList.add(responseFieldClassName);
    consoleOutputContainer.appendChild(newResponseField)

    fieldCount.push(fieldCount[fieldCount.length-1]+1);

    responseFieldClassName = '.response-div-'+fieldNumber;

    new TypeIt(responseFieldClassName, {
        strings: responseContent,
        speed: 5,
        html: true,
        cursor: false,
        afterStep: async function() {
            terminalAutoScroll.scrollTo(0, terminalAutoScroll.scrollHeight);
        },
        afterComplete: function() {
            terminalAutoScroll.scrollTo(0, terminalAutoScroll.scrollHeight);
            fieldNumber = fieldCount.length-1;
            consoleTakeCommandFieldGen();
            consoleUserInput = document.querySelector('.console-input-'+fieldNumber);
            consoleUserInput.addEventListener('keypress', (event) => {
            controlFlow(event)
            }) 
        }
    }).go();
    document.querySelector('.console-input-'+fieldNumber).focus();
}


function consoleTakeCommandFieldGen() {
    newTakeCommandField = document.createElement('span');
    newTakeCommandField.classList.add('console-input-prefix-'+fieldNumber);
    newTakeCommandField.classList.add('console-input-prefix')
    newTakeCommandField.innerHTML = '<span style="color: red">kyocell@port</span>:<span style="color: cyan">~</span><b>$</b></span>';
    newTakeCommandFieldChild = document.createElement('input');
    newTakeCommandFieldChild.type = 'text';
    newTakeCommandFieldChild.classList.add('console-input-'+fieldNumber);
    newTakeCommandFieldChild.classList.add('console-input')
    newTakeCommandFieldChild.classList.add('text-light');

    consoleOutputContainer.appendChild(newTakeCommandField);
    consoleOutputContainer.appendChild(newTakeCommandFieldChild);

    newTakeCommandFieldChild.style.width = '75%';
    newTakeCommandFieldChild.style.outline = 'none';
    newTakeCommandFieldChild.style.border = 'none';
    newTakeCommandFieldChild.style.display = 'inline-block';
    newTakeCommandFieldChild.style.marginLeft = '2';
    newTakeCommandField.style.display = 'inline-block';
    terminalAutoScroll.scrollTo(0, terminalAutoScroll.scrollHeight);
    document.querySelector('.console-input-'+fieldNumber).focus();
}

function animatedTextGen(textFieldIdentifier, consoleCommand, commandResponseContent) {
    loadingSpinner.style.display = 'none';
    textFieldIdentifier = '.'+textFieldIdentifier.classList[0]
    new TypeIt(''+textFieldIdentifier, {
        strings: consoleCommand,
        speed: 50,
        html: true,
        cursor: false,
        afterStep: async function() {
            terminalAutoScroll.scrollTo(0, terminalAutoScroll.scrollHeight);
        },
        afterComplete: function() {
            if (loadingSpinner.style.display = 'none') {
                terminalAutoScroll.scrollTo(0, terminalAutoScroll.scrollHeight);
                consoleResponseFieldGen(commandResponseContent);
                document.querySelector(textFieldIdentifier).readOnly = true;
                document.querySelector('.console-input-'+fieldNumber).focus();
            } else {
                loadingSpinner.style.display = 'none';
                terminalAutoScroll.scrollTo(0, terminalAutoScroll.scrollHeight);
                consoleResponseFieldGen(commandResponseContent);
                document.querySelector(textFieldIdentifier).readOnly = true;
                document.querySelector('.console-input-'+fieldNumber).focus();
            }
        }
    }).go()
    document.querySelector('.console-input-'+fieldNumber).focus();
}

function clearTerminal() {
    consoleOutputContainer.innerHTML = '';
    fieldCount = [0]
    fieldNumber = fieldCount[fieldCount.length-1]
    consoleTakeCommandFieldGen();
    consoleUserInput = document.querySelector('.console-input-'+fieldNumber);
    document.querySelector('.console-input-'+fieldNumber).addEventListener('keypress', (event) => {
        if (event.key == "Enter") {
            controlFlow(event);
        }
        
    })
}

function consoleMinimizeBackgroundInitializer() {
    backgroundInformationHeading.innerHTML = '';
    backgroundInformationContent.innerHTML = '';
    consoleContainer.style.display = 'none';
    minimizedWindowBox.style.display = '';
    backgroundContent.style.display = '';
    new TypeIt('.background-information-heading', {
        speed: 40,
        html: true,
        cursor: true,
        cursorChar: '|',
    }).type("<span style='color: red'>kyocell</span>@portfolio:<span style='color: cyan'>~</span>$").go();

    new TypeIt('.background-information-content', {
        speed: 40,
        html: true,
        cursor: true,
        cursorChar: '_',
    })
    .type("\[._.]/ Hey there👋 I'm Kyocell.<br>")
    .pause(100)
    .type("<span style='color: red'>$</span> A code enthusiast.<br>")
    .pause(100)
    .type("<span style='color: red'>$</span> Welcome to my world.<br>")
    .pause(100)
    .type("<span style='color: red'>$</span> Enjoy!")
    .go();
}

consoleContainer.addEventListener('click', () => {
    document.querySelector('.console-input-'+fieldNumber).focus();
})

consoleContainer.addEventListener('onmousemove', () => {
    document.querySelector('.console-input-'+fieldNumber).focus();
})

minimizeBtn.addEventListener('click', () => {
    consoleMinimizeBackgroundInitializer();
})

minimizedWindowBox.addEventListener('click', () => {
    minimizedWindowBox.style.display = 'none';
    consoleContainer.style.display = '';
    backgroundContent.style.display = 'none';
})