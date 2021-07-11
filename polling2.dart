import 'dart:async';
import 'package:flutter/material.dart';
import 'package:twilio_flutter/twilio_flutter.dart';

class Polling extends StatefulWidget {
  const Polling({Key? key}) : super(key: key);

  @override
  _PollingState createState() => _PollingState();
}

int diff=0;
class _PollingState extends State<Polling> {
  @override
  TimeOfDay _time = TimeOfDay.now();
  late TimeOfDay picked = TimeOfDay.now();

  void Diff () {
    String time1= _time.toString().substring(10,15);
    String time2= timeController.text.toString().substring(10,15);
    List time1List=time1.split(":");
    List time2List=time2.split(":");
    int diff=0;
    diff=((int.parse(time1List[1]))-(int.parse(time2List[1])));
    diff=diff+(((int.parse(time1List[0]))-(int.parse(time2List[0]))).abs())*60;
  }

  final textController = TextEditingController();
  final linkController = TextEditingController();
  final timeController = TextEditingController();

  TwilioFlutter twilioFlutter=
  TwilioFlutter(
    accountSid : 'xxxxx', // replace *** with Account SID
    authToken : 'xxxxx',  // replace xxx with Auth Token
    twilioNumber : '+xxxx',
  );

  TwilioFlutter twilioFlutter1=
  TwilioFlutter(
    accountSid : 'xxxx', // replace *** with Account SID
    authToken : 'xxxx',  // replace xxx with Auth Token
    twilioNumber : '+xxxx',
  );

  @override
  void sendSms() async {
    twilioFlutter.sendSMS(toNumber:'+91xxx', messageBody: 'Poll here ${textController.text}');
  }

  void sendWhatsApp() {
    twilioFlutter1.sendWhatsApp(toNumber:'+91xxx', messageBody: 'Poll here ${textController.text}');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Send Automated Message",style: TextStyle(
          fontSize: 22,
        ),),
        toolbarHeight: 90,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.indigo[600],
        elevation: 0.0,
      ),
      body: Container(
        padding: EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(
              controller: textController,
              decoration: InputDecoration(
                hintText: "Session link",
              ),
            ),
            TextField(
              controller: timeController,
              decoration: InputDecoration(
                hintText: "Session time - 24 hour format 00.00 ",
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          Future.delayed(Duration(minutes: 1), () {
            sendWhatsApp();
            sendSms();
          });
        } ,
        backgroundColor: Colors.indigo,
        tooltip: 'Send Sms',
        child: Icon(Icons.send),
      ),
    );
  }
}

