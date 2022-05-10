const rulesBtn = document.querySelector('.buttons__rules');
const nextRoundBtn = document.querySelector('.buttons__next');
const rulesContainer = document.querySelector('.rules');
const optionBtns = document.querySelectorAll('.option-container__btn');
const optionContainer = document.querySelector('.option-container');
const human = document.querySelector('.human');
const cpu = document.querySelector('.cpu');
const weaponChoice = document.querySelector('.weapon-choice');
const gameField = document.querySelector('.game-field');
const scoreCounter = document.querySelector('.score-panel__score');
const playersWeapon = [
	`<div class="paper shadow player-one weapon" data-weapon="paper">
<button class="paper__btn button"></button>
</div>`,
	`<div class="scissors shadow player-one weapon" data-weapon="scissors">
<button class="scissors__btn button"></button>
</div>`,
	`<div class="rock shadow player-one weapon" data-weapon="rock">
<button class="rock__btn button"></button>
</div>`,
];

let playerOneScore = 0;
let playerTwoScore = 0;

const sendNames = () => {
	const inputsField = document.createElement('div');
	const inputPlayerOne = document.createElement('input');
	const inputPlayerTwo = document.createElement('input');
	const enterBtn = document.createElement('button');
	inputsField.classList.add('inputs__field');
	inputPlayerOne.classList.add('inputs__name');
	inputPlayerOne.classList.add('name-one');
	inputPlayerTwo.classList.add('inputs__name');
	inputPlayerTwo.classList.add('name-two');
	enterBtn.classList.add('buttons__enter');
	enterBtn.textContent = 'start';
	document.body.append(inputsField);
	inputsField.append(inputPlayerOne, inputPlayerTwo, enterBtn);
	const hideNames = () => {
		inputsField.classList.add('hide');
	};
	enterBtn.addEventListener('click', hideNames);
};

