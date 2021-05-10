// XAPI Variables declaration
var Lesson_location = "";
var Lesson_status = "";
//var Completion_status = "";
var PageVisitedStatus = "";
var Score = "";
var StudentName = "";
var StudentID = "";

function Framework(mode) {
  Framework.mode = mode;
  Framework.Lesson_location = "";
  Framework.PageVisitedStatus = new Array();
  Framework.completion = "incomplete";
  Framework.currentIndex = 0;
  Framework.protocol =
    window.location.href.indexOf("https") != -1 ? "https" : "http";
  //this.includeFiles(mode.toLowerCase());
  //Utils.loadXML("xml/module.xml", this.parseXML);
  this.includeFiles(mode);
}

Framework.prototype.includeFiles = function (mode) {
  console.log("Package runnint mode: " + mode);
  if (mode == "xapi") {
    // xapi supporting files are loaded here
    // sljQ.getScript("APIWrapper12.js", function () {
    // sljQ.getScript("xapi.js", function () {
    //     doLMSInitialize();
    // });
    // });
    doLMSGetValues();
  } else {
    console.log("Package mode is undefined");
  }
};

// Framework.prototype.parseXML = function (xml) {
//   debugger;
//   this.courseArray = new Array();
//   var course = sljQ(xml).find("course");
//   document.title = sljQ(course).attr("title");
//   sljQ("#title").html(sljQ(course).attr("title"));
//   Framework.courseName = sljQ(course).attr("title");
//   Framework.courseId = sljQ(course).attr("id");

//   var str = "<ul>";

//   sljQ(sljQ(xml).find("page")).each(function (i) {
//     Framework.PageVisitedStatus[i] = 0;
//     var obj = new Object();
//     obj.id = i;
//     obj.displayText = sljQ(this).attr("displayText");
//     obj.link = sljQ(this).attr("link");
//     obj.keywords = sljQ(this).attr("keywords");
//     courseArray.push(obj);

//     str +=
//       "<li id='" +
//       i +
//       "' class='link' tooltip='" +
//       sljQ(this).attr("tooltip") +
//       "' url='" +
//       sljQ(this).attr("link") +
//       "'>" +
//       sljQ(this).attr("displayText") +
//       "</li>";
//   });
//   str += "</ul>";

//   View.updateElements("coursemap", str);

//   sljQ(".link").click(function () {
//     if (sljQ("#coursemapContainer").is(":visible")) {
//       sljQ("#coursemapContainer").slideToggle();
//     }
//     //Navigation.loadPages(sljQ(this));
//   });
//   sljQ("#packagecontainer").show();
//   //Navigation.navigation();
// };

function doLMSGetValues() {
  if (window.location.href != null || window.location.href != undefined) {
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
      if (userInfo.mbox) {
        StudentID = userInfo.mbox[0].split("mailto:")[1];
      }
    }

    if (StudentID == "" || StudentID == null || StudentID == undefined) {
      if (typeof searchQuery == "object") {
        var objectValues = Object.values(searchQuery);
        var urlToString = decodeURIComponent(objectValues.toString());
        var emailArray = urlToString.match(
          /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
        );
        StudentID = emailArray[0];
      } else {
        alert("email not found for XAPI");
      }
    }
    //   }
    console.log("StudentID", StudentID);
    Lesson_location = null;
    PageVisitedStatus = null;
    Lesson_status = null;
    //        Completion_status = LMSGetValue("cmi.completion_status");
    Score = null;

    // commitLessonStatus(Lesson_location);

    var progressObj = new Object();
    if (Lesson_location != "") {
      progressObj.Lesson_location = Lesson_location;
    } else {
      progressObj.Lesson_location = null;
    }

    //progressObj.Domain = "domain.lms.simplilearn.com";
    progressObj.LearnerName = StudentName;
    progressObj.StudentId = StudentID;
    progressObj.LessonStatus = Lesson_status;
    progressObj.Score = Score;
    progressObj.AccessCode = Package;
    progressObj.PageVisitedStatus = PageVisitedStatus;
    progressObj.scormLmsUrl = window.location.origin;
    //        progressObj.CompletionStatus = Completion_status;
    //Navigation.navigation(progressObj);
    Navigation.getDispatcher(progressObj);
  } else {
    alert("Iframe URL is not proper to get user details for XAPI Package.");
  }
}
