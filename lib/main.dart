import 'package:flutter/material.dart';
import 'package:huoxing/pages/loading.dart';

void main() => runApp(
      MaterialApp(
        initialRoute: '/',
        routes: {
          '/': (context) => Loading(),
        },
      ),
    );
