import React, {FC, StrictMode} from "react"
import {hydrate} from "react-dom"
import App from "App"
import "index.css"


const Root: FC = () => {

  return (
    <StrictMode>
      <App/>
    </StrictMode>
  )
}

hydrate(<Root/>, document.getElementById("root"))
