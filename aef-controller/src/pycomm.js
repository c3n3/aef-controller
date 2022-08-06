// A useful object to provide communication with the python script controlling aef
let pycomm = {
    zmq: null,
    vueInstance: null,
    sock: null,
    subsock: null,
    pingRes: null,
    update: null,
    inputs: [],
    commands: {},

    /**
     * @param {String} value The date
     */
    send(string)
    {
        if (pycomm.zmq !== null) {
            console.log("Sending " + string)
            pycomm.sock.send(["aef-command", string]);
        }
    },

    change(name, value)
    {
        console.log(name + value)
        pycomm.send(JSON.stringify({"command": "change", "name": name, "value": value}))
    },

    ping()
    {
        pycomm.send(JSON.stringify({"command": "ping"}))
    },
    
    getInputs()
    {
        pycomm.send(JSON.stringify({"command": "getinputs"}))
    },
    
    getValues()
    {
        pycomm.send(JSON.stringify({"command": "getcommands"}))
    },

    _listen(vueInstance)
    {
        pycomm.subsock.on("message", function(topic, message) {
            var str = new TextDecoder().decode(topic).slice("aef-info".length+1)
            var result = JSON.parse(str)
            vueInstance.pycomm.update = !vueInstance.pycomm.update;

            if (result["command"] == "getcommands") {
                vueInstance.pycomm.commands = result['value']
                console.log("---------------------------------------------")
                console.log(pycomm.commands)
                vueInstance.$forceUpdate()
                console.log("---------------------------------------------")
            } else if (result["command"] == "getinputs") {
                vueInstance.pycomm.inputs = result['value']
                console.log("---------------------------------------------")
                console.log(vueInstance.pycomm.inputs)
                vueInstance.$forceUpdate()
                console.log("---------------------------------------------")
            } else if (result["command"] == "ping") {
                pycomm.pingRes = true;
                console.log("---------------------------------------------")
                console.log(pycomm.inputs)
            }
        });
    },

    init(vueInstance)
    {
        pycomm.zmq = require("zeromq"),
        pycomm.sock = pycomm.zmq.socket("pub");

        try {
            pycomm.sock.bindSync("tcp://127.0.0.1:7777");
        } catch (error) {
            console.log("Could not create connection")
        }
        pycomm.subsock = pycomm.zmq.socket("sub");

        try {
            pycomm.subsock.connect("tcp://127.0.0.1:7778");
            pycomm.subsock.subscribe("aef-info");
        } catch (error) {
            
        }
        console.log("Subscriber connected to port 7778");

        pycomm._listen(vueInstance)

        setTimeout(() => {
            pycomm.getInputs()
            pycomm.getValues()
        }, 300)

    }
}

export default pycomm