const mqtt = require("mqtt/dist/mqtt");

const MqttInfo = require('./MQTTInfo')

class MQTTClientWeb {
    constructor() {
        this.username = MqttInfo.username;
        this.key = MqttInfo.key;
        this.port = 8883;
        this.url = `mqtts://${this.username}:${this.key}@io.adafruit.com`;
        this.client = mqtt.connect(this.url, this.port);
    }

    on(event, callback) {
        this.client.on(event, callback);
    }

    subscribe(feed) {
        console.log('Subcribe to: ', feed);
        this.client.subscribe(`${this.username}/feeds/${feed}`);
    }

    publish(topic, message) {
        this.client.publish(`${this.username}/feeds/${topic}`, message);
    }

    getLatestData = async (feed) => {
        const myPromise = await new Promise((resolve, reject) => {
            fetch(`https://io.adafruit.com/api/v2/${this.username}/feeds/${feed}/data/last?X-AIO-Key=${this.key}`)
                .then(res => res.json())
                .then(data => resolve(data));
        });
        return (myPromise);
    }
}

module.exports = new MQTTClientWeb();
