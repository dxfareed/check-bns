import { ImageResponse } from 'next/og';
import { resolveAddress, BASENAME_RESOLVER_ADDRESS } from "thirdweb/extensions/ens";
import { base } from "thirdweb/chains";
import {client} from '@/app/client'
import { useState } from 'react';

export const runtime = 'edge';

export async function GET(request : Request){
    async function getAddress() {
        await resolveAddress({
          client,
          name: "otedola.base.eth",
          resolverAddress: BASENAME_RESOLVER_ADDRESS,
          resolverChain: base,
        }).then((r)=> console.log(r))
        .catch((e)=> console.log(e));
      }
    const {searchParams} = new URL(request.url);

    const hasText = searchParams.has('text');
    const text = hasText ? searchParams.get('text')?.slice(0, 100): '';
    const blue = "blue"
    const sliced= text?.split(",") || [];
    const aboveText = sliced[0] || "";
    const belowText = sliced[1] || "";
    const imageData = await fetch(
    new URL( './drake.jpg' , import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    const fontData= await fetch(
    new URL('./Oswald-VariableFont_wght.ttf', import.meta.url)
    ).then((res)=> res.arrayBuffer());

    getAddress();

    return new ImageResponse(
        (
            <div
                style={{
                    display:'flex',
                    width:'100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems:'center',
                    position:'relative',
                    backgroundColor:'white',
                }}
            >
                {/*@ts-ignore*/}
                <img height='630' src={imageData}/>
                <div
                style={{
                    position: 'absolute',
                    margin:0,
                    top:100,
                    width:400,
                    right:150,
                    wordWrap:'break-word',
                    overflowWrap:'break-word',
                    color:'black',
                    lineHeight: 1,
                    fontSize:50,
                    fontFamily:"Oswald Bold",
                    textAlign: "center",
                    fontWeight:900,
                    textTransform:"capitalize",  
                }}
                >
                    hello world
                   {/* aboveText */}
                </div> 
                <div
                style={{
                    position: 'absolute',
                    margin:0,
                    bottom:150,
                    width:400,
                    right:150,
                    wordWrap:'break-word',
                    overflowWrap:'break-word',
                    color:'black',
                    lineHeight: 1,
                    fontSize:50,
                    fontFamily:"Oswald Bold",
                    textAlign: "center",
                    fontWeight:900,
                    textTransform:"capitalize",   
                }}
                >
                    {belowText}
                </div>
            </div>
        )
    )
}