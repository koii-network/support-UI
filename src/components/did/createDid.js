import React,{useState,useRef,useEffect} from 'react';

const CreateDid = () => {
    const [i, setI] = useState(0);
    const o = useRef(i)
    useEffect(() => {
        o.current = i
    }, [i]);

    return (
        <div>
            <h1>{o.current}</h1>
            <button onClick={()=>setI(i+1)}>hello</button>

        </div>
    );
}

export default CreateDid;
