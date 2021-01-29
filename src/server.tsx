import express from "express"
import * as fs from "fs"
import * as path from "path"
import React, {FC, StrictMode} from "react"
import ReactDOMServer from "react-dom/server"
import App from "App"


const Root: FC = () => {

  return (
    <StrictMode>
      <App/>
    </StrictMode>
  )
}


const port = 8080
const app = express()
const serverPath = path.resolve(process.cwd())
const clientPath = path.resolve(serverPath, "..", "client")
const htmlFilename = path.resolve(clientPath, "index.html")

app.use(express.static(clientPath)) // FIXME: file client/index.html should be excluded from serving

app.all("*", async (req, res) => {

  // TODO:
  const ssr = ReactDOMServer.renderToString(<Root/>)

  const htmlTemplate = fs.readFileSync(htmlFilename).toString()
  const html = htmlTemplate.replaceAll(/<div id="root"><\/div>/g, `<div id="root">${ssr}</div>`)

  res.write(html)
  res.end()

})

app.listen(port)
console.log(`start listening on ${port}...`)
