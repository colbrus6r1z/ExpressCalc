function createFrequencyCounter(arr) {
    return arr.reduce(function(acc, next) {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
    }, {});
}

/*Most common element*/
function findMode(arr) {
    let freqCounter = createFrequencyCounter(arr);
    
    let count = 0;
    let mostFrequent;

    for (let key in freqCounter) {
        if (freqCounter[key] > count) {
            count = freqCounter[key];
            mostFrequent = key;
        }
    }

    return mostFrequent;
}

function findMean(nums) {
    if (nums.length === 0) {
        return 0;
    }
    
    return nums.reduce((acc, num) => acc + num, 0) / nums.length;
}

function findMedian(nums) {

    nums.sort((a,b) => a-b);

    let middleIndex = Math.floor(nums.length/2);
    let median;
    
    if (nums.length % 2 === 0) {
        median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
        median = nums[middleIndex];
    }
    
    return median;
}

module.exports = {
    createFrequencyCounter,
    findMode,
    findMean,
    findMedian
};
