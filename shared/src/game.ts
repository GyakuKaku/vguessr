import { VTuber, GuessResult, User } from "./types";

export function checkGuess(
  user: User | null,
  guess: VTuber,
  target: VTuber
): GuessResult {
  const nameMatch = guess.name
    .split("")
    .map((char, index) => target.name[index] === char);

  const differences: GuessResult["differences"] = [];

  // 添加名字
  differences.push({
    attribute: "名字",
    value: guess.name,
    isMatch: guess.name === target.name,
  });

  // 检查团体
  differences.push({
    attribute: "团体",
    value: guess.agency || "无",
    isMatch: guess.agency === target.agency,
  });

  // 检查性别
  differences.push({
    attribute: "性别",
    value: guess.gender,
    isMatch: guess.gender === target.gender,
  });

  // 检查生日
  const guessBirthDate = [
    guess.birthDate.split("月")[0],
    guess.birthDate.split("月")[1].split("日")[0],
  ];
  const targetBirthDate = [
    target.birthDate.split("月")[0],
    target.birthDate.split("月")[1].split("日")[0],
  ];

  const guessBirthDateNum =
    parseInt(guessBirthDate[0], 10) * 100 + parseInt(guessBirthDate[1], 10);
  const targetBirthDateNum =
    parseInt(targetBirthDate[0], 10) * 100 + parseInt(targetBirthDate[1], 10);

  const birthDateMatch = guessBirthDateNum === targetBirthDateNum;
  const birthDateHint = !birthDateMatch
    ? targetBirthDateNum > guessBirthDateNum
      ? "higher"
      : "lower"
    : "equal";

  differences.push({
    attribute: "生日",
    value: guess.birthDate,
    isMatch: birthDateMatch,
    hint: birthDateHint,
  });

  // 检查出道时间
  const debutDateMatch = guess.debutDate === target.debutDate;
  const debutDateHint = !debutDateMatch
    ? target.debutDate > guess.debutDate
      ? "higher"
      : "lower"
    : "equal";

  differences.push({
    attribute: "出道时间",
    value: guess.debutDate,
    isMatch: debutDateMatch,
    hint: debutDateHint,
  });

  // 检查身高
  const heightMatch = guess.height === target.height;
  const heightHint = !heightMatch
    ? target.height > guess.height
      ? "higher"
      : "lower"
    : "equal";
  differences.push({
    attribute: "身高",
    value: guess.height,
    isMatch: heightMatch,
    hint: heightHint,
  });

  // 检查发色
  differences.push({
    attribute: "发色",
    value: guess.hairColor,
    isMatch: guess.hairColor === target.hairColor,
  });

  // 检查瞳色
  differences.push({
    attribute: "瞳色",
    value: guess.eyeColor,
    isMatch: guess.eyeColor === target.eyeColor,
  });

  differences.push({
    attribute: "星座",
    value: guess.seiza,
    isMatch: guess.seiza === target.seiza,
  });

  // 检查标签
  if (guess.tags) {
    guess.tags.forEach((tag) => {
      const isMatch = target.tags?.includes(tag) || false;
      differences.push({
        attribute: "标签",
        value: tag,
        isMatch,
      });
    });
  }

  return {
    user: user,
    marker: 0,
    isCorrect: guess.id === target.id,
    name: guess.name,
    nameMatch,
    differences,
  };
}
