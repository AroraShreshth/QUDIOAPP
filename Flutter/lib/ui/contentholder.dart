import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_ui_collections/ui/photo_list.dart';
import 'package:flutter_ui_collections/utils/utils.dart';
import 'package:flutter_ui_collections/widgets/utils_widget.dart';
import 'package:flutter_ui_collections/widgets/widgets.dart';

class ProfilePage extends StatefulWidget {
  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Screen size;

  @override
  Widget build(BuildContext context) {
    size = Screen(MediaQuery.of(context).size);

    return Scaffold(
      backgroundColor: backgroundColor,
      body: AnnotatedRegion(
        value: SystemUiOverlayStyle(
        statusBarColor: backgroundColor,
        statusBarBrightness: Brightness.dark,
        statusBarIconBrightness: Brightness.dark,
        systemNavigationBarIconBrightness: Brightness.dark,
        systemNavigationBarColor: backgroundColor),
        child: Container(
          child: SingleChildScrollView(
            physics: ClampingScrollPhysics(),
            child: Column(
              children: <Widget>[upperPart()],
            ),
          ),
        ),
      ),
    );
  }

  Widget upperPart() {
    return Stack(children: <Widget>[
      ClipPath(
        clipper: UpperClipper(),
        child: Container(
          height: size.getWidthPx(150),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [colorCurve, colorCurve],
            ),
          ),
        ),
      ),
      Column(
        children: <Widget>[
          profileWidget(),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              nameWidget(),
              ],
          ),
          Padding(
            padding: EdgeInsets.only(
                top: size.getWidthPx(8),
                left: size.getWidthPx(20),
                right: size.getWidthPx(20)),
            child: Container(height: size.getWidthPx(4), color: colorCurve),
          ),
          
          leftAlignText(
              text: "\n\n Your Doctor: <N/A> \n\n Your Lab: <N/A>",
              leftPadding: size.getWidthPx(16),
              textColor: textPrimaryColor,
              fontSize: 18.0),
         
        ],
      )
    ]);
  }

  GestureDetector followerAvatarWidget(String assetIcon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: CircleAvatar(
        maxRadius: size.getWidthPx(24),
        backgroundColor: Colors.transparent,
        child: Image.asset(assetIcon),
      ),
    );
  }

  Container buttonWidget(text) {
    return Container(
      padding: EdgeInsets.symmetric(
          vertical: size.getWidthPx(4), horizontal: size.getWidthPx(12)),
      child: RaisedButton(
        elevation: 8.0,
        shape: RoundedRectangleBorder(
            borderRadius: new BorderRadius.circular(22.0)),
        padding: EdgeInsets.all(size.getWidthPx(2)),
        child: Text(
          '  Add New Patient  ',
          style: TextStyle(
              fontFamily: 'Exo2', color: Colors.white, fontSize: 14.0),
        ),
        color: colorCurve,
        onPressed: () {},
      ),
    );
  }

  Align profileWidget() {
    return Align(
      alignment: Alignment.center,
      child: Container(
        margin: EdgeInsets.only(top: size.getWidthPx(60)),
        child: CircleAvatar(
          foregroundColor: backgroundColor,
          maxRadius: size.getWidthPx(50),
          backgroundColor: Colors.white,
          child: CircleAvatar(
            maxRadius: size.getWidthPx(48),
            foregroundColor: colorCurve,
            backgroundImage: NetworkImage(
                'data:image/jpeg;base64,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'),
          ),
        ),
      ),
    );
  }

  

  Column nameWidget() {
    return Column(
      children: <Widget>[
        Text("<name>",
            style: TextStyle(
                fontFamily: "Exo2",
                fontSize: 16.0,
                color: colorCurve,
                fontWeight: FontWeight.w700)),
        SizedBox(height: size.getWidthPx(4)),
        Text("Patient",
            style: TextStyle(
                fontFamily: "Exo2",
                fontSize: 14.0,
                color: textSecondary54,
                fontWeight: FontWeight.w500))
      ],
    );
  }


}
