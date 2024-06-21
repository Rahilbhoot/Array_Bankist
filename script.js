'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements,sort=false) {
  containerMovements.innerHTML = '';

  const movs=sort?movements.slice().sort((a,b)=>a-b): movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  
  labelBalance.textContent = `${acc.balance}₹`;
};
// calcPrintBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}₹`;

  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(outcomes)}₹`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => mov * acc.interestRate / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    }).reduce((acc, mov) => acc + mov);

  labelSumInterest.textContent = `${intrest}₹`
}
// calcDisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner.toLocaleLowerCase().split(' ').map(function (name) {
      return name[0];
    }).join('');
  })
}

const updateUI=function(acc){
   // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcPrintBalance(acc);
    // Display summary

    calcDisplaySummary(acc);
}

createUsernames(accounts);//stw

// EVENT HANDLERS
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // prevent form form submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and a welcome message

    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur();
   
    // Update UI
    updateUI(currentAccount);
  }

})


btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(acc=> acc.username===  inputTransferTo.value);
  
  inputTransferAmount.value=inputTransferTo.value='';

  if(amount>0 &&
    receiverAcc&&
     amount<=currentAccount.balance &&
      receiverAcc?.username !== currentAccount.username)
    {
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);


      // Update UI
      updateUI(currentAccount);
    }
});

btnLoan.addEventListener('click',function(e){
  e.preventDefault();
  const amount=Number(inputLoanAmount.value)
  console.log('Hello');
  if(amount>0 && currentAccount.movements.some(mov=> mov>= amount*0.1)){
    console.log('hi');
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value='';
})

btnClose.addEventListener('click',function(e){
  e.preventDefault();
  const enteredUser=inputCloseUsername.value;
  const enteredPin=Number(inputClosePin.value);

  if(enteredUser==currentAccount.username &&  enteredPin == currentAccount.pin){
    const index=accounts.findIndex(acc=>acc.username==currentAccount.username);

    // delete
    accounts.splice(index,1);

    // hide UI
    containerApp.style.opacity=0;
  }
  inputClosePin.value=inputCloseUsername.value='';
})

let sorted=false;

btnSort.addEventListener('click',function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
})

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// [OPTIONAL]{its basically all topics practice you can ignore it......😊}



// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());

// // SPLICE
// // console.log(arr.splice(2));
// // arr.splice(-1);
// // console.log(arr);
// // arr.splice(1, 2);
// // console.log(arr);

// // REVERSE
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // CONCAT
// const letters = arr.concat(arr2);
// console.log(letters);

// // JOIN
// console.log(letters.join('-'));

// const arr = [23, 11, 64];
// console.log(arr[0]);
// console.log(arr.at(0));

// // getting the last element
// console.log(arr[arr.length - 1]);
// console.log(arr.slice(-1)[0]);
// console.log(arr.at(-2));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: You diposited ${movement}`);
//   } else {
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }


// console.log(`\n\nWith For EACH`);
// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} : You diposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// })

// Break and continue does not work in forEach loop so i you want to do any type of breaking within loop you should use forOf loop.


// MAP FOREACH
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`Currency of ${key} is called ${value}`);
// })

// // set
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// currenciesUnique.forEach(function (value, _, set) {
//   console.log(value);
// })


//CODING CHALLENGE 1 

// Julia and Kate are doing a study on dogs.So each of them asked 5 dog owners 
// about their dog's age, and stored the data into an array (one array for each). For 
// now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years
// old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
//   ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have
// cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
// ages from that copied array(because it's a bad practice to mutate function 
// parameters)
// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
// �
// ")
// 4. Run the function for both test datasets
// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data[4, 1, 15, 8, 3]
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data[10, 5, 6, 1, 4]
// Hints: Use tools from all lectures in this section so far 

// const Julia = [3, 5, 2, 12, 7];
// const Kate = [4, 1, 15, 8, 3];

// const checkDogs = function (dogsJulia, dogsKate) {
//   let correctJulia = dogsJulia.slice(1, -2);
//   console.log(correctJulia);
//   const finalDogsAge = correctJulia.concat(dogsKate);

//   finalDogsAge.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy `)
//     }
//   })

// }

// checkDogs(Julia, Kate);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euToUsd = 1.1;

// const movementsUsd = movements.map(function (mov) {
//   return mov * euToUsd;
// })

// console.log(movements);
// console.log(movementsUsd);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * euToUsd);
// console.log(movementsUSDfor);

// const movementsUSDarr = [];

// const movementsarr = movements.map(mov => mov * euToUsd)
// console.log(movementsarr);

// const movementsDescriptions = movements.map((mov, i, arr) => {
//   if (mov > 0) {
//     return (`Movements${i + 1}: You deposited ${mov}`);
//   } else {
//     return (`Movement ${i + 1}: you withdrew ${Math.abs(mov)}`);
//   }
// })

// console.log(movementsDescriptions);


// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = []

// for (const mov of movements) {
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// }
// console.log(depositsFor);

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// })
// console.log(withdrawals);

// const withdrawalsFor = [];
// for (const mov of movements) {
//   if (mov < 0) {
//     withdrawalsFor.push(mov);
//   }
// }
// console.log(withdrawalsFor);
// console.log(movements);
// // accumulator->snowball
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   return acc + cur;
// }, 0);
// console.log(balance);

// let balanceSum = 0;
// for (const mov of movements) {
//   balanceSum += mov;
// }

// console.log(balanceSum);

// const findBalance = movements.reduce((acc, cur) => acc + cur, 0);
// console.log(findBalance);

// // maximum value of movement

// const maximumMov = movements.reduce((acc, cur) => {
//   if (cur >= acc) {
//     acc = cur;
//   }
//   return acc;

// })
// console.log(maximumMov);

// CHALLENGE 2
// Let's go back to Julia and Kate's study about dogs.This time, they want to convert 
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's 
// ages('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is 
// <= 2 years old, humanAge = 2 * dogAge.If the dog is > 2 years old,
//   humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old(which is the same as
//   keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs(you should already know 
// from other challenges how we calculate averages �)
// 4. Run the function for both test datasets
// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]
// GOOD LUCK 

// const dog1 = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (dog) {
//   const humanCalc = dog.map((cur, i) => {
//     if (cur <= 2) {
//       return 2 * cur;
//     } else {
//       return 16 + cur * 4;
//     }
//   })

//   const adultDogs = dog.filter((cur, i) => {
//     return humanCalc[i] >= 18;
//   })

//   let count = 0;
//   console.log(humanCalc);
//   const sumHumanage = humanCalc.reduce((acc, cur) => {
//     if (cur >= 18) {
//       return acc + cur, 0;
//       count++;
//     }
//   })

//   console.log(sumHumanage);
//   const averageAge = sumHumanage / count;
//   console.log(`Average : ${averageAge}`);

// }

// calcAverageHumanAge(dog1);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // PIPELINE
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   // .map(mov => mov * 1.1)
//   // Just for info 👇
//   .map((mov, i, arr) => {
//     // console.log(arr);
//     return mov * 1.1
//   })
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(`${totalDepositsUSD}$`);

// const finalDemo = movements.find(mov => mov < 0);
// console.log(finalDemo);

// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') {
//     console.log(acc);
//   }
// }

/*console.log(movements);
// Equality
console.log(movements.includes(-130));

// Condition
console.log(movements.some(mov=> mov===-130));

const anyDeposits= movements.some(mov => mov> 5000);
console.log(anyDeposits);

// Every
console.log(account4.movements.every(mov=> mov>0));

// Separate callback
const deposite= mov => mov > 0;
console.log(movements.some(deposite));
console.log(movements.every(deposite));
console.log(movements.filter(deposite));*/

/*const arr=[[1,2,3],[4,5,6],7,8];
// Flat method is used to remove nested arrays
console.log(arr.flat());

const arrDeep=[[[1,2],3,4],[5,6,[7,8]],9,10];
// It goes only one level deep not more. We have to change its parameter to do so.As below 👇
console.log(arrDeep.flat(2));

const accountsMovements=accounts.map(acc=>acc.movements);
console.log(accountsMovements);
const allMovements=accountsMovements.flat();
console.log(allMovements);
const overallBalance=allMovements.reduce((acc,mov)=> acc+mov,0);
console.log(overallBalance);

// flat
const nextResult=accounts.map(acc=>acc.movements).flat().reduce((acc,mov)=> acc+mov,0);
console.log(nextResult);


// flat Map
const nextResult2=accounts.flatMap(acc=>acc.movements).reduce((acc,mov)=> acc+mov,0);
console.log(nextResult2);*/

// const owners=['Jonas','Zack','Adam','Martha'];
// console.log(owners.sort());
// console.log(owners);

// console.log(movements);

// // return <0 A,B, return >0 B,A
// // Ascending
// movements.sort((a,b)=>a-b);

// // Descending
// movements.sort((a,b)=>b-a);
// console.log(movements);

/*const arr=[1,2,3,4,5,6,7,8,9];
console.log(new Array(1,2,3,4,5,6,7,8,9));

const x=new Array(7);
console.log(x);
console.log(x.map(()=> 5));

// Array.fill
x.fill(1,3,5);
console.log(x);

// Array . form
const y=Array.from({length:7},()=> 1);
console.log(y);

const z=Array.from({length:7},(_,i)=>i+1);
console.log(z);

const diceRolls=Array.from({length:100},()=> Math.floor(Math.random()*6)+1);
console.log(diceRolls);



labelBalance.addEventListener('click',function(){
  const movementsUI=Array.from(document.querySelectorAll('.movements__value'));
  console.log(movementsUI.map(el=>Number(el.textContent.replace('₹',''))));
})*/