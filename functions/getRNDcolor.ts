import { red,pink,purple,indigo,green,yellow } from '@material-ui/core/colors';


const colors = [red,pink,purple,indigo,green,yellow]

export const getRNDColor = ()=>{
    const rndVal = (Math.floor(Math.random()*Math.floor(colors.length)))
    const color = colors[rndVal]
    return (color)
}