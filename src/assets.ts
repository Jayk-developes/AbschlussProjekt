import {ObjectData, Priorities} from "./TestData.ts";
import {ShowWhenOnScreen} from "./DateComputer.ts";

export const setPriorityColors = (priority, htmlElement) => {
    htmlElement.innerHTML += "<div class='Priority' style='background: linear-gradient(90deg,"
        + priority.color + "77 0%, rgba(0,0,0,0) 100%);'><div class='colorCircle' style='background-color: "
        + priority.color + "'></div>" + priority.prio + "</div>"
}

export const getDayDifference = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const difference = endDate - startDate
    return difference / (1000 * 60 * 60 * 24)
}

export const disableLabels = (input, labelId) => {
    input.addEventListener("input", () => {
        document.getElementById(labelId).style.display = "none"
    })
}

export const addBooking = (TimeItemWidth, BookingsHTML) => {
    let startDay = document.getElementById("StartDay") as HTMLElement
    let endDay = document.getElementById("EndDay") as HTMLElement
    let objectValue = document.getElementById("object") as HTMLElement
    let priorityValue = document.getElementById("prio") as HTMLElement
    let bookingIndex = 0
    ObjectData.forEach((item) => {
        if (item.object == objectValue.value) {
            let start = startDay.value.replace(/-/g, ".",).replace("T", " ")
            let end = endDay.value.replace(/-/g, ".",).replace("T", " ")
            ObjectData[bookingIndex]["duration"].push({start: start, end: end, priority: priorityValue.value})
            ShowBooking(TimeItemWidth, BookingsHTML)
        }
        bookingIndex++
    })
}

export const ShowBooking = (TimeItemWidth, BookingsHTML) => {

    let ObjectIndex = 1
    ObjectData.forEach((object) => {
        let today = new Date()
        let formatedToday = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + " 00:00:00"
        const top = "calc((100% / 8)*" + ObjectIndex + " - (100% / 9))"
        object.duration.forEach((duration) => {
            const diff = getDayDifference(duration.start, duration.end)
            const left = 70 + ((getDayDifference(formatedToday, duration.start) + 1) * 10) + "%"
            let width = diff > 0 ? TimeItemWidth * diff + "px" : TimeItemWidth + "px"
            BookingsHTML.innerHTML += "<div class='BookedDurationRod' style='left:" + left + "; width:" + width + "; background-color: " + Priorities[duration.priority].color + "; top:" + top + "'></div>"
        })
        ObjectIndex++
    })
}

export const DragElement = (evt, initialX, initialLeft, initialLeftBooking, FirstScroll, BookingsHTML, TimeDate, TimeItemWidth, TimeItems, ObjectsHTML2, ObjectTypeHTML) => {
    FirstScroll = true
    BookingsHTML.style.left = initialLeftBooking - (initialX - evt.clientX) + "px"
    TimeDate.style.left = initialLeft - (initialX - evt.clientX) + "px"

    TimeItems.forEach((item) => {
        ShowWhenOnScreen(ObjectTypeHTML, ObjectsHTML2, item, TimeItemWidth)
    })
}