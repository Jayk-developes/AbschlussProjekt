import './style.css';
import {ObjectData, Objects, ObjectType, Priorities} from "./TestData.ts"
import {CurrentDate, dateArray, MonthNameArray, ShowWhenOnScreen} from "./DateComputer.ts"
import {addBooking, disableLabels, DragElement, setPriorityColors, ShowBooking} from "./assets.ts";

document.addEventListener("DOMContentLoaded", () => {
    let ObjectString: string = ObjectData.map(object => "<div class='spacing'>" + object.object + "</div>").join("");
    let UnderlineString: string = ObjectData.map(object => "<div class='underLineBooking' id='" + object.object + "'></div>").join("")

    //ObjectTypes left and right of the booking table
    let ObjectTypeHTML = document.getElementById("ObjectType") as HTMLElement
    ObjectTypeHTML.innerHTML = "<div>" + ObjectType + "</div>"

    // Dates shown on the booking table
    document.getElementById("Time").innerHTML = `<div id='TopMonth'>${MonthNameArray[CurrentDate.getMonth()]} ${CurrentDate.getFullYear()}</div><div id='TopDate' class='TopDate'>${dateArray.map(date => `<div class='SeparateDate'>${date}</div>`).join('')}</div>`;

    let TimeQuery = document.querySelector("#Time") as Element
    let TimeDate = document.getElementById("TopDate")
    let TimeItems = TimeQuery.querySelectorAll("div#TopDate > div") as NodeListOf<HTMLElement>
    let TimeItemWidth = TimeItems[0].clientWidth

    //Bookable Items on the booking table
    let ObjectsHTML = document.getElementById("Objects") as HTMLElement
    let ObjectsHTML2 = document.getElementById("Objects2") as HTMLElement
    ObjectsHTML.innerHTML = ObjectsHTML2.innerHTML = ObjectString

    //Set Additional Params
    let ObjectList = document.getElementById("ObjectList") as HTMLElement
    ObjectList.innerHTML = "<option value='0' disabled selected>Objekt auswählen</option>" + Objects.map(object => "<option value='" + object + "'>" + object + "</option>").join("")
    let PrioList = document.getElementById("PrioList") as HTMLElement
    PrioList.innerHTML = "<option value='0' disabled selected>Priorität auswählen</option>" + Priorities.map(prio => "<option value='" + prio.value + "'>" + prio.prio + "</option>").join("")

    //Set Default layout for booking columns
    let BookingsHTML = document.getElementById("Bookings") as HTMLElement
    BookingsHTML.innerHTML = UnderlineString

    //Right side Bar For documentation purpose
    let Documentation = document.getElementById("Documentation") as HTMLElement
    Priorities.forEach((prio) => {
        setPriorityColors(prio, Documentation)
    })

    TimeItems.forEach((item) => {
        ShowWhenOnScreen(ObjectTypeHTML, ObjectsHTML2, item, TimeItemWidth)
    })

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

    let bookingOptions = document.getElementById("BookingOptions") as HTMLElement
    let checkAvailable = document.getElementById("CheckAvailability") as HTMLElement
    checkAvailable.addEventListener("click", () => {
        let container = document.getElementById("TopContainer")
        container.style.gridTemplateColumns = "70% 30%"
        bookingOptions.style.gridTemplateColumns = "33% auto"
    })

    //Disable Label overlay for input fields when input
    let startDay = document.getElementById("StartDay")
    let endDay = document.getElementById("EndDay")

    disableLabels(startDay, "startlabel")
    disableLabels(endDay, "endlabel")

    //Add Booking to Table
    let bookButton = document.getElementById("book") as HTMLElement
    bookButton.addEventListener("click", () => {
        addBooking(TimeItemWidth, BookingsHTML)
    })

    ShowBooking(TimeItemWidth, BookingsHTML)

    //Dragability of Table
    let initialX
    let initialLeft
    let initialLeftBooking

    let BookingView = document.getElementById("BookingView") as HTMLElement
    let Bookings = document.querySelectorAll(".BookedDurationRod")
    let FirstScroll = false
    let BookingScrollLoop = false

    const checkBookingPosition = (newBookingLeft, newInitLeftBooking, newInitLeft, newInitX, newBookingScrollLoop) => {
        BookingsHTML.style.left = newBookingLeft
        initialLeftBooking = newInitLeftBooking
        initialLeft = newInitLeft
        initialX = newInitX
        BookingScrollLoop = newBookingScrollLoop
    }

    const handler = (event) => {
        if (parseInt(BookingsHTML.style.left) <= -(parseInt(window.getComputedStyle(BookingsHTML).width))) {
            checkBookingPosition("0px", 0, parseInt(TimeDate.style.left), event.clientX, true)
            Bookings.forEach(rod => {
                rod.style.left = parseInt(window.getComputedStyle(rod).left) - parseInt(window.getComputedStyle(BookingsHTML).width) + "px"
            })
        }
        if (parseInt(BookingsHTML.style.left) > 0) {
            checkBookingPosition(-(parseInt(window.getComputedStyle(BookingsHTML).width)) * 0.9 + "px", -(parseInt(window.getComputedStyle(BookingsHTML).width)) * 0.9, parseInt(TimeDate.style.left), event.clientX, true)
            Bookings.forEach(rod => {
                rod.style.left = parseInt(window.getComputedStyle(rod).left) + (parseInt(window.getComputedStyle(BookingsHTML).width) * 0.9) + "px"
            })
        }
        DragElement(event, initialX, initialLeft, initialLeftBooking, FirstScroll, BookingsHTML, TimeDate, TimeItemWidth, TimeItems, ObjectsHTML2, ObjectTypeHTML)
    }

    BookingView.addEventListener("mousedown", (evt) => {
        initialX = evt.clientX
        initialLeft = parseInt(window.getComputedStyle(TimeDate).left)
        initialLeftBooking = BookingScrollLoop ? parseInt(BookingsHTML.style.left) : initialLeft
        BookingView.addEventListener("mousemove", handler, true)
    })

    addEventListener("mouseup", (evt) => {
        BookingView.removeEventListener("mousemove", handler, true)
    })
});
