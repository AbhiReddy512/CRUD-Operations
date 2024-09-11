
import React, { useState } from 'react';
import './counter.css'

function Counter() {
    const [count, setCount] = useState(0);

    const decrease=()=>{
        setCount(count-1)

    }
    const increase=()=>{
        setCount(count+1)
    }


return (
    <div className='counter'>
      <button onClick={decrease}>Decrease (-)</button>
      <p>Count - ({count})</p>
      <button onClick={increase}>Increase (+)</button>
    </div>
  )
}

export default Counter