const chooseEnemy = (e) => {
	optionContainer.classList.add('started');
	createGameField();
	e.target.classList.add('choosen-option');
	if (e.target.matches('span')) {
		e.target.parentElement.classList.add('choosen-option');
	}
	if (human.classList.contains('choosen-option')) {
		human.classList.add('right');
		cpu.classList.add('none');
		sendNames();
	} else if (cpu.classList.contains('choosen-option')) {
		cpu.classList.add('left');
		human.classList.add('none-left');
		sendNames();
		const inputPlayerTwo = document.querySelector('.name-two');
		inputPlayerTwo.style.display = 'none';
		inputPlayerTwo.value = 'cpu';
	}
};
const createGameField = () => {
	gameField.innerHTML = `<div class="paper" data-weapon="paper">
	<button class="paper__btn button"></button>
</div>
<div class="scissors" data-weapon="scissors">
	<button class="scissors__btn button"></button>
</div>
<div class="rock" data-weapon="rock">
	<button class="rock__btn button"></button>
</div>`;
	const gameButtons = document.querySelectorAll('.button');
	const enemiesRound = () => {
		if (cpu.classList.contains('choosen-option')) {
			vsCpu();
		} else if (
			human.classList.contains('choosen-option') &&
			cpu.classList.contains('none')
		) {
			vsHuman();
		}
	};

	const weapon = (e) => {
		weaponChoice.classList.add('small');
		if (e.target === gameButtons[0]) {
			weaponChoice.innerHTML = playersWeapon[0];
		} else if (e.target === gameButtons[1]) {
			weaponChoice.innerHTML = playersWeapon[1];
		} else if (e.target === gameButtons[2]) {
			weaponChoice.innerHTML = playersWeapon[2];
		}
	};

	const vsCpu = () => {
		cpuArr = [
			`<div class="paper shadow player-two" data-weapon="paper">
		<button class="paper__btn button"></button>
	</div>`,
			`<div class="scissors shadow player-two" data-weapon="scissors">
	<button class="scissors__btn button"></button>
	</div>`,
			`<div class="rock shadow player-two" data-weapon="rock">
	<button class="rock__btn button"></button>
	</div>`,
		];
		if (weaponChoice.innerHTML !== '') {
			gameField.innerHTML = `<div class="cpu__container">
			<button class="cpu__btn"></button></div>`;
			const stopDraw = () => {
				let index = Math.floor(Math.random() * 3);
				gameField.innerHTML = '';
				weaponChoice.innerHTML += cpuArr[index];
				showResult();
			};
			setTimeout(stopDraw, 1500);
		}
	};
	const vsHuman = () => {
		weaponsArr = [];
		weaponsArr.push(weaponChoice.innerHTML);
		gameButtons.forEach((el) => {
			el.addEventListener('click', function (e) {
				weapon(e);
				weaponChoice.innerHTML = weaponsArr[0] + weaponChoice.innerHTML;
				const weapons = document.querySelectorAll('.weapon');
				if (weapons[1].classList.contains('player-one')) {
					weapons[1].classList.remove('player-one');
					weapons[1].classList.add('player-two');
				}
				setTimeout(500, showResult());
			});
		});
	};
	const delay = () => {
		setTimeout(enemiesRound, 800);
	};
	gameButtons.forEach((el) => {
		el.addEventListener('click', weapon);
	});
	gameButtons.forEach((el) => {
		el.addEventListener('click', delay);
	});
};
const showResult = () => {
	const playerOneName = document.querySelector('.name-one').value;
	let playerTwoName = document.querySelector('.name-two').value;
	const playerOne = document.querySelector('.player-one');
	const playerTwo = document.querySelector('.player-two');
	if (playerOne.dataset.weapon === playerTwo.dataset.weapon) {
		gameField.innerHTML = `<p class="result">draw</p>`;
	} else if (
		playerOne.dataset.weapon === 'paper' &&
		playerTwo.dataset.weapon === 'scissors'
	) {
		gameField.innerHTML = `<p class="result">${playerTwoName} win</p>`;
		playerTwoScore++;
	} else if (
		playerOne.dataset.weapon === 'paper' &&
		playerTwo.dataset.weapon === 'rock'
	) {
		gameField.innerHTML = `<p class="result">${playerOneName} win</p>`;
		playerOneScore++;
	} else if (
		playerOne.dataset.weapon === 'scissors' &&
		playerTwo.dataset.weapon === 'paper'
	) {
		gameField.innerHTML = `<p class="result">${playerOneName} win</p>`;
		playerOneScore++;
	} else if (
		playerOne.dataset.weapon === 'scissors' &&
		playerTwo.dataset.weapon === 'rock'
	) {
		gameField.innerHTML = `<p class="result">${playerTwoName}  win</p>`;
		playerTwoScore++;
	} else if (
		playerOne.dataset.weapon === 'rock' &&
		playerTwo.dataset.weapon === 'paper'
	) {
		gameField.innerHTML = `<p class="result">${playerTwoName}  win</p>`;
		playerTwoScore++;
	} else if (
		playerOne.dataset.weapon === 'rock' &&
		playerTwo.dataset.weapon === 'scissors'
	) {
		gameField.innerHTML = `<p class="result">${playerOneName} win</p>`;
		playerOneScore++;
	}
	scoreCounter.innerHTML = `${playerOneScore}:${playerTwoScore}`;
	nextRoundBtn.addEventListener('click', nextRound);
};
const nextRound = () => {
	weaponChoice.innerHTML = '';
	createGameField();
};
const showRules = () => {
	const closeBtn = document.querySelector('.rules__close-btn');
	rulesContainer.classList.add('active');
	closeBtn.addEventListener('click', function () {
		rulesContainer.classList.remove('active');
	});
};

rulesBtn.addEventListener('click', showRules);
optionBtns.forEach((el) => {
	el.addEventListener('click', chooseEnemy);
});
