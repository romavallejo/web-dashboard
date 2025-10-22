import { deleteImage } from "../api/imageServices";

export async function onCommittingReport(reportInfo) {
    // If editing existing and a replacement happened
    if (reportInfo.startImage && reportInfo.image !== reportInfo.startImage) {
        // delete the old image (since it's replaced permanently)
        await deleteImage(reportInfo.startImage);
    }
    // If new report or no image change, nothing to do
}

export async function onCancelReport(reportInfo) {
    //If new report (no start image)
    // delete the uploaded image because it's temporary
    if (!reportInfo.startImage && reportInfo.image) {
        await deleteImage(reportInfo.image);
        return;
    }

    // if editing existing report
    // delete the new temp image, keep the original
    if (reportInfo.startImage) {
        if (reportInfo.image && reportInfo.image !== reportInfo.startImage) {
            await deleteImage(reportInfo.image);
        }
    }
}