/*
  * Форматирует оценку: домножает на множитель и отсекается лишние знакие после 
    запятой

  * @param {number | undefined} scoreAVG - оценка
  * @returns number - отформартированная оценка

*/

const digitsAfterComma = 2;

const formatScoreAVG = (scoreAVG: number | undefined): number => {
    if (!scoreAVG) {
        console.error('Wrong scoreAVG value {undefined}');
        return 0;
    }

    const isNumber = !!Number(scoreAVG);

    if (!isNumber) {
        console.error('Wrong scoreAVG value {not number}');
        return 0;
    }

    const result = Number(scoreAVG.toFixed(digitsAfterComma));

    return result;
};

export default formatScoreAVG;
