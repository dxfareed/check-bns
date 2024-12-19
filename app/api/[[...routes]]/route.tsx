
/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar, pinata } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
//import { inspectRoutes } from 'hono/dev'


const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  browserLocation: '/:path',
  //hub: pinata(),
  title: 'Domain Check',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res(
    {
      action:'/start',
      //image:`${process.env.NEXT_PUBLIC}/image.png`,
      image:(
        <div
                style={{
                    display:'flex',
                    width:'100%',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems:'center',
                    position:'relative',
                    backgroundColor:'blue',
                }}
            >
              <div
                style={{
                    position: 'absolute',
                    margin:0,
                    top:180,
                    width:600,
                    left:150,
                    wordWrap:'break-word',
                    overflowWrap:'break-word',
                    color:'white',
                    lineHeight: 1,
                    fontSize:55,
                    fontFamily:"monospace",
                    fontWeight:900,
                }}
                >
                   Check the list of Basename(s) an address own 🤓
                </div>
            </div>
      ),
      intents:[
        <Button value='start'>Start</Button>
      ]
    }
  )
}) 

app.frame('/start', (c) => {
  //const {inputText} = c
  return c.res(
    {
      action:'/check/dns',
      image:`${process.env.NEXT_PUBLIC}/blue.png`,
      intents:[
        <TextInput placeholder='otedola.base.eth'/>,
        <Button value='start'>Search🔎</Button>
      ]
    }
  )
})

app.frame('/check/dns', (c) => {
  const {inputText} = c
  return c.res(
    {
      action:'/',
      image:`${process.env.NEXT_PUBLIC}/meme/i/?text=${inputText}`,
      intents:[
        <Button value='start'>Start over🔁</Button>
      ]
    }
  )
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)



// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
