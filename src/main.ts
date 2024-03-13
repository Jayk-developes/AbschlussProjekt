import './style.css';

const ObjectType = "Autos"
const Objects = ["Object1", "Object2", "Object3", "Object4", "Object5", "Object6", "Object7",]

document.addEventListener("DOMContentLoaded", () => {
    let ObjectString: string = "";
    Objects.forEach((object) => {
        ObjectString += "<div class='spacing'>" + object + "</div>"
    })

    let ObjectTypeHTML = document.getElementById("ObjectType") as HTMLElement
    ObjectTypeHTML.innerHTML = "<div>" + ObjectType + "</div>"

    let ObjectTypeHTML2 = document.getElementById("ObjectType2") as HTMLElement
    ObjectTypeHTML2.innerHTML = "<div>" + ObjectType + "</div>"

    let TimeHTML = document.getElementById("Time") as HTMLElement
    TimeHTML.innerHTML = "<div id='TopMonth'>" + "März 2024" + "</div><div id='TopDate'>" + "UWU" + "</div>"

    let ObjectsHTML = document.getElementById("Objects") as HTMLElement
    ObjectsHTML.innerHTML = ObjectString

    let ObjectsHTML2 = document.getElementById("Objects2") as HTMLElement
    ObjectsHTML2.innerHTML = ObjectString

    let BookingsHTML = document.getElementById("Bookings") as HTMLElement
    for (let i = 0; i < Objects.length; i++) BookingsHTML.innerHTML += "<div class='underLineBooking'></div>"


    let inputs = document.querySelectorAll(".InputDate")
    let labels = document.querySelectorAll(".labels")

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("mouseover", () => {labels[i].style.opacity = "0"})
        inputs[i].addEventListener("mouseout", () => {labels[i].style.opacity = "1"})
    }
});
