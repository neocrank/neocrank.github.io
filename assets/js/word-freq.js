let text = "";

const stopwords = [
    "the", "and", "to", "in", "of", "a", "for", "with",
    "on", "this", "that", "it", "which", "an", "from",
    "they", "by", "its", "is", "as"
];

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    "type": "bar",
    "data": {},
    "options": {
        "responsive": true
    }
})

function updateChart() {
    text = document.getElementById("textInput").value;
    chart.data = getChartData(text);
    chart.update();
}

function getChartData(text, topn=30) {

    const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];
    

    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    })
    

    for (stop of stopwords) {
        frequency[stop] = 0;
    }


    const sorted = Object.entries(frequency).sort(([,a],[,b]) => b - a);

    const freq_sorted = Object.fromEntries(sorted.slice(0, topn));


    const chartData = {
        "labels": Object.keys(freq_sorted),
        "datasets": [
            {
                "label": "Frequency",
                "data": Object.values(freq_sorted)
            }
        ]
    };

    return chartData;
}
