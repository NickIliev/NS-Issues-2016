"use strict"
com.viksaa.sssplash.lib.activity.AwesomeSplash.extend("org.uhhospitals.SplashScreen", {
    initSplash: function (configSplash) {
        /* you don't need to override every property */
        
        //Customize Circular Reveal
        configSplash.setBackgroundColor(org.uhhospitals.uhnow.R.color.white); //any color you want from colors.xml
        configSplash.setAnimCircularRevealDuration(0); //int ms
        // configSplash.setRevealFlagX(com.viksaa.sssplash.lib.cnst.Flags.REVEAL_RIGHT);  //or Flags.REVEAL_LEFT
        // configSplash.setRevealFlagY(com.viksaa.sssplash.lib.cnst.Flags.REVEAL_BOTTOM); //or Flags.REVEAL_TOP


        //Choose LOGO OR PATH; if you don't provide String value for path it's logo by default

        //Customize Logo
        configSplash.setLogoSplash(org.uhhospitals.uhnow.R.drawable.uh_logo); //or any other drawable
        //configSplash.setAnimLogoSplashDuration(2000); //int ms
        //configSplash.setAnimLogoSplashTechnique(com.daimajia.androidanimations.library.Techniques.Bounce); //choose one form Techniques (ref: https://github.com/daimajia/AndroidViewAnimations)



        const title = null;
        //const title = com.tns.NativeScriptApplication.getInstance().getString(org.uhhospitals.uhnow.R.string.splash_title)
        //Customize Title
        // configSplash.setTitleSplash(title);
        // configSplash.setTitleTextColor(org.uhhospitals.uhnow.R.color.black);
        // configSplash.setTitleTextSize(30);
        // configSplash.setAnimTitleDuration(3000); //int ms
        // configSplash.setAnimTitleTechnique(com.daimajia.androidanimations.library.Techniques.FlipInX);
        // configSplash.setTitleFont("app/fonts/DroidSans.ttf"); //provide string to your font located in app/fonts/

    },
    animationsFinished: function () {
        const intent = new android.content.Intent(com.tns.NativeScriptApplication.getInstance().getApplicationContext(), com.tns.NativeScriptActivity.class)
        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
        com.tns.NativeScriptApplication.getInstance().startActivity(intent);
    }
});