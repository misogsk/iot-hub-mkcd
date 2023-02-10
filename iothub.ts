/*******************************************************************************
 * Functions for Telegram
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// Telegram API url.
const IOTHUB_API_URL = "mgtesthub.azure-devices.net/devices/"


namespace esp8266_mg {
    // Flag to indicate whether the Telegram message was sent successfully.
    let iotHubMessageSent = false



    /**
     * Return true if the Telegram message was sent successfully.
     */
    //% subcategory="Telegram"
    //% weight=30
    //% blockGap=8
    //% blockId=esp8266_is_telegram_message_sent
    //% block="Telegram message sent"
    export function isIoTMessageSent(): boolean {
        return iotHubMessageSent
    }



    /**
     * Send Telegram message.
     * @param apiKey Telegram API Key.
     * @param id The chat ID we want to send message to.
     */
    //% subcategory="Telegram"
    //% weight=29
    //% blockGap=8
    //% blockId=esp8266_send_telegram_message
    //% block="send message to Telegram:|API Key %apiKey|Chat ID %chatId|Message %message"
    export function sendIotHubMessage(apiKey: string, id: string, message: string) {

        // Reset the upload successful flag.
        iotHubMessageSent = false

        // Make sure the WiFi is connected.
        if (isWifiConnected() == false) return

        // Connect to Telegram. Return if failed.
        //if (sendCommand("AT+CIPSTART=\"SSL\",\"" + IOTHUB_API_URL + id+"/messages/events""\",443", "OK", 10000) == false) return

        // Construct the data to send.
        "https://fully-qualified-iothubname.azure-devices.net/devices/{id}/messages/events?api-version=2020-03-13"
        let data = "POST https://fully-qualified-iothubname.azure-devices.net/devices/" + formatUrl(id) + "/messages/events?api-version=2020-03-13"
        data += " HTTP/1.1\r\n"
        data += "Host: " + IOTHUB_API_URL + "\r\n"
        data += "Message: "+message

        // Send the data.
        sendCommand("AT+CIPSEND=" + (data.length + 2))
        sendCommand(data)

        // Return if "SEND OK" is not received.
        if (getResponse("SEND OK", 1000) == "") {
            // Close the connection and return.
            sendCommand("AT+CIPCLOSE", "OK", 1000)
            return
        }

        // Validate the response from Telegram.
        let response = getResponse("\"ok\":true", 1000)
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