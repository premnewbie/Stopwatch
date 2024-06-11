import {useState,useEffect,useRef} from 'react';
const StopWatch = () => {
    const [isRunning,setIsRunning] = useState(false);
    const [timePassed,setTimePassed] = useState(0);
    const interval = useRef(null);
    const startTime = useRef(0);

    useEffect(()=>{
        if(isRunning){
            interval.current = setInterval(() => {
                setTimePassed(Date.now()-startTime.current)
            },10)
        }

        return () =>{
            clearInterval(interval.current);
        }
    },[isRunning])

    const start = () => {
        setIsRunning(true);
        startTime.current = Date.now() - timePassed;
    }

    const stop = () => {
        setIsRunning(false);
    }

    const reset = () => {
        setTimePassed(0);
        setIsRunning(false);
    }

    const formatTime = () => {
        let minutes = Math.floor(timePassed/(1000*60)%60)
        let seconds = Math.floor(timePassed/(1000)%60)
        // let milliseconds = Math.floor(timePassed%(1000)/10)

        // minutes = String(minutes).padStart(2,'0');
        seconds = String(seconds).padStart(2,'0');
        // milliseconds = String(milliseconds).padStart(2,'0');

        return `${minutes}:${seconds}`;
    }

    return ( <>
    <h1>Stopwatch</h1>
    <div>Time: {formatTime()}</div>
   {!isRunning && <button onClick={start}>Start</button>}
    {isRunning && <button onClick={stop}>Stop</button>}
    <button onClick={reset}>Reset</button>
    </> );
}
 
export default StopWatch;