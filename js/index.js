const canvas = document.querySelector('.chart-js').getContext('2d');
const GLOBAL_TEMPERATURE = 14;

async function fetchData() {
  return await fetch('./ZonAnn.Ts+dSST.csv').then(resp => resp.text());
}
fetchData()
  .then(parseData)
  .then(createArrayData)
  .then(({ years, temps }) => {
    drawChart(years, temps);
  });

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}
function createArrayData(data) {
  return data.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.temps.push(Number(entry.Glob) + GLOBAL_TEMPERATURE);
      return acc;
    },
    { years: [], temps: [] },
  );
}

function drawChart(years, temps) {
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: years,
      datasets: [
        {
          label: '# of Votes',
          data: temps,
          backgroundColor: ['rgba(255, 200, 200, 1)'],
          borderColor: ['rgba(255, 130, 255, 1)'],
          borderWidth: 1,
          fill: false,
        },
      ],
    },
  });
}
