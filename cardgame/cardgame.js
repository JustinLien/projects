'use strict';

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
}

class Deck {
  constructor() {
    this.deck = [];
  }

  /*
  * Create number of deck of cards.
  * Default of 1 is no number is provided.
  * @param {integer} n
  * @return {undefined}
  */
  createDeck(n = 1) {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

    // Create total number of deck.
    for (let numOfDeck = 0; numOfDeck < n; numOfDeck++) {
      // Create total number of suit (4)
      for (let i = 0; i < suits.length; i++) {
        // Create total number of rank in a suit (13)
        for (let j = 0; j < ranks.length; j++) {
          this.deck.push(new Card(ranks[j], suits[i]));
        }
      }
    }

    console.log('There are ', (n * ranks.length * suits.length) + ' total number of cards in the deck.');
  }

  /*
  * Generate a random index from the deck.
  * @return {integer}
  */
  getRandomCardIndex() {
    return ~~(Math.random() * this.deck.length);
  }

  /*
  * Deal card off top of the deck.
  * n returns number of card to deal.
  * @param {integer} numOfTimeToShuffle
  * @return {undefined}
  */
  shuffle(numOfTimeToShuffle = 1) {
    let tempCard, randomIndex;

    if (!this.deck.length) {
      throw 'No more card to suffle.';
    }

    for (let i = 0; i < numOfTimeToShuffle; i++) {
      for (let j = 0; j < this.deck.length; j++) {
        randomIndex = this.getRandomCardIndex();
        tempCard = this.deck[j];
        this.deck[j] = this.deck[randomIndex];
        this.deck[randomIndex] = tempCard;
      }
    }
    
    console.log('Cards Shuffled ', numOfTimeToShuffle + ' time!');
  }

  /*
  * Deal card off top of the deck.
  * n returns number of card to deal.
  * @param {integer} n
  * @return {array}
  */
  deal(n = 1) {
    let hand = [];

    for (let i = 0; i < n; i++) {
      if (this.deck.length > 0) {
        hand.push(this.deck.shift());
      } else {
        console.log('Deck is empty');
      }
    }

    return hand;
  }

  /*
  * Draw a random card from deck.
  * @param {integer} n
  * @return {object || null}
  */
  drawRandom(n) {
    let card;
    let randomIndex = this.getRandomCardIndex();

    card = this.deck[randomIndex];
    this.deck.splice(randomIndex, 1);

    return card;
  }

  draw(n) {
    let card = null;

    if (n >= 0 && n < this.deck.length) {
      card = this.deck[n];
      // Remove card from deck.
      this.deck.splice(n, 1);
    }

    return card;
  }

  count() {
    console.log('Total # of card in the deck: ', this.deck.length);
    return this.deck.length;
  }
}

const deck = new Deck();
console.log('deck', deck);

deck.createDeck(1);
deck.shuffle(3);

console.log('deck', deck);
deck.count();
deck.drawRandom();
deck.drawRandom();
deck.count();

deck.draw(12);
deck.draw(3);
deck.count();

