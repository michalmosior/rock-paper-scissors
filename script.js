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
let playerOneChoice;
let playerOneScore = 0;
let playerTwoScore = 0;

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
	} else if (cpu.classList.contains('choosen-option')) {
		cpu.classList.add('left');
		human.classList.add('none-left');
	}
};
const createGameField = () => {
	gameField.innerHTML = `<div class="paper">
	<button class="paper__btn button"></button>
</div>
<div class="scissors">
	<button class="scissors__btn button"></button>
</div>
<div class="rock">
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
			weaponChoice.innerHTML = `<div class="paper shadow player-one" data-weapon="paper">
			<button class="paper__btn button"></button>
		</div>`;
		} else if (e.target === gameButtons[1]) {
			weaponChoice.innerHTML = `<div class="scissors shadow player-one" data-weapon="scissors">
			<button class="scissors__btn button"></button>
		</div>`;
		} else if (e.target === gameButtons[2]) {
			weaponChoice.innerHTML = `<div class="rock shadow player-one" data-weapon="rock">
			<button class="rock__btn button"></button>
		</div>`;
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
	const vsHuman = (e) => {
		playerTwoArr = [];
		if (weaponChoice.innerHTML != '') {
			gameButtons.forEach((el) => {
				el.addEventListener('click', weapon);
			});
		}
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
	const playerOne = document.querySelector('.player-one');
	const playerTwo = document.querySelector('.player-two');
	if (playerOne.dataset.weapon === playerTwo.dataset.weapon) {
		gameField.innerHTML = `<p class="result">draw</p>`;
	} else if (
		playerOne.dataset.weapon === 'paper' &&
		playerTwo.dataset.weapon === 'scissors'
	) {
		gameField.innerHTML = `<p class="result">cpu win</p>`;
		playerTwoScore++;
	} else if (
		playerOne.dataset.weapon === 'paper' &&
		playerTwo.dataset.weapon === 'rock'
	) {
		gameField.innerHTML = `<p class="result">you win</p>`;
		playerOneScore++;
	} else if (
		playerOne.dataset.weapon === 'scissors' &&
		playerTwo.dataset.weapon === 'paper'
	) {
		gameField.innerHTML = `<p class="result">you win</p>`;
		playerOneScore++;
	} else if (
		playerOne.dataset.weapon === 'scissors' &&
		playerTwo.dataset.weapon === 'rock'
	) {
		gameField.innerHTML = `<p class="result">cpu win</p>`;
		playerTwoScore++;
	} else if (
		playerOne.dataset.weapon === 'rock' &&
		playerTwo.dataset.weapon === 'paper'
	) {
		gameField.innerHTML = `<p class="result">cpu win</p>`;
		playerTwoScore++;
	} else if (
		playerOne.dataset.weapon === 'rock' &&
		playerTwo.dataset.weapon === 'scissors'
	) {
		gameField.innerHTML = `<p class="result">you win</p>`;
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
