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
    //% blockId=esp8266_is_iothub_message_sent
    //% block="iotHub message sent"
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
        serial.writeString("sendingiot" + "\r\n"+isWifiConnected())
        // Make sure the WiFi is connected.
        //if (isWifiConnected() == false) return

        // Connect to Telegram. Return if failed.
        //if (sendCommand("AT+CIPSTART=\"SSL\",\"" + IOTHUB_API_URL + "\",443", "OK", 10000) == false) serial.writeString("\r\nfailed ssl\r\n")

        // Construct the data to send.
        //"https://fully-qualified-iothubname.azure-devices.net/devices/{id}/messages/events?api-version=2020-03-13"
        //let data = "POST https://mgiothub.azurewebsites.net/api/PostFunction"
        let data= "POST /api/PostFunction "
        data += "HTTP/1.1 "
        data += "Host: " + IOTHUB_API_URL +" "
        data+= "Content-Type: application/json "
        data += "{Test:jupi}"

        // Send the data.
        sendCommand("AT+HTTPCLIENT=3" + (data.length + 2))
        sendCommand(data)

        // Return if "SEND OK" is not received.
        if (getResponse("SEND OK", 1000) == "") {
            // Close the connection and return.
            sendCommand("AT+CIPCLOSE", "OK", 1000)
            return
        }
        else 
        {
            serial.writeString("Failed\r\n")
        }

        // Validate the response from Telegram.
        let response = getResponse("\"ok\":true", 1000)
        serial.writeString(response)
        if (response == "") {
            // Close the connection and return.
            sendCommand("AT+CIPCLOSE", "OK", 1000)
            return
        }

        // Close the connection.
        sendCommand("AT+CIPCLOSE", "OK", 1000)

        // Set the upload successful flag and return.
        iotHubMessageSent = true
        return
    }

}
