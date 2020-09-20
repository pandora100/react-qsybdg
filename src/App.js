import React,{createRef,useRef,useEffect,useState} from "react";
import "./style.css";

/*
useRef is just partially similar to React's ref(just structure of object with only field of current).

useRef hook is aiming on storing some data between renders and changing that data does not trigger re-rendering(unlike useState does).

Also just gentle reminder: better avoid initialize hooks in loops or if. It's first rule of hooks.

Having this in mind we:

    create array and keep it between renders by useRef
    we initialize each array's element by createRef()

    we can refer to list by using .current notation
*/
/*
export default function App() {
  let refs = React.useRef([React.createRef(), React.createRef()]);

  React.useEffect(() => {
    refs.current[0].current.focus()
  }, []);

  return (<ul>
    {['left', 'right'].map((el, i) =>
      <li key={i}><input ref={refs.current[i]} value={el} /></li>
    )}
  </ul>)
}
*/
/*
This was we can safely modify array(say by changing it's length). But don't forget that mutating data stored by useRef does not trigger re-render. So to make changing length to re-render we need to involve useState.
*/
/*
*/

export default function App() {
  
const [length, setLength] = useState(2);
  const refs = useRef([React.createRef(), React.createRef()]);

  function updateLength({ target: { value }}) {
    setLength(value);
    refs.current = refs.current.splice(0, value);
    for(let i = 0; i< value; i++) {
      refs.current[i] = refs.current[i] || React.createRef();
    }
    refs.current = refs.current.map((item) => item || React.createRef());
  }

  useEffect(() => {
   refs.current[refs.current.length - 1].current.focus()
  }, [length]);

  return (<>
    <ul>
    {refs.current.map((el, i) =>
      <li key={i}><input ref={refs.current[i]} value={i} /></li>
    )}
  </ul>
  <input value={refs.current.length} type="number" onChange={updateLength} />
  </>)
}
/*
ojo
cannot read property `value` of undefined
 or access it in useEffect hook. Reason: refs are bound after element is rendered so during rendering is running for the first time it is not initialized yet. 
*/