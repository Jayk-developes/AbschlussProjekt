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

// export const addBooking = (TimeItemWidth, BookingsHTML, data) => {
//     let startDay = document.getElementById("StartDay") as HTMLElement
//     let endDay = document.getElementById("EndDay") as HTMLElement
//     let objectValue = document.getElementById("object") as HTMLElement
//     let priorityValue = document.getElementById("prio") as HTMLElement
//     let bookingIndex = 0
//     console.log(Data)
//     data.objects.forEach((item) => {
//         if (item.object == objectValue.value) {
//             let start = startDay.value.replace(/-/g, ".",).replace("T", " ")
//             let end = endDay.value.replace(/-/g, ".",).replace("T", " ")
//             data.objects[bookingIndex]["duration"].push({start: start, end: end, priority: priorityValue.value})
//             ShowBooking(TimeItemWidth, BookingsHTML, data)
//         }
//         bookingIndex++
//     })
// }

export const addBooking = async (usage, start, end, prio) => {
    let SubmittingData = {"zweck": "", "start": "", "end": "", "priority": ""}
    SubmittingData.zweck = usage.value
    SubmittingData.start = start.value.replace("-", ".").replace("T", " ")
    SubmittingData.end = end.value.replace("-", ".").replace("T", " ")
    SubmittingData.priority = prio.value

    console.log(SubmittingData, ObjectList.value)

    await fetch("http://127.0.0.1:8000/Duration/new/" + ObjectList.value,
        {
            method: "POST", headers: {"Content-Type": "application/json"},
            body: JSON.stringify(SubmittingData),
        })

    window.location.reload()
}

export const ShowBooking = (TimeItemWidth, BookingsHTML, data) => {

    let ObjectIndex = 1
    data.objects.forEach((object) => {
        let today = new Date()
        let formatedToday = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate() + " 00:00:00"
        const top = "calc((100% /" + data.objects.length + ")*" + ObjectIndex + " - (100% / " + (data.objects.length * 1.275) + "))"
        object.duration.forEach((duration) => {
            const diff = getDayDifference(duration.start, duration.end)
            const left = 60 + ((getDayDifference(formatedToday, duration.start) + 1) * 10) + "%"
            let width = diff > 0 ? TimeItemWidth * diff + "px" : TimeItemWidth + "px"
            BookingsHTML.innerHTML += "<div class='BookedDurationRod' style='left:" + left + "; width:" + width + "; background-color: " + Priorities[duration.priority].color + "; top:" + top + "'></div>"
        })
        ObjectIndex++
    })
}

export const DragElement = (evt, initialX, initialLeft, initialLeftBooking, BookingsHTML, TimeDate, TimeItemWidth, TimeItems, ObjectsHTML2, ObjectTypeHTML, counter) => {
    BookingsHTML.style.left = initialLeft - counter - (initialX - evt.clientX) + "px"
    TimeDate.style.left = initialLeft - (initialX - evt.clientX) + "px"

    TimeItems.forEach((item) => {
        ShowWhenOnScreen(ObjectTypeHTML, ObjectsHTML2, item, TimeItemWidth)
    })
}