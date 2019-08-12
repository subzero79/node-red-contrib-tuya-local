# node-red-contrib-tuya-local

A node to control tuya devices locally. Based on [tuyapi](https://github.com/codetheweb/tuyapi) node library


![alt text](https://github.com/subzero79/node-red-contrib-tuya-local/blob/master/images/Screenshot_2019-08-10_11-52-46.png)

## Installing

This packages is not yet published to npm so it has to be installed manually.


### NodeRED running on official docker image, latest tag(not slim versions)

```shell
docker exec -it ${nodered-container-name} bash
cd /data
npm install subzero79/node-red-contrib-tuya-local
exit
docker restart ${nodered-container-name}
```

### NodeRED running on official docker image, slim tag versions

```shell
docker exec -it ${nodered-container-name} bash
cd /data
wget https://github.com/subzero79/node-red-contrib-tuya-local/archive/master.zip -O /tmp/master.zip
unzip /tmp/master.zip -d /tmp
npm pack /tmp/node-red-contrib-tuya-local
npm install node-red-contrib-tuya-local-0.0.1.tgz
exit
docker restart ${nodered-container-name}
```


### NodeRED running on nodeenv. Under the username running the nodered instance

```shell
. path/to/nodered/environment/bin/activate
cd ~/.node-red/
npm install subzero79/node-red-contrib-tuya-local
```

To update the node run the same steps above.

## Example flow

### Simple nodered testing

```json
[{"id":"115ada30.1743c6","type":"tuya-local","z":"8e8fe68f.ac31b8","devName":"socket1","devIp":"10.10.4.81","devId":"82180707adcfa6743a","devKey":"d189ad7b927d1dac","protocolVer":"3.3","x":550,"y":400,"wires":[["88349073.f9906"]]},{"id":"f21e12d7.a9512","type":"inject","z":"8e8fe68f.ac31b8","name":"","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":460,"wires":[["115ada30.1743c6"]]},{"id":"19a51c7b.2203e4","type":"inject","z":"8e8fe68f.ac31b8","name":"","topic":"","payload":"false","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":500,"wires":[["115ada30.1743c6"]]},{"id":"88349073.f9906","type":"debug","z":"8e8fe68f.ac31b8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","x":730,"y":400,"wires":[]},{"id":"797d431a.95651c","type":"inject","z":"8e8fe68f.ac31b8","name":"{\"set\": true, \"dps\" : 1}","topic":"","payload":"{\"set\": true, \"dps\" : 1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":310,"y":420,"wires":[["115ada30.1743c6"]]},{"id":"90a67db.6f94d8","type":"inject","z":"8e8fe68f.ac31b8","name":"request","topic":"","payload":"request","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":340,"wires":[["115ada30.1743c6"]]},{"id":"8d81b2e6.7d0b4","type":"inject","z":"8e8fe68f.ac31b8","name":"disconnect","topic":"disconnect","payload":"disconnect","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":340,"y":300,"wires":[["115ada30.1743c6"]]},{"id":"b1231ec7.fadc6","type":"inject","z":"8e8fe68f.ac31b8","name":"connect ","topic":"","payload":"connect","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":260,"wires":[["115ada30.1743c6"]]},{"id":"e23704b.8e613f8","type":"inject","z":"8e8fe68f.ac31b8","name":"{\"set\": false, \"dps\" : 1}","topic":"","payload":"{\"set\": false, \"dps\" : 1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":300,"y":380,"wires":[["115ada30.1743c6"]]},{"id":"778d17d6.8d4d28","type":"inject","z":"8e8fe68f.ac31b8","name":"","topic":"","payload":"toggle","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":540,"wires":[["115ada30.1743c6"]]}]
```

### Home Assistant via mqtt

![alt text](https://github.com/subzero79/node-red-contrib-tuya-local/blob/master/images/Screenshot_2019-08-12_14-00-20.png)

This example sets two smart sockets in home assistant using MQTT discovery. State update of the devices and command control is done via MQTT using tuya-local.
The first row contains information about the device to be stored in context, including the name that must match the one given in the tuya-local node. Set the corresponding information for your device. 

The second row pushes the device configs to homeassistant discovery, after that the devices should appear in homeassistant and displayed as unavailable.

The third row receives commands from MQTT and sends them to tuya-local node. Any outputs either by command or self device update is sent to the MQTT broker to the device status topic. Set the tuya-local nodes with the corresponding keys, ips and ids. Don't forget also to set the brokers hostname, username and password.

```json
[{"id":"b40f19b3.81c0e8","type":"change","z":"d98cf64c.d7fed8","name":"set tuya_devices","rules":[{"t":"set","p":"tuya_devices","pt":"flow","to":"(\t   $s1          := \"switch_1\";\t   $s2          := \"switch_2\";\t   [\t       {\t           \"devId\"      : \"82180808c44f33a6743a\",\t           \"ip\"         : \"10.10.4.81\",\t           \"name\"       : $s1\t       },\t       {\t           \"devId\"      : \"82180808c44f3387a0fe\",\t           \"ip\"         : \"10.10.4.82\",\t           \"name\"       : $s2\t       }\t   ]\t)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":330,"y":160,"wires":[[]]},{"id":"546e596.a25eea8","type":"inject","z":"d98cf64c.d7fed8","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":true,"onceDelay":0.1,"x":150,"y":160,"wires":[["b40f19b3.81c0e8"]]},{"id":"bf85621d.da07d","type":"inject","z":"d98cf64c.d7fed8","name":"","topic":"","payload":"tuya_devices","payloadType":"flow","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":140,"y":240,"wires":[["5795380.6f9a1c8"]]},{"id":"5795380.6f9a1c8","type":"split","z":"d98cf64c.d7fed8","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":290,"y":240,"wires":[["c1f88cc8.ad8e"]]},{"id":"c1f88cc8.ad8e","type":"change","z":"d98cf64c.d7fed8","name":"set mqtt devices","rules":[{"t":"set","p":"payload","pt":"msg","to":"(\t$topic_prefix := \"tuya\";\t$dev_name := payload.name;\t   {\t       \"platform\":\"mqtt\",\t       \"name\": $dev_name,\t       \"state_topic\":$topic_prefix & \"/\" & $dev_name & \"/status\",\t       \"value_template\": \"{{ value_json.state }}\",\t       \"command_topic\":$topic_prefix & \"/\" & $dev_name & \"/set\",\t       \"availability_topic\":$topic_prefix & \"/\" & $dev_name & \"/available\",\t       \"payload_available\":\"online\",\t       \"payload_not_available\":\"offline\",\t       \"json_attributes_topic\": $topic_prefix & \"/\" & $dev_name & \"/status\",\t       \"json_attributes_template\": \"{{ value_json.attributes | tojson }}\",\t       \"payload_on\":\"ON\",\t       \"payload_off\":\"OFF\",\t       \"optimistic\":false,\t       \"qos\":0,\t       \"retain\":false\t   }\t)","tot":"jsonata"},{"t":"set","p":"topic","pt":"msg","to":"\"homeassistant/switch/\" & payload.name & \"/config\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":500,"y":240,"wires":[["879a9a27.016f58"]]},{"id":"879a9a27.016f58","type":"mqtt out","z":"d98cf64c.d7fed8","name":"","topic":"","qos":"","retain":"","broker":"7b9a492a.76f2c8","x":650,"y":240,"wires":[]},{"id":"a2e39ae1.1c8008","type":"tuya-local","z":"d98cf64c.d7fed8","devName":"switch_1","devIp":"10.10.4.81","devId":"82180707c44f33a6743a","devKey":"df2ad2b927d1dac","protocolVer":"3.3","renameSchema":"","filterCB":"","x":660,"y":340,"wires":[["82d03748.37a7c8"]]},{"id":"743700a3.27eee","type":"mqtt in","z":"d98cf64c.d7fed8","name":"","topic":"tuya/+/set","qos":"2","datatype":"auto","broker":"7b9a492a.76f2c8","x":160,"y":380,"wires":[["74d7a3e9.b626cc"]]},{"id":"87ac07d9.edda68","type":"change","z":"d98cf64c.d7fed8","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"data.available ? \"online\" : \"offline\"","tot":"jsonata"},{"t":"set","p":"topic","pt":"msg","to":"\"tuya/\" & data.name & \"/available\"","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":980,"y":400,"wires":[["7ee9b2f.05c694c"]]},{"id":"7ee9b2f.05c694c","type":"mqtt out","z":"d98cf64c.d7fed8","name":"","topic":"","qos":"","retain":"","broker":"7b9a492a.76f2c8","x":1190,"y":360,"wires":[]},{"id":"74d7a3e9.b626cc","type":"change","z":"d98cf64c.d7fed8","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"(\t$new_state := (payload = \"ON\") ? true : false; \t{ \"set\" : $new_state, \"dps\": 1 }\t)","tot":"jsonata"},{"t":"set","p":"topic","pt":"msg","to":"(\t$name:= $split(topic, \"/\")[1];\t   $tuya:= [\t       {\t           \"devId\":\"82180707c44f33a6743a\",\t           \"ip\":\"10.10.4.81\",\t           \"localKey\":\"acb2ad7b927d1dac\",\t           \"name\":\"switch_1\",\t           \"state_t\":\"medion/switch_1\",\t           \"cmd_t\":\"medion/switch_1/set\",\t           \"attr_t\":\"medion/switch_1/attributes\",\t           \"avai_t\":\"medion/switch_1/available\",\t           \"entity_id\":\"switch.medion_switch_1_mqtt\"\t       },\t       {\t           \"devId\":\"82180707c44f3387a0fe\",\t           \"ip\":\"10.10.4.82\",\t           \"localKey\":\"58c3558e3ca45c9e\",\t           \"name\":\"switch_2\",\t           \"state_t\":\"medion/switch_2\",\t           \"cmd_t\":\"medion/switch_2/set\",\t           \"attr_t\":\"medion/switch_2/attributes\",\t           \"avai_t\":\"medion/switch_2/available\",\t           \"entity_id\":\"switch.medion_switch_2_mqtt\"\t       }\t   ];\t$device := $filter($tuya, function($x) {\t    $x.name = $name\t});\t$device.ip\t)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":320,"y":380,"wires":[["27fe737.1f92e8c"]]},{"id":"27fe737.1f92e8c","type":"switch","z":"d98cf64c.d7fed8","name":"","property":"topic","propertyType":"msg","rules":[{"t":"eq","v":"tuya_devices.0.ip","vt":"flow"},{"t":"eq","v":"tuya_devices.1.ip","vt":"flow"}],"checkall":"true","repair":false,"outputs":2,"x":470,"y":380,"wires":[["a2e39ae1.1c8008"],["4b43fc85.5c39a4"]]},{"id":"4d1e51e4.123a","type":"function","z":"d98cf64c.d7fed8","name":"","func":"const dps =  msg.payload.dps;\nlet state = null;\nlet power = null;\nlet voltage = null;\nlet current = null;\nif (\"1\" in dps) {\n    state = (dps['1']) ? \"ON\" : \"OFF\";\n}\n\nmsg.payload = {\n    state: state,\n    attributes: {power: \"0 W\",current:\"0 mA\",voltage:\"0 V\"}\n};\n\nif (\"19\" in dps) {\n    msg.payload.attributes.power = (dps['19']/10).toString() + \" W\";\n}\n\nif (\"20\" in dps) {\n    msg.payload.attributes.voltage = (dps['20'] /10).toString() + \" V\";\n}\n\nif (\"18\" in dps) {\n    msg.payload.attributes.current = (dps['18']).toString() + \" mA\";\n}\n\n\n\nif (msg.payload.state === null) {\n    delete msg.payload.state;\n}\n\nmsg.topic = \"tuya/\" + msg.data.name + \"/status\"\nreturn msg;","outputs":1,"noerr":0,"x":950,"y":360,"wires":[["7ee9b2f.05c694c"]]},{"id":"3a1376d8.ad1c3a","type":"comment","z":"d98cf64c.d7fed8","name":"set device information","info":"","x":160,"y":100,"wires":[]},{"id":"ab82d464.f622c8","type":"comment","z":"d98cf64c.d7fed8","name":"set homeassistant discovery","info":"","x":180,"y":200,"wires":[]},{"id":"16e068de.061e07","type":"comment","z":"d98cf64c.d7fed8","name":"control-status","info":"","x":130,"y":320,"wires":[]},{"id":"4b43fc85.5c39a4","type":"tuya-local","z":"d98cf64c.d7fed8","devName":"switch_2","devIp":"10.10.4.82","devId":"82180707c44f3387a0fe","devKey":"58c2568e3ca45c9e","protocolVer":"3.3","renameSchema":"","filterCB":"","x":660,"y":420,"wires":[["82d03748.37a7c8"]]},{"id":"82d03748.37a7c8","type":"function","z":"d98cf64c.d7fed8","name":"","func":"if (\"payload\" in msg) {\n    return [msg,msg];\n} else {\n    return [null,msg];\n}","outputs":2,"noerr":0,"x":800,"y":380,"wires":[["4d1e51e4.123a"],["87ac07d9.edda68"]]},{"id":"7b9a492a.76f2c8","type":"mqtt-broker","z":"","name":"hass","broker":"10.10.0.152","port":"1883","clientid":"nr-docker","usetls":false,"compatmode":false,"keepalive":"60","cleansession":true,"birthTopic":"","birthQos":"0","birthPayload":"","closeTopic":"","closeQos":"0","closePayload":"","willTopic":"","willQos":"0","willPayload":""}]
```


## About the node

The node connects to the devices via tcp socket using the tuyapi library. Tuyapi keeps the connection alive and is in charge of encrypting the commands and decrypting the received status from the device. This node in particular tries to connect constantly to the device, it will keep retrying until the connection is succesfull. You can disable the flow to prevent the node from re-connecting.

Due to a limitation on the tuyapi library if a device is not powered anymore the disconnect error message will come around 16 minutes later. This is on the roadmap to be improved for the next mayor release of tuyapi.