var ctx = document.getElementById('myChart');
var geo = document.getElementById('geo');

var a = 3;
var b = 6;
var i;
var data = [];
for (i = 0; i < 100; i++) {
    num=i/100
    data.push({x: num,y: jStat.beta.pdf(num,3,6).toFixed(2)})
}
function geometric(x, prob) {
    return (Math.pow((1-prob),(x-1)))*prob
}
var sd = Math.sqrt(jStat.beta.variance( a, b))
var mu = jStat.beta.mean( a, b)

var geodata = []
var geodata1 = []
var geodata2 = []

for (i = 1; i <= 30; i++) {
    num = i
    geodata.push({x: num,y: jStat.binomial.pdf(0,num,mu).toFixed(2)})
    geodata1.push({x: num,y: jStat.binomial.pdf(0,num,mu-1*sd).toFixed(2)})
    geodata2.push({x: num,y: jStat.binomial.pdf(0,num,mu+1*sd).toFixed(2)})
}
var myChart = new Chart(ctx, {
    type: 'line',
    data:{datasets: [{
            label: 'Beta Distribution',
            backgroundColor: "#0000FF",
            pointRadius: 0,
            data: data,
        }]},
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


var geoChart = new Chart(geo, {
    type: 'line',
    data:{datasets: [{
            label: 'Mean',
            data:geodata,
            fill: false,
            backgroundColor: "#0000FF",
            borderColor: "#0000FF"
        },
        {
            borderDash: [5,5],
            fill: false,
            label: '-1 sd',
            backgroundColor: "#FF0000",
            borderColor: "#FF0000",
            data:geodata1,
        },
        {
            borderDash: [5,5],
            borderColor: "#008000",
            fill: false,
            label: '+1 sd ',
            backgroundColor: "#008000",
            data:geodata2,
        }]},
        options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var lowest = 1;
var lowest1 = 1;
var lowest2 = 1;

for (i = 0; i < geodata.length; i++) {
    if(geodata[i].y<=0.1){
        lowest=i+1;
        break
    }
}
for (i = 0; i < geodata1.length; i++) {
    if(geodata1[i].y<=0.1){
        lowest1=i+1;
        break
    }
}
for (i = 0; i < geodata2.length; i++) {
    if(geodata2[i].y<=0.1){
        lowest2=i+1;
        break
    }
}
document.getElementById("start").innerHTML = "There has so far been "+ a.toString()+" condom breaks out of "+ (b-1+a).toString()+" sexual encounters."
document.getElementById("likely").innerHTML = "Most likely the condom will break with a probablity of "+mu.toFixed(2).toString()+" but due to sample size issues there is a 68% chance that the probabilty of the condom breaking is "+((mu-1*sd)).toFixed(2).toString()+"-"+((mu+1*sd)).toFixed(2).toString()+" or an expected price of $" +(50*(mu-1*sd)).toFixed(2).toString()+"-$"+(50*(mu+1*sd)).toFixed(2).toString()+" per sexual encounter (We are 95% sure that the condom will break with probability "+((mu-2*sd)).toFixed(2).toString()+"-"+((mu+2*sd)).toFixed(2).toString()+" or $"+(50*(mu-2*sd)).toFixed(2).toString()+"-$"+(50*(mu+2*sd)).toFixed(2).toString()+" per sexual encounter). The expected price is $" + (50*(mu)).toFixed(2).toString()+".";
document.getElementById("geometric").innerHTML = "As shown in the graph, Michael, there is less than a 10% chance that Michael does not break the condom in the next " + lowest.toString() + " times. The more optimistic estimates(+1 sd) is "+lowest1.toString()+ " times and the lesser optimistic(-1 sd) is " + lowest2.toString() + " times.";

