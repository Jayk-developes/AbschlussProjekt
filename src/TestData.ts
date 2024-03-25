export const ObjectType = "Autos"
export const Objects = ["Object1", "Object2", "Object3", "Object4", "Object5", "Object6", "Object7", "Object8"]
export const Priorities = [
    {value: 0, prio: "Niedrig", color: "#7caa79"},
    {value: 1, prio: "Normal", color: "#7989AA"},
    {value: 2, prio: "Hoch", color: "#F0B365"},
    {value: 3, prio: "Sehr Hoch", color: "#C84E75"}]

export interface ObjectI {
    object: string
    zweck: string
    duration: [DurationI]
}

interface DurationI {
    start: string
    end: string
    priority: number
}
export let ObjectData = [
    {
        object: "Object1", zweck: "UWU", duration: [
            {start: "2024.03.25 12:00", end: "2024.03.26 18:00", priority: 3},
            {start: "2024.03.28 06:00", end: "2024.03.30 20:00", priority: 0},
            {start: "2024.03.22", end: "2024.03.23", priority: 2},
            {start: "2024.03.19", end: "2024.03.22", priority: 1},]
    }, {
        object: "Object2", zweck: "OWO", duration: [
            {start: "2024.03.22", end: "2024.03.26", priority: 3},
            {start: "2024.03.18", end: "2024.03.21", priority: 0},
            {start: "2024.03.27", end: "2024.03.30", priority: 2},
            {start: "2024.03.28", end: "2024.03.31", priority: 1},]
    }, {
        object: "Object3", zweck: "OWO", duration: [
            {start: "2024.03.20", end: "2024.03.22", priority: 3},
            {start: "2024.03.22", end: "2024.03.26", priority: 0},
            {start: "2024.03.27", end: "2024.03.31", priority: 2},
            {start: "2024.03.16", end: "2024.03.19", priority: 1},]
    }, {
        object: "Object4", zweck: "OWO", duration: [
            {start: "2024.03.10", end: "2024.03.14", priority: 3},
            {start: "2024.03.10", end: "2024.03.14", priority: 0},
            {start: "2024.03.10", end: "2024.03.14", priority: 2},
            {start: "2024.03.10", end: "2024.03.14", priority: 1},]
    }, {
        object: "Object8", zweck: "OWO", duration: [
            {start: "2024.03.10", end: "2024.03.14", priority: 1},
            {start: "2024.03.10", end: "2024.03.14", priority: 2},
            {start: "2024.03.10", end: "2024.03.14", priority: 3},
            {start: "2024.03.10", end: "2024.03.14", priority: 0},]
    }, {
        object: "Object5", zweck: "WUW", duration: [
            {start: "2024.03.10", end: "2024.03.14", priority: 1},
            {start: "2024.03.10", end: "2024.03.14", priority: 2},
            {start: "2024.03.10", end: "2024.03.14", priority: 3},
            {start: "2024.03.10", end: "2024.03.14", priority: 0},]
    }, {
        object: "Object6", zweck: "WUW", duration: [
            {start: "2024.03.10", end: "2024.03.14", priority: 1},
            {start: "2024.03.10", end: "2024.03.14", priority: 2},
            {start: "2024.03.10", end: "2024.03.14", priority: 3},
            {start: "2024.03.10", end: "2024.03.14", priority: 0},]
    }, {
        object: "Object7", zweck: "WUW", duration: [
            {start: "2024.03.10", end: "2024.03.14", priority: 1},
            {start: "2024.03.10", end: "2024.03.14", priority: 2},
            {start: "2024.03.10", end: "2024.03.14", priority: 3},
            {start: "2024.03.10", end: "2024.03.14", priority: 0},]
    }]

