let amount = 0;
let months = 0;
let yearPercentage =0 ;
let capital = 0;
let insurance = 0;

let monthlyInterestRate = 0;
let monthlyPayement = 0;
let monthlyInsurance = 0;



function calculate(){
    amount = parseFloat(document.getElementById('amountInput').value);
    capital = amount;
    months = parseInt(document.getElementById('monthInput').value);
    yearPercentage = parseFloat(document.getElementById('interestInput').value);
    calculateMonthlyPayement();
    showOverview();
    getDetails();
}

function calculateMonthlyPayement(){
    monthlyInterestRate = yearPercentage / 100 / 12;
    monthlyPayement = (amount * monthlyInterestRate) / (1-(Math.pow((1+monthlyInterestRate),months*-1)));
}

function calculateMonthlyInsurance(){
    insurance = parseFloat(document.getElementById('insuranceInput').value);
    monthyInsurance = (amount * insurance) / 12;
}

function showOverview(){
    document.getElementById('overview').innerHTML = `
    <p class="m-0">Echéance Mensuelle : ${monthlyPayement.toLocaleString('fr',
    {minimumFractionDigits: 2, maximumFractionDigits : 2})} € </p>
    <p class="m-0">Coût Total Intérêts : ${((monthlyPayement*months)-amount).toLocaleString('fr',
    {minimumFractionDigits: 2, maximumFractionDigits : 2})} € </p>
    `
}

function getDetails(){
    let information ="";
    let counter = 1;

    while(counter<=months){
        let payementDate = new Date;
        payementDate.setMonth(payementDate.getMonth()+counter);
        let month = payementDate.getMonth()+1;
        let year = payementDate.getFullYear();
        let displayDate = "";
        if(month<10){
            displayDate = `0${month}/${year}`;
        } else {
            displayDate = `${month}/${year}`;
        }
        let monthyInterest = (capital * monthlyInterestRate);
        capital -= (monthlyPayement-monthyInterest);

        information += `
        <tr>
            <td> ${counter++} </td>
            <td> ${displayDate} </td>
            <td> ${(monthlyPayement).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits : 2})} € </td>
            <td> ${(monthlyPayement-monthyInterest).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits : 2})} € </td>
            <td> ${(monthyInterest).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits : 2})} € </td>
            <td> ${(capital).toLocaleString('fr',
            {minimumFractionDigits: 2, maximumFractionDigits : 2})} € </td>
        `
    }

document.getElementById('details').innerHTML = information;

}