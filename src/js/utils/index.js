'use strict';

let _id = 0;

export function getId() {
    return _id++;
}

export function getRandomInt() {
    if (arguments.length == 1) {
        const max = arguments[0];
        return Math.floor(max * Math.random());
    }
    else {
        const min = arguments[0], max = arguments[1];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export function getRandomArray(n) {
    return Array.apply(null, { length: n }).map(() => getRandomInt(n - 1));
}

export function countMatchElements(array, target) {
    const exactMatch = target.reduce((sum, v, i) => v === array[i] ? ++sum : sum, 0);

    const sortedTarget = target.slice().sort((a, b) => a > b).reduce((obj, v) =>
        (obj[v] > 0 ? obj[v]++ : obj[v] = 1, obj), {})

    const sortedArray = array.slice().sort((a, b) => a > b).reduce((obj, v) =>
        (obj[v] > 0 ? obj[v]++ : obj[v] = 1, obj), {})

    const looseMatch = Object.keys(sortedTarget).reduce((matchNumber, key) =>
        matchNumber += Math.min(sortedTarget[key], sortedArray[key] || 0), 0) - exactMatch;

    return { exactMatch, looseMatch };
}
