/*******************************************************************************
 * Functions for IoTHub
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// IoTHub API url.
const IOTHUB_API_URL = "mgiothub.azurewebsites.net"


namespace esp8266_mg {
    // Flag to indicate whether the IoTHub message was sent successfully.
    let iotHubMessageSent = false
    let iotConnected =false


    /**
     * Return true if the IoTHub message was sent successfully.
     */
    //% subcategory="IoTHub"
    //% weight=30
    //% blockGap=8
    //% blockId=esp8266_is_iothub_message_sent1
    //% block="iotHub message sent1"
    export function isIoTMessageSent(): boolean {
        return iotHubMessageSent
    }

     /**
     * Return true if the IoTHub message was sent successfully.
     */
    //% subcategory="IoTHub"
    //% weight=30
    //% blockGap=8
    //% blockId=esp8266_is_iothub_connected
    //% block="iotHub hub connected sent1"
    export function isIoTHubConnected(): boolean {
        return iotConnected
    }



    /**
     * Send IoTHub message.
     * @param apiKey IoTHub API Key.
     * @param id The chat ID we want to send message to.
     */
    //% subcategory="IoTHub"
    //% weight=29
    //% blockGap=8
    //% blockId=esp8266_send_iothub_message
    //% block="send message to iothub:|API Key %apiKey|Chat ID %chatId|Message %message"
    export function sendIotHubMessage(apiKey: string, id: string, message: string) {

        // Reset the upload successful flag.
        iotHubMessageSent = false
               // Construct the data to send.

        sendAT("AT+CIPSTART=\"TCP\",\"" + IOTHUB_API_URL + "\",80", 0) // connect to website server
        iotConnected = waitResponse()
        basic.pause(100)
        if (iotConnected) {
            let str: string = "GET /GetFunction?name=esp"
            sendAT("AT+CIPSEND=" + (str.length + 2))
            sendAT(str, 0) // upload data
            iotHubMessageSent = waitResponse()
            basic.pause(100)
        }
    }
}
