const TuyaDev = require('tuyapi');
const {keyRename,getHumanTimeStamp,checkValidJSON} = require('./lib/utils');

module.exports = function(RED) {

	function TuyaNode(config) {
		RED.nodes.createNode(this,config);
		var node = this;
		this.Name = config.devName;
		this.Id = config.devId;
		this.Key = config.devKey;
		this.Ip = config.devIp;
		this.version = config.protocolVer;
		this.renameSchema = config.renameSchema;
		const dev_info =  {name:this.Name,ip:this.Ip,id:this.Id};
		const device = new TuyaDev({
			id: this.Id,
			key: this.Key,
			ip: this.Ip,
			version: this.version});

		function connectToDevice(timeout,req) {
			device.find({'options': {'timeout':timeout}}).then( () => {
				node.status({fill:"yellow",shape:"dot",text:"connecting"});
				node.log(req);
				device.connect().then( () => {
				}, (reason) => { 
					node.status({fill:"red",shape:"ring",text:"failed: " + reason});
				});
			});
		}
// 
		function setDevice(req) {
			if ( req == "request" ) {
				device.get({"schema":true});
			} else if ( req == "connect" ) {
				// node.log('Connection requested by input');
				connectToDevice(10,'Connection requested by input');
			} else if ( req == "disconnect" ) {
				node.log("Disconnection requested by input")
				device.disconnect();
			} else if (req == "toggle") {
				device.toggle();
			} else if ( typeof req == "boolean" ) {
				device.set({set: req}).then( () => {
					node.status({fill:"green",shape:"dot",text: 'set success at:' + getHumanTimeStamp()});
				}, (reason) => {
					node.status({fill:"red",shape:"dot",text: 'set state failed:' + reason});
				});
			} else if ( "dps" in req ) {
				console.log(req)
				device.set(req);
			} else if ( "multiple" in req) {
				device.set({
					multiple:true,
					data: req.data
				});
			}
		}

		connectToDevice(10,'Deploy connection request');

		device.on('disconnected', () => {
			this.status({fill:"red",shape:"ring",text:"disconnected from device"});
			dev_info.available = false
			msg = {data:dev_info}
			node.send(msg);
			timeout = setTimeout(connectToDevice, 10000, device, 10, node,'set timeout for re-connect');
		});


		device.on('connected', () => {
			this.status({fill:"green",shape:"dot",text: this.Ip + " at " + getHumanTimeStamp()});
			clearTimeout(timeout)
		});

		device.on('error', error => {
			this.status({fill:"red",shape:"ring",text:"error: " + error});
			node.warn('error ' + error);
		});

		device.on('data', (data,commandByte) => {
			if ("commandByte" !== null ) {
				dev_info.available = true;
				if (this.renameSchema != undefined ) {
					schemaObj =  JSON.parse(this.renameSchema)
					data.dps = checkValidJSON(this.renameSchema) ? keyRename(data.dps,schemaObj) : data.dps;
				}
				msg = {data:dev_info,commandByte:commandByte,payload:data};
				node.send(msg);
			}
		});

		node.on('input', function(msg) {
			setDevice(msg.payload);
		});

		this.on('close', function() {
			if (device.isConnected()) {
				device.disconnect();
			}
		});


	}
	RED.nodes.registerType("tuya-local",TuyaNode);
}

