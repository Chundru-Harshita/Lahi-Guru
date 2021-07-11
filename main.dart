import 'package:flutter/material.dart';
import 'package:flutter_sms/flutter_sms.dart';
import 'package:lahi/polling2.dart';
import 'package:lahi/sendmsg.dart';
import 'package:lahi/polling1.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Home(),
    );
  }
}

List<String> recipents = ["xxxx", "xxxx"];

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Send Notifications",style: TextStyle(
          fontSize: 22,
        ),),
        toolbarHeight: 90,
        automaticallyImplyLeading: false,
        backgroundColor: Colors.indigo[600],
        elevation: 0.0,
      ),
      body: Container(
        child: Center(
          child: Column(
            children: [Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                color: Colors.indigo[600],
                padding: EdgeInsets.symmetric(vertical: 16,horizontal: 20),
                child: Text("Send Manual Sms",
                    style: Theme.of(context).accentTextTheme.button),
                onPressed: () {
                  _sendSMS("This is a test message!", recipents);
                },
              ),
            ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: RaisedButton(
                  color: Colors.indigo[600],
                  padding: EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                  child: Text("Send Automated Message",
                      style: Theme.of(context).accentTextTheme.button),
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => SendWsMsg()));
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: RaisedButton(
                  color: Colors.indigo[600],
                  padding: EdgeInsets.symmetric(vertical: 16,horizontal: 20),
                  child: Text("Polling 1",
                      style: Theme.of(context).accentTextTheme.button),
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Poll()));
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: RaisedButton(
                  color: Colors.indigo[600],
                  padding: EdgeInsets.symmetric(vertical: 16,horizontal: 20),
                  child: Text("Polling 2",
                      style: Theme.of(context).accentTextTheme.button),
                  onPressed: () {
                    Navigator.push(context, MaterialPageRoute(builder: (context) => Polling()));
                  },
                ),
              ),
          ],
          ),
        ),

      ),
    );
  }



}

void _sendSMS(String message, List<String> recipents) async {
  String _result = await sendSMS(message: message, recipients: recipents)
      .catchError((onError) {
    print(onError);
  });
  print(_result);
}