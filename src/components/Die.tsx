
import type { JSX } from "react"

export type DieProps = {
    isClicked: boolean
    dieValue: number
    handleClick: () => void
}

export default function Die(props: DieProps): JSX.Element {

    type StylesType = {
        backgroundColor: string
    }

    const styles: StylesType = {
        backgroundColor: props.isClicked ? "#59E391" : "#FFFFFF"
    }
    
    return (
        <button className="die-btn" onClick={props.handleClick} style={styles}>{props.dieValue}</button>
    )
}