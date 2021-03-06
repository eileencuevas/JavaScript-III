/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject(objectAttributes) {
  this.createdAt = objectAttributes.createdAt;
  this.dimensions = objectAttributes.dimensions;
}

GameObject.prototype.destroy = function() {
  return `${this.name} took damage and was defeated! ${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(charAttributes) {
  GameObject.call(this, charAttributes);
  this.hp = charAttributes.hp;
  this.name = charAttributes.name;
}

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage. ${this.name}'s HP is now ${this.hp}.`;
}

CharacterStats.prototype.restoredHP = function() {
  return `${this.name} has recovered ${this.restoration} HP.`;
}

CharacterStats.prototype.drainedHP = function(enemy) {
  return `${this.name} has drained ${enemy.name}'s HP! ${this.name} recovered ${this.restoration} HP.`;
}


/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

function Humanoid(humanAttributes) {
  CharacterStats.call(this, humanAttributes);
  this.faction = humanAttributes.faction;
  this.weapons = humanAttributes.weapons;
  this.language = humanAttributes.language;
}
 
Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
}


/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by uncommenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });
  

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villian and one a hero and fight it out with methods!

  function Hero(heroAttributes) {
    Humanoid.call(this, heroAttributes);
    this.strength = heroAttributes.strength;
    this.restoration = heroAttributes.restoration;
  }

  Hero.prototype = Object.create(Humanoid.prototype);
  

  Hero.prototype.attack = function(villian) {
    if (villian.hp > 0 && this.hp > 0) {
      villian.hp = villian.hp - this.strength;

      if(villian.hp <= 0) {
        return villian.destroy();
      }

      return villian.takeDamage();
    } else if (villian.hp <= 0 && this.hp > 0){
      return `Cannot Be Attacked: ${villian.name} has already been removed.`
    } else {
      return `${this.name} Cannot Attack: ${this.name} has already been removed.`
    }
  }

  Hero.prototype.restoreHP = function(hero) {
    if (this.hp > 0 && hero.hp > 0) {
      hero.hp = hero.hp + this.restoration;

      return hero.restoredHP();
    } else if (this.hp <= 0 && hero.hp > 0){
      return `Cannot Be Healed: ${hero.name} has already been removed.`
    } else {
      return `${this.name} Cannot Heal: ${this.name} has already been removed.`
    }
  }



  function Villian(villianAttributes) {
    Humanoid.call(this, villianAttributes);
    this.strength = villianAttributes.strength;
    this.restoration = villianAttributes.restoration;
  }

  Villian.prototype = Object.create(Humanoid.prototype);


  Villian.prototype.attack = function(hero) {
    if (hero.hp > 0 && this.hp > 0) {
      hero.hp = hero.hp - this.strength;

      if(hero.hp <= 0) {
        return hero.destroy();
      }

      return hero.takeDamage();
    } else if (hero.hp <= 0 && this.hp > 0){
      return `Cannot Be Attacked: ${hero.name} has already been removed.`
    } else {
      return `${this.name} Cannot Attack: ${this.name} has already been removed.`
    }
  }

  Villian.prototype.drainHP = function(hero) {
    if (this.hp > 0 && hero.hp > 0) {
      hero.hp = hero.hp - this.restoration;
      this.hp = this.hp + this.restoration;

      return this.drainedHP(hero);
    } else if (hero.hp <= 0 && this.hp > 0){
      return `Cannot Be Drained: ${hero.name} has already been removed.`
    } else {
      return `${this.name} Cannot Drain: ${this.name} has already been removed.`
    }
  }



  const hero = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 5,
    },
    hp: 10,
    name: 'Good Sir Turnip',
    faction: 'Whatever',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Vegatable',
    strength: 2,
    restoration: 3
  });

  
  const villian = new Villian({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 3,
      height: 5,
    },
    hp: 10,
    name: 'Misunderstood Radish',
    faction: 'Whatever',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Vegetable',
    strength: 3,
    restoration: 2
  });

  // console.log(hero.attack(villian));
  // console.log(hero.attack(villian));
  // console.log(hero.attack(villian));
  // console.log(hero.attack(villian));
  // console.log(hero.attack(villian));
  // console.log(hero.attack(villian));

  // console.log(villian.attack(hero));
  // console.log(villian.attack(hero));
  // console.log(villian.attack(hero));
  // console.log(villian.attack(hero));
  // console.log(villian.attack(hero));
  // console.log(villian.attack(hero));

  console.log(hero.attack(villian));
  console.log(villian.drainHP(hero));
  console.log(hero.attack(villian));
  console.log(villian.attack(hero));
  console.log(hero.attack(villian));
  console.log(villian.attack(hero));
  console.log(hero.attack(villian));
  console.log(villian.attack(hero));
  console.log(hero.restoreHP(hero));
  console.log(villian.attack(hero));

  // console.log(villian.attack(hero));
  // console.log(hero.attack(villian));
  // console.log(villian.attack(hero));
  // console.log(hero.attack(villian));
  // console.log(villian.attack(hero));
  // console.log(hero.restoreHP(hero));
  // console.log(villian.attack(hero));
  // console.log(villian.attack(hero));
  // console.log(hero.attack(villian));
  // console.log(villian.attack(hero));