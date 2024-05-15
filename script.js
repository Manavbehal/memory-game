class MemoryGame {
	constructor() {
		this.cardsContainer = document.querySelector('.js-cards');
		this.cards = Array.from(this.cardsContainer.children);
        this.flippedCards = [];
		this.delay = 1000;
		this.startTime = null;
		this.timerElement = document.createElement('div');
		this.timerElement.className = 'timer';
		document.body.appendChild(this.timerElement);
		this.updateTimerInterval = null;
		this.initGame();
	}

	initGame() {
		this.cards.forEach(card => {
			card.addEventListener('click', this.flip.bind(this, card));
		});
		this.rearrangeCards();
		this.startTime = new Date();
		this.updateTimerInterval = setInterval(this.updateTimer.bind(this), 1000);
	}

	rearrangeCards() {
		this.cards.forEach(card => {
			const randomNumber = Math.floor(Math.random() * this.cards.length);
			card.classList.remove('has-match', 'flipped');
			setTimeout(() => {
				card.style.order = `${randomNumber}`;
			}, 400);
		});
	}

	validateCards() {
        const [firstCard, secondCard] = this.flippedCards;
        
        this.cardsContainer.classList.add('no-event');
        
		if (firstCard.dataset.animal === secondCard.dataset.animal) {
			firstCard.classList.replace('flipped', 'has-match');
			secondCard.classList.replace('flipped', 'has-match');
            
            this.flippedCards = [];
            
            setTimeout(() => {
                const allHaveMatches = this.cards.every(card => (
                    card.classList.contains('has-match')
                ));
                
                this.cardsContainer.classList.remove('no-event');
                
                if (allHaveMatches) {
					clearInterval(this.updateTimerInterval);
                    this.showCongratulations();
                }
            }, this.delay);
		}
		else {
			setTimeout(() => {
				firstCard.classList.remove('flipped');
				secondCard.classList.remove('flipped');
                
                this.flippedCards = [];
                
                this.cardsContainer.classList.remove('no-event');
			}, this.delay);
		}
	}

	flip(selectedCard) {
		selectedCard.classList.add('flipped');
        
        this.flippedCards.push(selectedCard);

		if (this.flippedCards.length === 2) {
			this.validateCards();
		}
	}

	updateTimer() {
		const currentTime = new Date();
		const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
		this.timerElement.textContent = `Time: ${elapsedTime} seconds`;
	}

	showCongratulations() {
		const elapsedTime = Math.floor((new Date() - this.startTime) / 1000);
		const message = `Congratulations! You matched all cards in ${elapsedTime} seconds.`;
		alert(message);
		this.rearrangeCards();
		this.startTime = new Date();
		this.updateTimerInterval = setInterval(this.updateTimer.bind(this), 1000);
	}
}

const game = new MemoryGame();
