import { topmost } from 'ui/frame';
import { DrawingPad } from 'nativescript-drawingpad';
 
// To get the drawing...
 
export function getMyDrawing() {      
      let drawingPad = <DrawingPad>topmost().getViewById('myDrawingPad');      
      drawingPad.getDrawing().then((res) => {        
          console.log(res);    
       });  
    }
 
 
// If you want to clear the signature/drawing...
export function clearMyDrawing() {
    let drawingPad = <DrawingPad>topmost().getViewById('myDrawingPad');      
    drawingPad.clearDrawing();
}