let dutyData = {};

fetch("data.json")
.then(res => res.json())
.then(data => {

    dutyData = data;

    const dateInput = document.getElementById("date");

    const today = new Date().toISOString().split("T")[0];

    dateInput.value = today;

    showDuty(today);

    dateInput.addEventListener("change", function(){

        showDuty(this.value);

    });

});

function showDuty(date){

    console.log(date);

}
