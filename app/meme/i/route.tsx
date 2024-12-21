//'use client'
import { ImageResponse } from 'next/og';


export const runtime = 'edge';

export async function GET(request : Request){
    const {searchParams} = new URL(request.url);
    let listNames;
    let ftname;
    let len;
    let test;
    const hasText = searchParams.has('text');
    const text = hasText ? searchParams.get('text')?.slice(0, 100): '';

    if(text !== " "){
        console.log("test")
        test = await fetch(`${process.env.DEFINED_POINT_BNS}${text}`)
        .then((r)=>{
        return r.json()
        }).then((data)=> {return data})
        .catch(()=> {return "error"})
    }
    
    if(test !== "error" && " "){
        len = test.length;
        //@ts-ignore
        ftname = String(text.split(".")[0]);
        //@ts-ignore
        listNames = test.map((r, index)=> {
            return(
            <li key={index} 
            style={{ 
                marginBottom: '2px',
                fontSize: '30px', 
                wordBreak: 'break-word'
            }} >{r}</li>)});
        console.log("test", test);
    }
    else{
        console.error("failed test");
    }
    const imageData = await fetch(
    new URL( './blue.png' , import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    const fontData= await fetch(
    new URL('./Oswald-VariableFont_wght.ttf', import.meta.url)
    ).then((res)=> res.arrayBuffer());

    return new ImageResponse(
        (
            ( len > 0 ?  <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'blue',
                    color:'white',
                    flexDirection:'column',
                    alignItems:"flex-start",
                    justifyContent:'flex-start',
                    fontSize:'40px',
                    position:'relative',
                }}
            >
               
               <div
                 style={{
                    display: 'flex',
                    marginTop:"50px",
                    textAlign:'center',
                    justifyContent:'center',
                    fontWeight:'900',
                }}
               ><div
                    style={{
                        display:"flex",
                        textTransform:"capitalize",
                        marginRight:"5px",
                        marginLeft:"5px",
                        fontWeight:'900',
                        
                    }}
               >{ftname + " "}
               </div> own {len} basename(s)</div>
                <ol
                   style={{
                        display:'flex',
                        flexDirection:'column',
                        gap:'10px',
                        fontSize:'30px',
                        fontWeight:900,
                        justifyContent:"flex-start",
                        textAlign:"left",
                        position:"absolute",
                        top:120,
                        left:10,
                        height:'500px',
                        flexWrap:'wrap'
                    }}
                >
                    {listNames}
                </ol>
                </div> : 
            <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                backgroundColor: 'blue',
                color:'white',
                flexDirection:'column',
                alignItems:"center",
                justifyContent:'flex-start',
                fontSize:'40px',
                position:'relative',
                paddingTop:'100px'
            }}
            >
                {ftname} has no basename👀
            </div>
        )
        )
    )
}