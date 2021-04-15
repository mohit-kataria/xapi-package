/* global sljQ, Navigation */

sljQ(document).ready(function () {
  debugger;

  //sljQ('#container').hide();

  //alert("browser viewport :: " + sljQ( window ).height() + " HTML document :: " + sljQ( document ).height() );
  //alert((sljQ( window ).height()*75)/100);

  sljQ("#content").height((sljQ(window).height() * 75) / 100);
  sljQ("#coursemap").height((sljQ("#content").height() * 90) / 100);
  sljQ("#search").height((sljQ("#content").height() * 90) / 100);

  var mode = "xapi";
  //    mode = Utils.urlQueryString("type", document.location.search);

  //    if (mode == null) {
  //        mode = "wbt";
  //    }

  var framework = new Framework(mode);

  /* var playerOrigin = '*';
     var status = sljQ('.status');
     
     // Listen for messages from the player
     if (window.addEventListener) {
     window.addEventListener('message', onMessageReceived, false);
     }
     else {
     window.attachEvent('onmessage', onMessageReceived, false);
     }
     
     // Handle messages received from the player
     function onMessageReceived(event) {
     // Handle messages from the vimeo player only
     if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
     return false;
     }
     
     if (playerOrigin === '*') {
     playerOrigin = event.origin;
     }
     
     var data = JSON.parse(event.data);
     // alert(data.event);
     switch (data.event) {
     case 'ready':
     onReady();
     break;
     
     case 'playProgress':
     onPlayProgress(data.data);
     break;
     
     case 'pause':
     onPause();
     break;
     
     case 'finish':
     onFinish();
     break;
     }
     }
     
     
     
     // Helper function for sending a message to the player
     function post(action, value) {
     var data = {
     method: action
     };
     
     if (value) {
     data.value = value;
     }
     var player = sljQ('iframe');
     var message = JSON.stringify(data);
     //alert(message);
     player[0].contentWindow.postMessage(message, playerOrigin);
     }
     
     function onReady() {
     // status.text('ready');
     
     post('addEventListener', 'pause');
     post('addEventListener', 'finish');
     post('addEventListener', 'playProgress');
     }
     
     function onPause() {
     // alert('paused');
     }
     
     function onFinish() {
     sljQ('#next').click();
     //alert('finished');
     }
     
     function onPlayProgress(data) {
     // status.text(data.seconds + 's played');
     }
     
     */

  //    sljQ(window).bind('orientationchange', function () {
  //        sljQ("#content").height((sljQ(window).height() * 75) / 100);
  //        var h = ((sljQ(window).height() * 75) / 100 - 10);
  //        sljQ("#ContentFrame").height(h);
  //        var h1 = sljQ('#content').height() / 2;
  //        sljQ('#nav').css({top: h1});
  //        sljQ('#coursemapContainer').height(sljQ('#content').height() - 8);
  //
  //        sljQ('#searchContainer').height(sljQ('#content').height() - 8);
  //        //sljQ('#coursemapContainer').slideToggle();
  //        sljQ("#coursemap").jScrollPaneRemove();
  //
  //        sljQ('#search').height((sljQ('#content').height() * 90) / 100);
  //        sljQ('#coursemap').height((sljQ('#content').height() * 90) / 100);
  //
  //        //sljQ('#coursemapContainer').slideToggle();
  //        sljQ("#coursemap").jScrollPane({showArrows: true, scrollbarWidth: 15, arrowSize: 12}).addTouch();
  //        sljQ('.jScrollPaneDrag').addTouch();

  //        var percentage = ((Utils.getCount(Framework.PageVisitedStatus, 1)) / courseArray.length) * sljQ('#progress').width();
  //        sljQ('#fill').width(percentage);
  //        var percentageText = ((Utils.getCount(Framework.PageVisitedStatus, 1)) / courseArray.length) * 100;
  //        sljQ('#progressTxt').text(Math.ceil(percentageText) + "%");

  //sljQ("#content").height((sljQ(window).height()*75)/100);
  //    });

  //    sljQ(window).resize(function () {
  //        sljQ("#content").height((sljQ(window).height() * 75) / 100);
  //        sljQ('#coursemap').height((sljQ('#content').height() * 90) / 100);
  //        sljQ('#search').height((sljQ('#content').height() * 90) / 100);
  //        sljQ('#ContentFrame').height((sljQ('#content').height() * 90) / 100);
  //        sljQ('#coursemapContainer').hide();
  //        var percentage = ((Utils.getCount(Framework.PageVisitedStatus, 1)) / courseArray.length) * sljQ('#progress').width();
  //        sljQ('#fill').width(percentage);
  //        var percentageText = ((Utils.getCount(Framework.PageVisitedStatus, 1)) / courseArray.length) * 100;
  //        sljQ('#progressTxt').text(Math.ceil(percentageText) + "%");
  //    });

  sljQ(window).bind("beforeunload", function () {
    Navigation.exit();
    //        window.opener.hide();
  });
});
