let stage = [];
for (let i = 0; i < 10; i++) {
  stage.push({
    level: i + 1,
    row: 2,
    col: 2,
    time: 10 - i + 10,
  });
}

for (let i = 10; i <= 1000; i++) {
  let col = 0;
  if (i >= 10 && i < 20) {
    col = 2;
  } else if (i >= 20 && i < 40) {
    col = 3;
  } else if (i >= 40 && i < 80) {
    col = 4;
  } else if (i >= 80 && i < 150) {
    col = 5;
  } else if (i >= 150 && i <= 200) {
    col = 6;
  }
  stage.push({
    level: i + 1,
    row: 4,
    col: col,
    time: 30,
  });
}

export const levels = [...stage];
