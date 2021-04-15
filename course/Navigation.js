var Navigation = {
  getDispatcher: function (params) {
    Utils.ajaxCommunication(params, DispatchRoot, Navigation.loadPages, "");
  },
  loadPages: function (response) {
    console.log("Received response = ", response);
    if (response.status === "success" && response.show_email === 0) {
      var url = response.link;

      var htmlContent =
        "<iframe onload='Navigation.setData()' name='ContentFrame' id= 'ContentFrame' allowtransparency='true' scrolling='yes' frameborder='0' src='" +
        url +
        "' width='100%' height='100%' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>";
      View.updateElements("player", htmlContent);
      sljQ("#packagecontainer").show();
      sljQ("#packagecontainer")
        .parent()
        .attr("style", "margin:0px !important;height:100%");
    } else if (response.status === "success" && response.show_email === 1) {
      var htmlContent =
        "<div style='height: 100%;opacity: 0.59;background-color:#2a2f32;width:100%;'>";
      htmlContent +=
        "<div id='show_email' style='position:absolute;top:0px;bottom:0px;left:0px;right:0px;margin:auto;background-color:#fff;border-radius:5px;width:40%;display: table;padding-bottom:10px;'>";
      if (response.show_email_error === 1) {
        htmlContent +=
          "<p style='color:red;text-align:center;padding: 20px;'>OOPS! Email ID already exists. Please try with different email id.</p>";
      }
      htmlContent +=
        "<div style='width:50%;margin: auto;padding-top:20px;padding-bottom:30px;'>";
      htmlContent +=
        "<p style='width: 91px;height: 12px; font-size: 14px;font-weight: normal;font-style: normal;font-stretch: normal;line-height: normal;letter-spacing: normal;color: grey;'>Email Address*</p>";
      htmlContent +=
        "<input id='user_email' type='text' placeholder='Email Address' style='border:1px solid #ddd;width: 100%;height: 40px;border-radius: 0px;margin:auto;padding-left:10px;border-radius:3px;'><br>";
      htmlContent += "</div>";
      htmlContent +=
        "<div style='border-top:1px solid #ddd;padding-bottom: 20px;'> ";
      htmlContent +=
        "<div style='text-align: center;/* width:50%; */margin: 0 auto;'>";
      htmlContent +=
        "<button type='submit' id='submit' style='cursor:pointer;font-size:14px;width: 190px;height: 34px;border-radius: 4px;color:#fff;border:none;border-radius:0px;background-color: #00a7dd;margin-top:  20px;'><b>SUBMIT</b></button>";
      htmlContent += "</div>";
      htmlContent += "</div>";
      htmlContent += "</div>";
      htmlContent += "</div>";
      View.updateElements("player", htmlContent);
      Navigation.ajaxCommunicationForEmail(response.actual_student_id);
    }

    /*
         var id = sljQ(link).attr('id');
         Framework.PageVisitedStatus[id] = 1;
         Framework.currentIndex = id;
         sljQ('#pageno').html("Page " + (parseInt(id) + 1)+" of "+ courseArray.length);
         
         var percentage = ((Utils.getCount(Framework.PageVisitedStatus, 1))/courseArray.length)*sljQ('#progress').width();
         sljQ('#fill').width(percentage);
         var percentageText = ((Utils.getCount(Framework.PageVisitedStatus, 1))/courseArray.length)*100;
         sljQ('#progressTxt').text(Math.ceil(percentageText) +"%");
         
         sljQ(link).addClass('completed');
         
         if(id == 0){
         sljQ('#back').addClass('disable').removeClass('enable');
         }else{
         sljQ('#back').removeClass('disable').addClass('enable');
         } 
         
         if(courseArray.length-1 == Framework.currentIndex){
         sljQ('#next').addClass('disable').removeClass('enable');
         }else{
         sljQ('#next').removeClass('disable').addClass('enable');
         }
         */
    //Navigation.sendStatus();
  },
  ajaxCommunicationForEmail: function (actualStudentId) {
    sljQ(document).ready(function () {
      sljQ("#submit").click(function () {
        var userEmail = sljQ("#user_email").val();
        if (window.location.href != null || window.location.href != undefined) {
          debugger;
          var url = new URL(window.location.href);
          var searchQuery = url.search
            .replace("?", "")
            .split("&")
            .reduce(function (s, c) {
              var t = c.split("=");
              s[t[0]] = t[1];
              return s;
            }, {});
          if (searchQuery.actor != undefined) {
            var userInfo = JSON.parse(decodeURIComponent(searchQuery.actor));
            if (userInfo.name) {
              StudentName = userInfo.name[0];
            }
          }

          //   }
          Lesson_location = null;
          PageVisitedStatus = null;
          Lesson_status = null;
          //        Completion_status = LMSGetValue("cmi.completion_status");
          Score = null;

          var progressObj = new Object();
          if (Lesson_location != "") {
            progressObj.Lesson_location = Lesson_location;
          } else {
            progressObj.Lesson_location = null;
          }

          //progressObj.Domain = "domain.lms.simplilearn.com";
          progressObj.LearnerName = StudentName;
          progressObj.StudentId = userEmail;
          progressObj.LessonStatus = Lesson_status;
          progressObj.Score = Score;
          progressObj.AccessCode = Package;
          progressObj.ActualStudentId = actualStudentId;
          progressObj.PageVisitedStatus = PageVisitedStatus;
          //                    progressObj.CompletionStatus = Completion_status;
          Navigation.getDispatcher(progressObj);
        }
      });
    });
  },
  //   navigation: function (options) {
  //     if (
  //       options.Lesson_location != "" &&
  //       options.Lesson_location != null &&
  //       options.Lesson_location != "undefined"
  //     ) {
  //       Framework.currentIndex = options.Lesson_location;
  //       Framework.PageVisitedStatus = options.PageVisitedStatus.split(",");

  //       Navigation.markCompletion();
  //       sljQ("#disabler").show();
  //       sljQ("#bookmark_container").show();
  //     } else {
  //       sljQ("#0").click();
  //     }
  //     //sljQ('#'+Framework.currentIndex).click();
  //   },
  //   markCompletion: function () {
  //     for (i = 0; i < Framework.PageVisitedStatus.length; i++) {
  //       if (Framework.PageVisitedStatus[i] == 1) {
  //         sljQ("#" + i).addClass("completed");
  //       }
  //     }
  //   },
  //   sendStatus: function () {
  //     var cnt = 0;
  //     for (i = 0; i < Framework.PageVisitedStatus.length; i++) {
  //       if (Framework.PageVisitedStatus[i] == 1) {
  //         cnt++;
  //       }
  //     }

  //     var score = Math.ceil((cnt / Framework.PageVisitedStatus.length) * 100);
  //     if (cnt == Framework.PageVisitedStatus.length) {
  //       Framework.completion = "completed";
  //     }

  //     if (Framework.mode == "xapi") {
  //       doLMSSetValue(
  //         Framework.completion,
  //         Framework.currentIndex,
  //         Framework.PageVisitedStatus.toString(),
  //         score
  //       );
  //     } else if (Framework.mode == "scorm13") {
  //     } else if (Framework.mode == "tincan") {
  //       Tincan.putData(
  //         Framework.currentIndex,
  //         Framework.PageVisitedStatus.toString()
  //       );
  //     } else {
  //       Web.set(Framework.currentIndex, Framework.PageVisitedStatus.toString());
  //     }
  //   },
  exit: function () {
    if (Framework.mode == "xapi") {
      //   doLMSFinish();
      console.log("xapi package exited.");
    } else if (Framework.mode == "scorm13") {
    } else if (Framework.mode == "tincan") {
      Tincan.putData();
    } else {
      Web.set(Framework.currentIndex, Framework.PageVisitedStatus.toString());
    }
  },
  setData: function (evt) {
    var completion = "";
    var pageProgress = "";
    var Score = "";
    var sessionTime = "";
    if (evt) {
      if (typeof evt.data.data.learningTime !== "undefined") {
        sessionTime = evt.data.data.learningTime;
        console.log("Xapi got learning time data", sessionTime);
        // doLMSSetValue("", "", "", sessionTime);
      }
      if (typeof evt.data.data.completionStatus !== "undefined") {
        completion = evt.data.data.completionStatus;
        console.log("Xapi got completion status data", completion);
        // doLMSSetValue(completion, "", "", "");
      }
      if (typeof evt.data.data.courseProgress !== "undefined") {
        pageProgress = evt.data.data.courseProgress;
        console.log("Xapi got course progress data", pageProgress);
        // doLMSSetValue("", pageProgress, "", "");
      }
      if (typeof evt.data.data.testScore !== "undefined") {
        Score = evt.data.data.testScore;
        console.log("Xapi got test score data", Score);
        // doLMSSetValue("", "", Score, "");
      }
    }
  },
};
