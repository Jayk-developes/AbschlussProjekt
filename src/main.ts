import './style.css';
// @ts-ignore
import {ObjectType, Objects, ObjectData} from "./TestData.ts"
// @ts-ignore
import {dateArray} from "./DateComputer.ts"

// let dateArray: string[] = []
//
// const Dates = () => {
//     let startDate = new Date()
//     startDate.setDate(startDate.getDate() - 7)
//     let endDate = new Date()
//     endDate.setDate(endDate.getDate() + 21)
//     let loopingDate = startDate
//
//     while (loopingDate <= endDate) {
//         dateArray.push((new Date(loopingDate).getDate()).toString())
//         loopingDate.setDate(loopingDate.getDate() + 1)
//     }
// }
//
// Dates()

const Priorities = [{color: "#7990AA", prio: "Niedrig"}, {color: "#6EA859", prio: "Normal"}, {
    color: "#F1B365",
    prio: "Hoch"
}, {color: "#C85E75", prio: "Sehr Hoch"},]

document.addEventListener("DOMContentLoaded", () => {
    let ObjectString: string = "";
    ObjectData.forEach((object) => {
        ObjectString += "<div class='spacing'>" + object.object + "</div>"
    })
    let ObjectTypeHTML = document.getElementById("ObjectType") as HTMLElement
    ObjectTypeHTML.innerHTML = "<div>" + ObjectType + "</div>"

    let ObjectTypeHTML2 = document.getElementById("ObjectType2") as HTMLElement
    ObjectTypeHTML2.innerHTML = "<div>" + ObjectType + "</div>"

    let TimeHTML = document.getElementById("Time") as HTMLElement
    let dateStringHTML = ""
    for (let i = 0; i < dateArray.length; i++) {
        dateStringHTML += "<div class='SeparateDate'>" + dateArray[i] + "</div>"
    }
    TimeHTML.innerHTML = "<div id='TopMonth'>" + "März 2024" + "</div><div id='TopDate' class='TopDate'>" + dateStringHTML + "</div>"

    let TimeQuery = document.querySelector("#Time") as Element
    console.log(TimeQuery)
    let TimeItems = TimeQuery.querySelectorAll("div#TopDate > div") as NodeListOf<HTMLElement>
    let TimeItemWidth = TimeItems[0].clientWidth
    console.log(TimeItemWidth)

    let ObjectsHTML = document.getElementById("Objects") as HTMLElement
    ObjectsHTML.innerHTML = ObjectString

    let ObjectsHTML2 = document.getElementById("Objects2") as HTMLElement
    ObjectsHTML2.innerHTML = ObjectString

    let BookingsHTML = document.getElementById("Bookings") as HTMLElement
    for (let i = 0; i < ObjectData.length; i++) BookingsHTML.innerHTML += "<div class='underLineBooking' id='" + ObjectData[i].object + "'></div>"

    let Documentation = document.getElementById("Documentation") as HTMLElement
    for (let i = 0; i < Priorities.length; i++) Documentation.innerHTML += "<div class='Priority' style='background: linear-gradient(90deg,"
        + Priorities[i].color + "77 0%, rgba(0,0,0,0) 100%);'><div class='colorCircle' style='background-color: "
        + Priorities[i].color + "'></div>"
        + Priorities[i].prio + "</div>"


    let inputs = document.querySelectorAll(".InputDate") as NodeListOf<HTMLElement>
    let labels = document.querySelectorAll(".labels") as NodeListOf<HTMLElement>

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("mouseover", () => {
            labels[i].style.opacity = "0"
        })
        inputs[i].addEventListener("mouseout", () => {
            labels[i].style.opacity = "1"
        })
    }
});
