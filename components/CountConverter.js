import React from 'react';


const  CountConverter=(value)=>
{


    if(value>1000000)
    return Math.round(value/1000000)+'M'
    else if(value>100000)
    return Math.round(value/1000)+'K'
    else
    return value

}
export default CountConverter