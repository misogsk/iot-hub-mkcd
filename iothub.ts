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
    let iotConnected = false


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
    //% block="send message to iothub:|Host %host
    export function sendIotHubMessage(host: string) {

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
    /**
    * Connect to ThingSpeak and upload data. It would not upload anything if it failed to connect to Wifi or ThingSpeak.
    */
    //% block="Upload data to ThingSpeak|URL/IP = %ip|Write API key = %write_api_key|Field 1 = %n1|Field 2 = %n2|Field 3 = %n3|Field 4 = %n4|Field 5 = %n5|Field 6 = %n6|Field 7 = %n7|Field 8 = %n8"
    //% ip.defl=api.thingspeak.com
    //% write_api_key.defl=your_write_api_key
    export function connectThingSpeak(ip: string, write_api_key: string, n1: number, n2: number, n3: number, n4: number, n5: number, n6: number, n7: number, n8: number) {
        iotHubMessageSent = false
        sendAT("AT+CIPSTART=\"TCP\",\"" + ip + "\",80", 0) // connect to website server
        iotConnected = waitResponse()
        basic.pause(100)
        if (iotConnected) {
            iotHubMessageSent = false
            let str: string = "GET /update?api_key=" + write_api_key + "&field1=" + n1 + "&field2=" + n2 + "&field3=" + n3 + "&field4=" + n4 + "&field5=" + n5 + "&field6=" + n6 + "&field7=" + n7 + "&field8=" + n8
            sendAT("AT+CIPSEND=" + (str.length + 2))
            sendAT(str, 0) // upload data
            iotHubMessageSent = waitResponse()
            basic.pause(100)
        }
    }
}
