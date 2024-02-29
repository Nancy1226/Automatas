import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export function validateAndShowSecondER() {
    const inputString = document.getElementById('inputString2').value.toUpperCase();
    const resultElement = document.getElementById('result2');
    const er2SVG = d3.select(".er2 svg");

    if (inputString.length >= 4 && /^(J|j)[IENeoogl]{3}$/.test(inputString)) {
        resultElement.innerText = `${inputString} - Valid String.`;
        generateSecondERAutomaton(inputString);
    } else {
        resultElement.innerText = `${inputString} - Invalid String.`;
        er2SVG.remove();
    }
}

export function generateSecondERAutomaton(inputString) {
    const er2SVG = d3.select(".er2 svg");

    // Automaton data
    const states = [];
    const transitions = [];

    for (let i = 0; i <= inputString.length; i++) {
        states.push("q" + i);
        if (i < inputString.length) {
            transitions.push({
                source: "q" + i,
                target: "q" + (i + 1),
                label: inputString[i]
            });
        }
    }

    // Remove existing SVG
    er2SVG.remove();

    // Create SVG container
    const svg = d3.select(".er2").append("svg")
        .attr("width", 1000)
        .attr("height", 150);

    // Create nodes (states)
    const nodes = svg.selectAll("circle")
        .data(states)
        .enter().append("circle")
        .attr("cx", (d, i) => i * 80 + 40)
        .attr("cy", 80)
        .attr("r", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "white");

    // Create labels for nodes
    svg.selectAll("text")
        .data(states)
        .enter().append("text")
        .attr("x", (d, i) => i * 80 + 40)
        .attr("y", 85)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => d);

    // Create links (transitions)
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

    // Labels for transitions
    svg.selectAll("text.linkLabel")
        .data(transitions)
        .enter().append("text")
        .attr("class", "linkLabel")
        .attr("x", d => (states.indexOf(d.source) * 80 + states.indexOf(d.target) * 80) / 2 + 40)
        .attr("y", 75)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .text(d => d.label);

    // Add initial state (triangle)
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
}
