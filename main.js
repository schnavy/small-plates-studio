let moveContainers = document.querySelectorAll('.move-container');

const mathFunctions = [
    {
        name: 'linear',
        calc: (index, maxIndex, maxMargin) => (index / maxIndex) * maxMargin
    },
    {
        name: 'quadratic',
        calc: (index, maxIndex, maxMargin) => Math.pow(index / maxIndex, 2) * maxMargin
    },
    {
        name: 'squareRoot',
        calc: (index, maxIndex, maxMargin) => Math.sqrt(index / maxIndex) * maxMargin
    },
    {
        name: 'cubic',
        calc: (index, maxIndex, maxMargin) => Math.pow(index / maxIndex, 3) * maxMargin
    },
    {
        name: 'logarithmic',
        calc: (index, maxIndex, maxMargin) => {
            const logMax = Math.log(maxIndex + 1);
            return (Math.log(index + 1) / logMax) * maxMargin;
        }
    },
    {
        name: 'exponential',
        calc: (index, maxIndex, maxMargin) => {
            const expMax = Math.exp(2) - 1;
            return ((Math.exp(2 * index / maxIndex) - 1) / expMax) * maxMargin;
        }
    },
    {
        name: 'sine',
        calc: (index, maxIndex, maxMargin) => {
            const linearPart = (index / maxIndex) * 0.7;
            const sinePart = (Math.sin((index / maxIndex) * Math.PI - Math.PI / 2) + 1) / 2 * 0.3;
            return (linearPart + sinePart) * maxMargin;
        }
    },
    {
        name: 'easeInOut',
        calc: (index, maxIndex, maxMargin) => {
            const t = index / maxIndex;
            const eased = t < 0.5
                ? 2 * t * t
                : -1 + (4 - 2 * t) * t;
            return eased * maxMargin;
        }
    },
    {
        name: 'reverseLinear',
        calc: (index, maxIndex, maxMargin) => maxMargin - (index / maxIndex) * maxMargin
    },
    {
        name: 'reverseQuadratic',
        calc: (index, maxIndex, maxMargin) => maxMargin - Math.pow(index / maxIndex, 2) * maxMargin
    },
    {
        name: 'reverseCubic',
        calc: (index, maxIndex, maxMargin) => maxMargin - Math.pow(index / maxIndex, 3) * maxMargin
    },
    {
        name: 'wave',
        calc: (index, maxIndex, maxMargin) => {
            // Oscillating wave pattern
            const waves = 2; // number of complete waves
            return (Math.sin(index / maxIndex * Math.PI * waves) * 0.5 + 0.5) * maxMargin;
        }
    },
    {
        name: 'peakInMiddle',
        calc: (index, maxIndex, maxMargin) => {
            // Starts low, peaks in middle, ends low
            const t = index / maxIndex;
            return Math.sin(t * Math.PI) * maxMargin;
        }
    },
    {
        name: 'valley',
        calc: (index, maxIndex, maxMargin) => {
            // Starts high, dips in middle, ends high
            const t = index / maxIndex;
            return (1 - Math.sin(t * Math.PI)) * maxMargin * 0.7 + maxMargin * 0.3;
        }
    },
    {
        name: 'stepUp',
        calc: (index, maxIndex, maxMargin) => {
            // Discrete steps
            const steps = 4;
            const stepSize = maxMargin / steps;
            return Math.floor((index / maxIndex) * steps) * stepSize;
        }
    },
    {
        name: 'stepDown',
        calc: (index, maxIndex, maxMargin) => {
            // Reverse discrete steps
            const steps = 4;
            const stepSize = maxMargin / steps;
            return maxMargin - Math.floor((index / maxIndex) * steps) * stepSize;
        }
    },
];

window.addEventListener('load', () => {
    setTimeout(() => {
        moveContainers.forEach(container => {
            let lines = container.querySelectorAll('div, h2, h3');
            const selectedFunc = mathFunctions[Math.floor(Math.random() * mathFunctions.length)];

            const maxMarginVw = 20;
            container.dataset.mathFunction = selectedFunc.name;

            console.log('Juhu:', selectedFunc.name);
            console.log('Lines:', lines.length);

            lines.forEach((line, index) => {
                // Calculate margin using the selected function
                const marginVw = selectedFunc.calc(index, lines.length - 1, maxMarginVw);
                line.style.marginLeft = marginVw + 'vw';
            });
        });
    }, 1000);
});
