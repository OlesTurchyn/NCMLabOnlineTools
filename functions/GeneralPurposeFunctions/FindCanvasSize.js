function FindCanvasSize(SuggestedWidth, SuggestedHeight, HeightOffset, WidthOffset) 
{
	// Find dimensions of the jspsych target
  
  visualStage = document.getElementById("jspsych-target-TRAILMAKING").getBoundingClientRect();
  console.log(document.getElementById("jspsych-content").getBoundingClientRect());
  
  
  // find screen dimension
	var ScreenHeight = visualStage.height
	var ScreenWidth = visualStage.width

  // adjust the height and width
  ScreenHeight = ScreenHeight*HeightOffset
  ScreenWidth = ScreenWidth*WidthOffset

  console.log("Suggested Height")
  console.log(SuggestedHeight)
  console.log("Actual Height")
  console.log(ScreenHeight)

  console.log("Suggested Width")
  console.log(SuggestedWidth)
  console.log("Actual Width")
  console.log(ScreenWidth)

  /* Check the canvas size and adjust as needed */
  // is suggested size SMALLER than the full screen?
  ratio = SuggestedWidth/SuggestedHeight
  console.log('Ratio:')
  console.log(ratio)
  var EnoughWidth = ScreenWidth > SuggestedWidth
  var EnoughHeight = ScreenHeight > SuggestedHeight

  // if there is not enough height use the max and adjust the width based on the ratio
  
  var CanvasWidth = SuggestedWidth
  var CanvasHeight = SuggestedHeight
  
  if ( ! EnoughWidth  &&  ! EnoughHeight ) {
    console.log('Not enought height OR width')
    // check if screen is portrait or landscape
    if ( ScreenWidth > ScreenHeight) {
      console.log('Landscape')
      // landscape -- use height adjust width
      CanvasHeight = ScreenHeight * HeightOffset
      CanvasWidth = ScreenHeight * ratio
    }
    else {
      // portrait
      console.log('portrait')
      CanvasWidth = ScreenWidth*0.8
      CanvasHeight = ScreenWidth / ratio
    }
  }
  if ( ! EnoughWidth  &&  EnoughHeight ) {
    console.log("Not enough width")
    CanvasWidth = ScreenWidth
    CanvasHeight = ScreenWidth / ratio
  }

  if ( ! EnoughHeight  &&  EnoughWidth ) {
    console.log("Not enough Height")
    CanvasHeight = ScreenHeight
    CanvasWidth = ScreenHeight * ratio
  }
  console.log(CanvasHeight)
  return {CanvasWidth, CanvasHeight};
}
