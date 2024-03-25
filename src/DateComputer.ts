
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

export const CurrentDate = new Date()

export const ShowWhenOnScreen = (LeftBorder, RightBorder, Target, Width) => {
        LeftBorder = LeftBorder.getBoundingClientRect()
        RightBorder = RightBorder.getBoundingClientRect()
        let TargetBound = Target.getBoundingClientRect()
        Target.style.visibility = LeftBorder.right - Width < TargetBound.left && RightBorder.left + Width > TargetBound.right ? "visible" : "hidden"
    }
    export const MonthNameArray = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "December"];