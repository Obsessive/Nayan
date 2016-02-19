var viewModule = require("ui/core/view"); 
var WS = require('nativescript-websockets');
var FrameModule = require("ui/frame");
var fetchModule = require("fetch");
var Sqlite = require( "nativescript-sqlite" );
// var pages = require("ui/page");
var observable = require("data/observable");
var observableArrayModule = require("data/observable-array");
var panelModule = require("ui/layouts/stack-layout");
var LabelModule = require("ui/label");
var mySocket;
var evt;
var db;
var id;

function chatLoaded(args) {
    var page = args.object;
    var server = "nayanmain.negative.co.in";
    // var x = new observableArrayModule.ObservableArray([{ inout:0,text: "Test:All systems Go." }]);
    var row;
    var chatModel = (function (_super) {
        __extends( chatModel, _super);
        function chatModel() {
            _super.call(this);
            var self=this;
//load chat from db
var inout=1;
self.set("doctorchatlist",x);
new Sqlite("nayan.db", function(err, db) {
    var promisea = db.get('select id from user'); 
    promisea.then(function(row){
        id=row[0];
        var promise = db.each('select * from chat', 
            function (err, row) {
                console.log("Row results it:", row); 
                
                if(row[2]===id){
                        inout=0;
                    }else{
                        inout=1;
                    }
                    x.push({ inout:inout,text: row[1] });

});

        promise.then(function (count) {
            console.log("Rows displayed:", count); // Prints 100  (Assuming their are a 100 rows found)
            // self.set("doctorchatlist",x);
            },function (err) {
            console.log("Rows err:", err); // Prints 100  (Assuming their are a 100 rows found)
            // self.set("doctorchatlist",x);
            }); 
        });

//push to array


//Done with promises.
console.log("chat is now ready.");

});
};


chatModel.prototype.sendMessage =function(){
    var msg=this.get("messageInput");
    if(msg==""){
        return 0;
    }
    var timestamp=Math.floor(new Date() / 1000);
    console.log(msg);
    var promise =new Sqlite("nayan.db", function(err, db) {
        db.execSQL("INSERT INTO chat (`message`,`fromid`,`toid`) VALUES(?,?,?)",[msg,id,16]);
    });
    console.log(JSON.stringify({"payload":[{"fromid":id,"toid":"18","message":msg}]}));
    // mySocket.send(JSON.stringify({"payload":[{"fromid":id,"toid":"18","message":msg}]}));
    x.push({ inout:0,text: msg });

    var listview=page.getViewById("doctorchatlist");
    listview.scrollToIndex(x.length);
    this.set("messageInput","");
};

chatModel.prototype.nextAction = function () {
//Chat setup
mySocket = new WebSocket("ws://54.201.195.189:9000", [ /* "protocol","another protocol" */]);
mySocket.addEventListener('open', function (evt) { 
    console.log("We are Open"); 
    id=id.toString();
    evt.target.send(JSON.stringify({"id":id})); 
    evt.target.send(JSON.stringify({"get":id}));
});
mySocket.addEventListener('message', function(evt) { 
    console.log("We got a message: ", evt.data);
    var data=evt.data;  
    data=data.toString().trim();
// console.log(JSON.parse('{"payload":[{"fromid":"6","toid":"16","message":"ok"}]}').toString());
try {
    data=JSON.parse(data);
} catch (e) {
    data=false;
    console.log("not JSON");
}
if(data!=false){
    if(typeof data.payload!="undefined"){
        console.log(id);
        console.log(data.payload);
        if(data.payload.length>0){
            for (var i = 0, len = data.payload.length; i < len; i++) {
                x.push({ inout:1,text: data.payload[i].message });
                var timestamp=Math.floor(new Date() / 1000);
                db.execSQL("INSERT INTO chat (`message`,`fromid`,`toid`,`time`) VALUES("+data.payload[i].message+","+data.payload[i].fromid+","+data.payload[i].toid+","+timestamp+")");
//Add to db
}
}
// console.log(data.payload[0].message);
// x.push({ inout:1,text: "I am "+id });
}
if(typeof data.ping!="undefined"){
    console.log("requesting new data");
    evt.target.send(JSON.stringify({"get":id}));
}

}
// var data=JSON.parse(evt.data);
// if(typeof data.payload!="undefined"){
//     x.push({ inout:1,text: "I am "+id });
//   console.log('we have incoming');
//   console.log(data.payload[0].message);
// }
// evt.target.close(); 
});
mySocket.addEventListener('close', function(evt) { 
    console.log("The Socket was Closed:", evt.code, evt.reason); 
});
mySocket.addEventListener('error', function(evt) { 
    console.log("The socket had an error", evt.error); 
});
};

return chatModel;
})(observable.Observable);
page.bindingContext = new chatModel();
}

exports.chatLoaded = chatLoaded;