// import {  } from "@material-ui/icons"
import React from "react"

import CourseCard from "../general/CourseCard"
import LargeHeader from "../general/LargeHeader"

export default function SearchResultPage(resultJson) { // origin input: props
  const searchResults = resultJson.result;
  // for (const singleCourse in resultJson) {
  //   searchResults.push(
  //       <div>
  //         <CourseCard />
  //       </div>
  //   )
  // }
  console.log("success");
  return (
    <div>
      {searchResults}
    </div>
    // <div>
    //   <LargeHeader />
    //   <CourseCard />
    //   { /*<Footer />*/}
    //   { /*<BigFooter /> */}
    //   { /*<LoginPage close={this.closeLoginPage} pageStatus={this.state.openLoginWindow}/>*/}
    // </div>
  )
}


// courseName attribute map to .course-title-wrap > p
    // credit attribute map to #5cre > p
    // creditType attribute map to #QSR > p