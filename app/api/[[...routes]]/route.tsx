
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
  title: 'Create Meme',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  //const {verified} =c;
    return c.res({
      action:'/create',
      image: `${process.env.NEXT_PUBLIC}/textyeat.png`,
      intents: [
        <Button value='A'>
          Create new meme
        </Button>
      ],
    })
  /* return c.res({
    action:'/',
    image:(
      <div 
        style={{
          color: 'red',
          display:'flex',
          fontSize:'50'
        }}>
          Invalid User
        </div>  
  ), 
  intents: [<Button>Try again</Button>]
  }) */
})

app.frame('/create', (c) => {
  return c.res({
    action: '/meme/i',
    image: `${process.env.NEXT_PUBLIC}/meme/i`,
    imageAspectRatio:"1.91:1",
    intents: [
      <TextInput placeholder='text above, text below'/>,
     <Button value='generate'>
        generate
     </Button>
    ],
  })
}) 

app.frame('/meme/i', (c) => {

  const {inputText} = c;

  //console.log('Inputted text.', inputText);
 return c.res({
  action: '/create',
  image: `${process.env.NEXT_PUBLIC}/meme/i?text=${inputText}`,
  imageAspectRatio:"1.91:1",
    intents: [
     <Button>
        Start over
     </Button>
    ],  
})
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
