const input = require('sync-input');

const coffeeMachine = {
    waterMachineTotal: 400,  // 400 ml
    milkMachineTotal: 540,  // 540 ml
    beansMachineTotal: 120, //120 g
    sugarMachineTotal: 40,  // 40 g; 2g per serving
    cupsMachineTotal: 9, // 9 pc
    moneyMachineTotal: 550, // 550 $

    currentState: function () {
        console.log('The coffee machine has:');
        console.log(`${this.waterMachineTotal} ml of water`);
        console.log(`${this.milkMachineTotal} ml of milk`);
        console.log(`${this.beansMachineTotal} g of coffee beans`);
        console.log(`${this.sugarMachineTotal} g of sugar`);
        console.log(`${this.cupsMachineTotal} disposable cups`);
        console.log(`$${this.moneyMachineTotal} of money`);
    },
    buy: function (num) {
        switch (num) {
            case '1': {
                this.waterMachineTotal -= coffee.espresso.water;
                this.beansMachineTotal -= coffee.espresso.beans;
                this.cupsMachineTotal -= coffee.espresso.cups;
                this.moneyMachineTotal += coffee.espresso.cost;
                break
            }
            case '2': {
                this.waterMachineTotal -= coffee.latte.water;
                this.milkMachineTotal -= coffee.latte.milk;
                this.beansMachineTotal -= coffee.latte.beans;
                this.cupsMachineTotal -= coffee.latte.cups;
                this.moneyMachineTotal += coffee.latte.cost;
                break;
            }
            case '3': {
                this.waterMachineTotal -= coffee.cappuccino.water;
                this.milkMachineTotal -= coffee.cappuccino.milk;
                this.beansMachineTotal -= coffee.cappuccino.beans;
                this.cupsMachineTotal -= coffee.cappuccino.cups;
                this.moneyMachineTotal += coffee.cappuccino.cost;
                break;
            }
        }
    },
    addSugar: function (serving) {
        this.sugarMachineTotal -= serving * 2; // 2g per serving
        this.moneyMachineTotal += serving * 0.5; //$0.5 per serving
    },
    fill: function (a, b, c, d, e) {
        this.waterMachineTotal += a;
        this.milkMachineTotal += b;
        this.beansMachineTotal += c;
        this.sugarMachineTotal += e;
        this.cupsMachineTotal += d;
    },
    setMoney: function (number) {
        this.moneyMachineTotal = number;
    }
}

const coffee = {
    espresso: {
        water: 250,  // ml
        milk: 0,  // ml
        beans: 16, //g
        cups: 1, // pc
        cost: 4  // $
    }, latte: {
        water: 350,  // ml
        milk: 75,  // ml
        beans: 20, //g
        cups: 1, // pc
        cost: 7  // $
    }, cappuccino: {
        water: 200,  // ml
        milk: 100,  // ml
        beans: 12, //g
        cups: 1, // pc
        cost: 6  // $
    }
}

function menu() {
    while (true) {
        console.log('Write action (buy, fill, take, remaining, exit):');
        let choice = input();
        choice = choice.trim();
        switch (choice) {
            case 'buy': {
                buyFromMachine();
                break;
            }
            case 'fill': {
                fillMachine();
                break;
            }
            case 'take': {
                takeFromMachine();
                break;
            }
            case 'remaining' : {
                remainInMachine();
                break;
            }
            case 'exit': {
                return;
            }
            default: {
                console.log('No such action');
            }
        }
        console.log();
    }
}

function buyFromMachine() {
    console.log('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:');
    let whatCoffee = input();
    whatCoffee = whatCoffee.trim();
    if (whatCoffee === 'back') {return;}
    console.log('Would you like to add sugar (y/n)?');
    let sugar = input();
    sugar = sugar.trim().toLowerCase();
    if (sugar === 'y') {
        console.log('How many servings of sugar? (2g / $0.5 per serving)');
        let serving = input();
        serving = Number(serving.trim());
        if (coffeeMachine.sugarMachineTotal >= serving * 2) {
            coffeeMachine.addSugar(serving);
        } else {console.log(`Sorry, not enough sugar!`);}
    }
    const isCanDo = checkIngredients(whatCoffee);
    if (isCanDo) {
        coffeeMachine.buy(whatCoffee);
    }
}

function checkIngredients(whatCoffee) {
    let missing = [];
    switch (whatCoffee) {
        case '1': {
            if ( coffeeMachine.waterMachineTotal < coffee.espresso.water) {missing.push('water');}
            if ( coffeeMachine.beansMachineTotal < coffee.espresso.beans) {missing.push('beans');}
            if ( coffeeMachine.cupsMachineTotal < coffee.espresso.cups) {missing.push('cups');}
            break;}
        case '2': {
            if ( coffeeMachine.waterMachineTotal < coffee.latte.water) {missing.push('water');}
            if ( coffeeMachine.milkMachineTotal < coffee.latte.milk) {missing.push('milk');}
            if ( coffeeMachine.beansMachineTotal < coffee.latte.beans) {missing.push('beans');}
            if ( coffeeMachine.cupsMachineTotal < coffee.latte.cups) {missing.push('cups');}
            break;}
        case '3': {
            if ( coffeeMachine.waterMachineTotal < coffee.cappuccino.water) {missing.push('water');}
            if ( coffeeMachine.milkMachineTotal < coffee.cappuccino.milk) {missing.push('milk');}
            if ( coffeeMachine.beansMachineTotal < coffee.cappuccino.beans) {missing.push('beans');}
            if ( coffeeMachine.cupsMachineTotal < coffee.cappuccino.cups) {missing.push('cups');}
            break;}
    }
    if (missing.length === 0) {
        console.log(`I have enough resources, making you a coffee!`);
        return true
    }
    if (missing.length > 0) {
        console.log(`Sorry, not enough ${missing.join(', ')}!`);
        return false
    }

}

function fillMachine() {
    console.log('Write how many ml of water you want to add:');
    let a = input();
    a = Number(a);
    console.log('Write how many ml of milk you want to add:');
    let b = input();
    b = Number(b);
    console.log('Write how many grams of coffee beans you want to add:');
    let c = input();
    c = Number(c);
    console.log('Write how many disposable cups you want to add:');
    let d = input();
    d = Number(d);
    console.log("Write how many grams of sugar you want to add:");
    const e = Number(input());

    coffeeMachine.fill(a, b, c, d, e);
}

function takeFromMachine() {
    const moneyTaken = coffeeMachine.moneyMachineTotal;
    console.log(`I gave you $${moneyTaken}`);
    coffeeMachine.setMoney(0);
}

function remainInMachine() {
    console.log();
    coffeeMachine.currentState();
}

// Start
menu();
