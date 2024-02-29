import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function validateAndDisplay() {
    const inputElement = document.getElementById('inputString');
    const resultElement = document.getElementById('result');
    const inputString = inputElement.value.toUpperCase();

    if (inputString.length !== 4) {
        resultElement.innerText = `${inputString} - String must have 4 letters. Invalid string.`;
        return;
    }

    const isValid = validateFirstExpression(inputString);

    if (isValid) {
        resultElement.innerText = `${inputString} - Valid String.`;
        generateAutomaton(inputString);
    } else {
        resultElement.innerText = `${inputString} - Invalid String. Not processed.`;
    }
}

function validateFirstExpression(inputString) {
    const regex = /^[A-Za-z]{4}$/;
    const isValid = regex.test(inputString);

    if (isValid) {
        console.log(`${inputString} - Valid String.`);
        return true;
    } else {
        console.log(`${inputString} - Invalid String.`);
        return false;
    }
}

function generateAutomaton(inputString) {
    d3.select(".er1 svg").remove();

    const states = ["q0", "q1", "q2", "q3", "q4"];
    const transitions = inputString.split("").map((char, i) => ({
        source: "q" + i,
        target: "q" + (i + 1),
        label: char
    }));

    const svg = d3.select(".er1").append("svg")
        .attr("width", 500)
        .attr("height", 150);

    const nodes = svg.selectAll("circle")
        .data(states)
        .enter().append("circle")
        .attr("cx", (d, i) => i * 80 + 40)
        .attr("cy", 80)
        .attr("r", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "white");

    svg.selectAll("text")
        .data(states)
        .enter().append("text")
        .attr("x", (d, i) => i * 80 + 40)
        .attr("y", 85)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => d);

    const links = svg.selectAll(".link")
        .data(transitions)
        .enter().append("line")
        .attr("x1", d => (states.indexOf(d.source) * 80 + 40) + 20)
        .attr("y1", 80)
        .attr("x2", d => (states.indexOf(d.target) * 80 + 40) - 20)
        .attr("y2", 80)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)");

    svg.selectAll("text.linkLabel")
        .data(transitions)
        .enter().append("text")
        .attr("class", "linkLabel")
        .attr("x", d => (states.indexOf(d.source) * 80 + states.indexOf(d.target) * 80) / 2 + 40)
        .attr("y", 75)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => d.label);

    svg.append("polygon")
        .attr("points", () => {
            const x = 6;
            const y = 90;
            const size = 15;
            return `${x},${y} ${x - size / 2},${y - size} ${x + size / 2},${y - size}`;
        })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("fill", "white")
        .attr("transform", "rotate(28, 15, 90)");

    svg.append("circle")
        .attr("cx", (states.length - 1) * 80 + 40)
        .attr("cy", 80)
        .attr("r", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "white");

    svg.append("circle")
        .attr("cx", (states.length - 1) * 80 + 40)
        .attr("cy", 80)
        .attr("r", 16)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "white");

    svg.append("text")
        .attr("x", (states.length - 1) * 80 + 40)
        .attr("y", 85)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(states[states.length - 1]);

    svg.append("defs").append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 8)
        .attr("refY", 0)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5");

    console.log('Automaton visualization.');
}
