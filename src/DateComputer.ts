
export let dateArray: string[] = []
const Dates = () => {
    let startDate = new Date()
    startDate.setDate(startDate.getDate() - 7)
    let endDate = new Date()
    endDate.setDate(endDate.getDate() + 21)
    let loopingDate = startDate

    while (loopingDate <= endDate) {
        dateArray.push((new Date(loopingDate).getDate()).toString())
        loopingDate.setDate(loopingDate.getDate() + 1)
    }
}

Dates()
