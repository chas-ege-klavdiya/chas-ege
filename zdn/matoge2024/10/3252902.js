(function () {
    'use strict';
    retryWhileError(function () {
        NAinfo.requireApiVersion(0, 2);
        let key = '3252902';
        let preference = ['sameColors', 'diffColors'];
        let targetColor = getSelectedPreferenceFromList(key, preference);

        // После первого извлечения остаётся total - 1 предметов; делитель 1000 даёт ответ с не более чем тремя знаками
        let total = [20, 25, 40, 50].iz() + 1;
        let color1 = sl(Math.max(10, total - 30), Math.min(40, total - 10));
        let color2 = total - color1;

        let probability = [color1 - 1, color2][targetColor] / (total - 1);

        // Прилагательные на -ый, -ой, -ий: «синий» — мягкий тип, остальные — твёрдый
        let adjectiveForms = function (adjective) {
            let stem = adjective.slice(0, -2);
            let soft = adjective.endsWith('ий');
            return {
                ie: adjective,
                rm: stem + (soft ? 'их' : 'ых'),
                te: stem + (soft ? 'им' : 'ым'),
            };
        };
        // «21 синий», но «22 синих», «11 синих»
        let countWithAdjective = function (count, adjective) {
            let form = (count % 10 == 1 && count % 100 != 11) ? adjective.ie : adjective.rm;
            return count + ' ' + form;
        };

        let colorName = om.trickyColors.iz(2).map(adjectiveForms);
        let item = sklonlxkand(['карандаш', 'фломастер', 'маркер', 'ластик', 'транспортир', 'циркуль', 'угольник', 'корректор', 'степлер', 'трафарет'].iz());
        let itemsAfterColor2 = chislitlx(color2, item.ie, 're').replace(/^\d+ /, '');
        let secondColor = ['тоже ' + colorName[0].te, colorName[1].te][targetColor];

        genAssertZ1000(probability);

        NAtask.setTask({
            text: 'Из ящика, где хранятся ' + countWithAdjective(color1, colorName[0]) + ' и ' + countWithAdjective(color2, colorName[1]) + ' ' + itemsAfterColor2 + ', ' +
                'не глядя достали два ' + item.re + '. Известно, что первый ' + item.ie + ' оказался ' + colorName[0].te + '. ' +
                'Найдите вероятность того, что второй ' + item.ie + ' оказался ' + secondColor + '.',
            answers: probability,
            preference: preference,
        });
    }, 100);
})();
//3252902
//Открытый банк заданий 31A2A6
