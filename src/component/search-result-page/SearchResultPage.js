// import {  } from "@material-ui/icons"
import React from "react"

import CourseCard from "../general/CourseCard"
import LargeHeader from "../general/LargeHeader"

export default function SearchResultPage(props) {
  const searchResults = [];
  return (
    <div>
      <LargeHeader />
      <CourseCard />
      { /*<Footer />*/}
      { /*<BigFooter /> */}
      { /*<LoginPage close={this.closeLoginPage} pageStatus={this.state.openLoginWindow}/>*/}
    </div>
  )
}