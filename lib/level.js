let easy = [];
let medium = [];
let hard = [];
for (let i = 0; i < 5; i++) {
  easy.push({
    level: i + 1,
    row: 2,
    time: 10 - i,
  });
}

for (let i = 5; i < 50; i++) {
  easy.push({
    level: i + 1,
    row: 4,
    time: i > 40 ? 20 : 100 - i * 2,
  });
}

export const levels = [...easy, ...medium, ...hard];
