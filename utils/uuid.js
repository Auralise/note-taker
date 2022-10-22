const createUuid =  () => {
    return Math.floor((1+ Math.random()) * 0x1000000).toString(16).substring(1);
}

//Generate a hex string 6 char long. +1 to avoid id of  000000

exports.createUuid = createUuid;