import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:huoxing/assets.dart';

class Loading extends StatefulWidget {
  @override
  _LoadingState createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(Assets.LoadingBackground),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(
              Colors.black87.withOpacity(0.7),
              BlendMode.dstATop,
            ),
          ),
          color: Colors.black87,
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Column(
                children: [
                  renderLogo(),
                  renderDescription(),
                ],
              ),
              Container(
                child: Column(
                  children: [
                    renderSpinner(),
                    renderDevMessage(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  renderLogo() {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(
          color: Colors.white,
          width: 1,
        ),
      ),
      margin: EdgeInsets.symmetric(vertical: 15),
      padding: EdgeInsets.symmetric(vertical: 25),
      width: 400,
      child: Align(
        alignment: Alignment.center,
        child: Text(
          'HUOXING',
          style: TextStyle(
            color: Colors.white,
            fontSize: 40,
            fontWeight: FontWeight.w400,
            letterSpacing: 15,
            fontFamily: 'Trispace',
          ),
        ),
      ),
    );
  }

  renderDescription() {
    return Text(
      'Mars Weather App',
      style: TextStyle(
        color: Colors.white,
        fontSize: 15,
        fontWeight: FontWeight.w300,
        letterSpacing: 9,
        fontFamily: 'FiraSans',
        shadows: [Shadow(blurRadius: 3)],
      ),
    );
  }

  renderSpinner() {
    return SpinKitSpinningLines(
      color: Colors.white,
    );
  }

  renderDevMessage() {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 15),
      child: Text(
        'Development in progress',
        style: TextStyle(
          color: Colors.yellowAccent,
        ),
      ),
    );
  }
}
