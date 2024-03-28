import './style.css';
import {ObjectType} from "./TestData.ts"
import {CurrentDate, dateArray, MonthNameArray, ShowWhenOnScreen} from "./DateComputer.ts"
import {addBooking, disableLabels, DragElement, setPriorityColors, ShowBooking} from "./assets.ts";

document.addEventListener("DOMContentLoaded", async () => {
    const getRealData = async (getter) => {
        console.log()
        const response = await fetch("http://127.0.0.1:8000" + getter, {
            method: "GET",
        })

        let responseJson = await response.json();
        return responseJson
    }
    let Data = await getRealData("/Objects")
    let Priorities = await getRealData("/Priorities")

    let ObjectString: string = Data.objects.map(object => "<div class='spacing'>" + object.object + "</div>").join("");
    let UnderlineString: string = Data.objects.map(object => "<div class='underLineBooking' id='" + object.object + "'></div>").join("")


    //ObjectTypes left and right of the booking table
    let ObjectTypeHTML = document.getElementById("ObjectType") as HTMLElement
    ObjectTypeHTML.innerHTML = "<div>" + Data.objectType + "</div>"

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
    ObjectList.innerHTML = "<option value='0' disabled selected>Objekt auswählen</option>" + Data.objects.map(object => "<option value='" + object.object + "'>" + object.object + "</option>").join("")
    let PrioList = document.getElementById("PrioList") as HTMLElement
    PrioList.innerHTML = "<option value='0' disabled selected>Priorität auswählen</option>" + Priorities.priorities.map(prio => "<option value='" + prio.value + "'>" + prio.prio + "</option>").join("")

    //Set Default layout for booking columns
    let BookingsHTML = document.getElementById("Bookings") as HTMLElement
    BookingsHTML.innerHTML = UnderlineString

    //Right side Bar For documentation purpose
    let Documentation = document.getElementById("Documentation") as HTMLElement
    Priorities.priorities.forEach((prio) => {
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

    let settings = document.getElementById("Settings")
    settings.addEventListener("click", (e) => {
        let popupBack = document.createElement("div")
        let popup = document.createElement("div")
        popupBack.classList.add("PopupBack")
        document.body.appendChild(popupBack)
        popup.classList.add("Popup")
        popup.innerHTML += "<input type='button' class='closeBtn' id='closeBtn' value='&#10005;\n'><div class='popupInside'>" +
            "<div style='border-right: 1px solid #ff7777; padding-right: 1rem'><h2>Prioritäten verwalten</h2> <div> <input type='text' placeholder='Neue Priorität' id='newPrio'>" +
            "<input type='color' value='#ff0000' id='newPrioColor'></div>" +
            "<select>" +
            "<option selected disabled value='-1'>Priorität entfernen</option>" +
            Priorities.priorities.map(prio => "<option value='" + prio.value + "'>" + prio.prio + "</option>") +
            " </select></div>" +
            "<div> <h2>Objekte verwalten</h2>" +
            "<input type='text' placeholder='Neues Objekt'>" +
            "<select name='ObjectsDelete' id='ObjectsDelete'><option disabled selected value='-1'>Objekt entfernen</option>" +
            Data.objects.map(object => "<option>" + object.object + "</option>") + "</select></div>" +
            "<div><input type='button' value='Auswahl bestätigen (Hinzufügen)' class='addBtn' id='submitNewObjects'></div><div><input type='button' value='Auswahl bestätigen (Löschen)' class='deleteBtn'></div></div>"
        document.body.appendChild(popup)

        let closeButton = document.getElementById("closeBtn") as HTMLElement
        closeButton.addEventListener("click", () => {
            popup.style.display = "none"
            popupBack.style.display = "none"
        })

        let submitNewObjects = document.getElementById("submitNewObjects")
        submitNewObjects.addEventListener("click", async () => {
            let newPrio = document.getElementById("newPrio")
            let newPrioColor = document.getElementById("newPrioColor")

            if (newPrio.value != "" || newPrio.value != "") {
                await fetch("http://127.0.0.1:8000/Priority/new", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        value: Priorities.priorities.length,
                        prio: newPrio.value,
                        color: newPrioColor.value
                    })
                })

                window.location.reload()
            }

        })

    })

    let bookingOptions = document.getElementById("BookingOptions") as HTMLElement
    let checkAvailable = document.getElementById("CheckAvailability") as HTMLElement
    checkAvailable.addEventListener("click", () => {
        let AvailableObjects = ["Objekt Auswählen"]
        let SelectedStartHTML = document.getElementById("StartDay")
        let SelectedEndHTML = document.getElementById("EndDay")
        Data.objects.forEach(item => {
            AvailableObjects.push(item.object)
            item.duration.forEach(duration => {
                let durationStart = new Date(duration.start)
                let durationEnd = new Date(duration.end)
                let selectedStart = new Date(SelectedStartHTML.value)
                let selectedEnd = new Date(SelectedEndHTML.value)
                console.log((durationStart - selectedEnd) / (1000 * 60 * 60 * 24), (durationEnd - selectedEnd) / (1000 * 60 * 60 * 24))

                if (((durationStart - selectedStart) / (1000 * 60 * 60 * 24) <= 0 && (durationEnd - selectedStart) / (1000 * 60 * 60 * 24) >= 0) || ((durationStart - selectedEnd) / (1000 * 60 * 60 * 24) <= 0 && (durationEnd - selectedEnd) / (1000 * 60 * 60 * 24) >= 0)) {
                    AvailableObjects.pop()
                }
            })
        })

        if (AvailableObjects.length > 1) {
            let container = document.getElementById("TopContainer")
            checkAvailable.style.backgroundColor = "#66cc66"
            checkAvailable.innerHTML = "Objekte verfügbar"
            container.style.gridTemplateColumns = "70% 30%"
            ObjectList.innerHTML = AvailableObjects.map((Object, index) => `<option ${index === 0 ? 'selected disabled' : ''}>${Object}</option>`).join('');
            bookingOptions.style.gridTemplateColumns = "33% auto"
        } else {
            checkAvailable.style.backgroundColor = "#cc6666"
            checkAvailable.innerHTML = "Keine Objekte verfügbar"
        }
    })

//Disable Label overlay for input fields when input
    let startDay = document.getElementById("StartDay")
    let endDay = document.getElementById("EndDay")

    disableLabels(startDay, "startlabel")
    disableLabels(endDay, "endlabel")

//Add Booking to Table
    let bookButton = document.getElementById("book") as HTMLElement
    // bookButton.addEventListener("click", () => {
    //     addBooking(TimeItemWidth, BookingsHTML, Data)
    // })
    //

    let usage = document.getElementById("usage") as HTMLElement

    bookButton.addEventListener("click", async () => {
        await addBooking(usage, startDay, endDay, PrioList)
    })

    ShowBooking(TimeItemWidth, BookingsHTML, Data)

//Dragability of Table
    let initialX
    let initialLeft
    let initialLeftBooking

    let BookingView = document.getElementById("BookingView") as HTMLElement
    let Bookings = document.querySelectorAll(".BookedDurationRod")
    let BookingScrollLoop = false
    let BookingScrollCounter = 0

    const checkBookingPosition = (newBookingLeft, newInitLeftBooking, newInitLeft, newInitX, newBookingScrollLoop, counter) => {
        BookingsHTML.style.left = newBookingLeft
        initialLeftBooking = newInitLeftBooking
        initialLeft = newInitLeft
        initialX = newInitX
        BookingScrollLoop = newBookingScrollLoop
        BookingScrollCounter += counter
    }

    const handler = (event) => {
        let UWU = 0;
        if (parseInt(BookingsHTML.style.left) <= -(parseInt(window.getComputedStyle(BookingsHTML).width))) {
            checkBookingPosition("0px", 0, parseInt(TimeDate.style.left), event.clientX, true, 1)
            Bookings.forEach(rod => {
                rod.style.left = parseInt(window.getComputedStyle(rod).left) - parseInt(window.getComputedStyle(BookingsHTML).width) + "px"
            })
        }
        if (parseInt(BookingsHTML.style.left) > 0) {
            checkBookingPosition(-(parseInt(window.getComputedStyle(BookingsHTML).width)) * 0.9 + "px", -(parseInt(window.getComputedStyle(BookingsHTML).width)) * 0.9, parseInt(TimeDate.style.left), event.clientX, true, -1)
            Bookings.forEach(rod => {
                rod.style.left = parseInt(window.getComputedStyle(rod).left) + (parseInt(window.getComputedStyle(BookingsHTML).width)) + "px"
            })
        }
        UWU = BookingScrollCounter * -(parseInt(window.getComputedStyle(BookingsHTML).width))
        DragElement(event, initialX, initialLeft, initialLeftBooking, BookingsHTML, TimeDate, TimeItemWidth, TimeItems, ObjectsHTML2, ObjectTypeHTML, UWU)
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
})
;
