import { Config } from '@/Config'

const RNFS = require('react-native-fs');

export default async (fileUri) => {
    // Obtain the data from the file system in base 64
    var strBlob = await RNFS.readFile(fileUri, 'base64');
    var fullBlob = Buffer(strBlob, 'base64');
    
    // Split the data into a bunch of buffers according to max message size
    var numSplits = Math.ceil(Buffer.byteLength(strBlob, 'base64') / Config.device.maxBlobSizeBytes);
    var splitBlobs = [];

    for (var i = 0; i < numSplits; i++) {
        var startIdx = i * Config.device.maxBlobSizeBytes;
        var endIdx = (i + 1) * Config.device.maxBlobSizeBytes;

        if (i + 1 == numSplits) {
            splitBlobs.push(fullBlob.slice(startIdx));
        } else {
            splitBlobs.push(fullBlob.slice(startIdx, endIdx));
        }
    }

    return splitBlobs;
}
