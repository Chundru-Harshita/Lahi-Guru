import 'package:flutter/material.dart';
import 'package:lahi/main.dart';
import 'package:teledart/teledart.dart';
import 'package:teledart/telegram.dart';
import 'dart:io' show Platform;

class Poll extends StatefulWidget {
  const Poll({Key? key}) : super(key: key);

  @override
  _PollState createState() => _PollState();
}

class _PollState extends State<Poll> {
  Future<void> teleFunc() async {
    final envVars = Platform.environment;
    var telegram = Telegram(envVars['1726566957:AAGlCucOd63FJsFOfsmI7ghZJhLBAtO18ZE']!);
    var event = Event((await telegram.getMe()).username!);
    var teledart = TeleDart(telegram, event);
    teledart.start();
    teledart
          .onCommand('hello')
    .listen(((message) => teledart.replyMessage(message, 'world')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Polling",style: TextStyle(
          fontSize: 22,
        ),),
        toolbarHeight: 90,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.indigo[600],
        elevation: 0.0,
      ),
      body: Container(
        padding: EdgeInsets.all(40.0),
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                hintText: "Question",
              ),
            ),
            TextField(
              decoration: InputDecoration(
                hintText: "Option 1",
              ),
            ),
            TextField(
              decoration: InputDecoration(
                hintText: "Option 2",
              ),
            ),
            TextField(
              decoration: InputDecoration(
                hintText: "Option 3",
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: (){
          main();
        } ,
        tooltip: 'Send Sms',
        backgroundColor: Colors.indigo,
        child: Icon(Icons.send),
      ),
    );
  }
}
