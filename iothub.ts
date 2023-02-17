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
        serial.writeString("sendingiot" + "\r\n" + isWifiConnected())
        serial.writeString("httpclient")
        // Make sure the WiFi is connected.
        //if (isWifiConnected() == false) return

        // Connect to Telegram. Return if failed.
        //if (sendCommand("AT+CIPSTART=\"SSL\",\"" + IOTHUB_API_URL + "\",443", "OK", 10000) == false) serial.writeString("\r\nfailed ssl\r\n")

        if (sendCommand("AT+CIPSTART=\"TCP\",\"" + IOTHUB_API_URL + "\",80", "OK", 10000) == false) return

        // Construct the data to send.
        let data = "GET /GetFunction?name=esp"

        // Send the data.
        sendCommand("AT+CIPSEND=" + (data.length + 2))
        sendCommand(data)
        
        // Return if "SEND OK" is not received.
        if (getResponse("SEND OK", 1000) == "") return

        // Send the data.
       // sendCommand("AT+HTTPCLIENT=3,1,https://mgiothub.azurewebsites.net/api/PostFunction,mgiothub.azurewebsites.net,/api/PostFunction,2" +"{Test:jupi}")
        

        // Return if "SEND OK" is not received.
        iotHubMessageSent = true
        return
    }

}
