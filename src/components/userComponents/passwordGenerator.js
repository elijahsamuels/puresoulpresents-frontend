const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const length = 8;
let randomPassword = "";

for (let i = 0; i < length; i++) {
  const randomNum = Math.floor(Math.random() * characters.length);
  randomPassword += characters[randomNum];
}

console.log(randomPassword);