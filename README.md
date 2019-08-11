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

```json
[{"id":"115ada30.1743c6","type":"tuya-local","z":"8e8fe68f.ac31b8","devName":"socket1","devIp":"10.10.4.81","devId":"82180707adcfa6743a","devKey":"d189ad7b927d1dac","protocolVer":"3.3","x":550,"y":400,"wires":[["88349073.f9906"]]},{"id":"f21e12d7.a9512","type":"inject","z":"8e8fe68f.ac31b8","name":"","topic":"","payload":"true","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":460,"wires":[["115ada30.1743c6"]]},{"id":"19a51c7b.2203e4","type":"inject","z":"8e8fe68f.ac31b8","name":"","topic":"","payload":"false","payloadType":"bool","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":500,"wires":[["115ada30.1743c6"]]},{"id":"88349073.f9906","type":"debug","z":"8e8fe68f.ac31b8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"true","targetType":"full","x":730,"y":400,"wires":[]},{"id":"797d431a.95651c","type":"inject","z":"8e8fe68f.ac31b8","name":"{\"set\": true, \"dps\" : 1}","topic":"","payload":"{\"set\": true, \"dps\" : 1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":310,"y":420,"wires":[["115ada30.1743c6"]]},{"id":"90a67db.6f94d8","type":"inject","z":"8e8fe68f.ac31b8","name":"request","topic":"","payload":"request","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":340,"wires":[["115ada30.1743c6"]]},{"id":"8d81b2e6.7d0b4","type":"inject","z":"8e8fe68f.ac31b8","name":"disconnect","topic":"disconnect","payload":"disconnect","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":340,"y":300,"wires":[["115ada30.1743c6"]]},{"id":"b1231ec7.fadc6","type":"inject","z":"8e8fe68f.ac31b8","name":"connect ","topic":"","payload":"connect","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":260,"wires":[["115ada30.1743c6"]]},{"id":"e23704b.8e613f8","type":"inject","z":"8e8fe68f.ac31b8","name":"{\"set\": false, \"dps\" : 1}","topic":"","payload":"{\"set\": false, \"dps\" : 1}","payloadType":"json","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":300,"y":380,"wires":[["115ada30.1743c6"]]},{"id":"778d17d6.8d4d28","type":"inject","z":"8e8fe68f.ac31b8","name":"","topic":"","payload":"toggle","payloadType":"str","repeat":"","crontab":"","once":false,"onceDelay":0.1,"x":350,"y":540,"wires":[["115ada30.1743c6"]]}]
```


## About the node

The node connects to the devices via tcp socket using the tuyapi library. Tuyapi keeps the connection alive and is in charge of encrypting the commands and decrypting the received status from the device. This node in particular tries to connect constantly to the device, it will keep retrying until the connection is succesfull. You can disable the flow to prevent the node from re-connecting.

Due to a limitation on the tuyapi library if a device is not powered anymore the disconnect error message will come around 16 minutes later. This is on the roadmap to be improved for the next mayor release of tuyapi.