import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import * as imageSource from "image-source";

export function navigatingTo(args: EventData) {

    let page = <Page>args.object;

    var image = page.getViewById("img");

    var inputImage = image.ios; // The UIImage, which initially is CGImage-based

    var base64_1 = imageSource.fromNativeSource(inputImage).toBase64String("png");
    console.log(base64_1); // This will return a valid base64 string of the image

    if(inputImage.CGImage) {
    // Convert from CGImage to CIImage
    inputImage = CIImage.imageWithCGImage(inputImage.CGImage);
    } else {
    // Refer to CIImage
    inputImage = inputImage.CIImage;
    }

    var newImage = UIImage.imageWithCIImage(inputImage);
    var base64_2 = imageSource.fromNativeSource(newImage).toBase64String("png");
    console.log(base64_2); // Returns null (because it's now a CIImage)
}