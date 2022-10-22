//ANSI Escape codes for logger colours
const green = "\x1b[32m";
const cyan = "\x1b[36m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const reset = "\x1b[0m";

// Construct and format a timestamp
const getTimestamp = () => {
    const now = new Date();
    let timestamp = `${now.getFullYear()}/`;
    timestamp += `${('0' + now.getMonth()).slice(-2)}/`;
    timestamp += `${('0' + now.getDay()).slice(-2)} `;
    timestamp += `${('0' + now.getHours()).slice(-2)}:`;
    timestamp += `${('0' + now.getMinutes()).slice(-2)}:`;
    timestamp += `${('0' + now.getSeconds()).slice(-2)}`;

    return timestamp;

}

//Provide logging function
const logMethod = (method, text) => {
    const timestamp = getTimestamp();
    switch (method){
        case 'GET': 
            console.log(`${green}${timestamp} - ${method} request: ${text}${reset}`);
            break;
        case 'POST':
            console.log(`${cyan}${timestamp} - ${method} request - ${text}${text}${reset}`);
            break;
        case 'DELETE':
            console.log(`${yellow}${timestamp} - ${method} request: ${text}${text}${reset}`);
            break;
        default:
            console.log(`${red}${timestamp} - Invalid Request received${reset}`);
    }
    
}

exports.logMethod = logMethod;