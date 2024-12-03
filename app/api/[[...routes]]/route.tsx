/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { inspectRoutes } from 'hono/dev'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  return c.res({
    action:'/create',
    image: "http://localhost:3000/edit123.jpg",
    imageAspectRatio:"1:1",
    intents: [
      <Button value='A'>
        Create new meme
      </Button>
    ],
  })
})

app.frame('/create', (c) => {
  return c.res({
    action: '/meme/i',
    image: "http://localhost:3000/meme/i",
    intents: [
      <TextInput placeholder='text first'/>,
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
  image: `http://localhost:3000/meme/i?text=${inputText}`,
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
